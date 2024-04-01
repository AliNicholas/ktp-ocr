import { Grid, makeStyles, Portal } from "@material-ui/core";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { drawLayer, drawShape, setShapeConfig } from "react-mindee-js";
import { DET_CONFIG, RECO_CONFIG } from "../utils/constants";
import {
  extractBoundingBoxesFromHeatmap,
  extractWords,
  getHeatMapFromImage,
  loadDetectionModel,
  loadRecognitionModel,
} from "../utils/tensorflow";
import { useStateWithRef } from "../utils/hooks";
import { flatten } from "underscore";
import AnnotationViewer from "./AnnotationViewer";
import HeatMap from "./HeatMap";
import ImageViewer from "./ImageViewer";
import Sidebar from "./Sidebar";
import WordsList from "./WordsList";

const COMPONENT_ID = "VisionWrapper";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
}));

export default function VisionWrapper() {
  const classes = useStyles();
  const [detConfig, setDetConfig] = useState(DET_CONFIG.db_mobilenet_v2);
  const [recoConfig, setRecoConfig] = useState(RECO_CONFIG.crnn_vgg16_bn);
  const [loadingImage, setLoadingImage] = useState(false);
  const recognitionModel = useRef(null);
  const detectionModel = useRef(null);
  const imageObject = useRef(new Image());
  const heatMapContainerObject = useRef(null);
  const annotationStage = useRef();
  const [extractingWords, setExtractingWords] = useState(false);
  const [annotationData, setAnnotationData] = useState({
    image: null,
  });
  const fieldRefsObject = useRef([]);
  const [words, setWords, wordsRef] = useStateWithRef([]);

  const clearCurrentStates = () => {
    setWords([]);
  };

  const onUpload = (newFile) => {
    clearCurrentStates();
    loadImage(newFile);
    setAnnotationData({ image: newFile.image });
  };

  useEffect(() => {
    setWords([]);
    setAnnotationData({ image: null });
    imageObject.current.src = "";
    if (heatMapContainerObject.current) {
      const context = heatMapContainerObject.current.getContext("2d");
      context?.clearRect(
        0,
        0,
        heatMapContainerObject.current.width,
        heatMapContainerObject.current.height
      );
    }
    loadRecognitionModel({ recognitionModel, recoConfig });
  }, [recoConfig]);

  useEffect(() => {
    setWords([]);
    setAnnotationData({ image: null });
    imageObject.current.src = "";
    if (heatMapContainerObject.current) {
      const context = heatMapContainerObject.current.getContext("2d");
      context?.clearRect(
        0,
        0,
        heatMapContainerObject.current.width,
        heatMapContainerObject.current.height
      );
    }
    loadDetectionModel({ detectionModel, detConfig });
  }, [detConfig]);

  const getBoundingBoxes = () => {
    const boundingBoxes = extractBoundingBoxesFromHeatmap([
      detConfig.height,
      detConfig.width,
    ]);
    setAnnotationData({
      image: imageObject.current.src,
      shapes: boundingBoxes,
    });
    setTimeout(getWords, 1000);
  };

  const getWords = async () => {
    const words = await extractWords({
      recognitionModel: recognitionModel.current,
      stage: annotationStage.current,
      size: [recoConfig.height, recoConfig.width],
    });
    setWords(flatten(words));
    setExtractingWords(false);
  };

  const loadImage = async (uploadedFile) => {
    setLoadingImage(true);
    setExtractingWords(true);
    imageObject.current.onload = async () => {
      await getHeatMapFromImage({
        heatmapContainer: heatMapContainerObject.current,
        detectionModel: detectionModel.current,
        imageObject: imageObject.current,
        size: [detConfig.height, detConfig.width],
      });
      getBoundingBoxes();
      setLoadingImage(false);
    };
    imageObject.current.src = uploadedFile?.image;
  };
  const setAnnotationStage = (stage) => {
    annotationStage.current = stage;
  };

  const onFieldMouseLeave = (word) => {
    drawShape(annotationStage.current, word.id, {
      fill: `${word.color}33`,
    });
  };
  const onFieldMouseEnter = (word) => {
    setShapeConfig(annotationStage.current, word.id, {
      fill: "transparent",
    });

    drawLayer(annotationStage.current);
  };
  const onShapeMouseEnter = (shape) => {
    const newWords = [...wordsRef.current];
    const fieldIndex = newWords.findIndex((word) => word.id === shape.id);
    if (fieldIndex >= 0) {
      newWords[fieldIndex].isActive = true;
      setWords(newWords);
    }
  };
  const onShapeMouseLeave = (shape) => {
    const newWords = [...wordsRef.current];
    const fieldIndex = newWords.findIndex((word) => word.id === shape.id);
    if (fieldIndex >= 0) {
      newWords[fieldIndex].isActive = false;
      setWords(newWords);
    }
  };
  fieldRefsObject.current = useMemo(
    () => words.map((word) => createRef()),
    [words]
  );
  const onShapeClick = (shape) => {
    const fieldIndex = wordsRef.current.findIndex(
      (word) => word.id === shape.id
    );

    if (fieldIndex >= 0) {
      fieldRefsObject.current[fieldIndex]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const uploadContainer = document.getElementById("upload-container");
  return (
    <Grid
      spacing={3}
      className={classes.wrapper}
      item
      id={COMPONENT_ID}
      container
    >
      <Portal container={uploadContainer}>
        <ImageViewer loadingImage={loadingImage} onUpload={onUpload} />
      </Portal>
      <HeatMap heatMapContainerRef={heatMapContainerObject} />
      <Grid item xs={12} md={3}>
        <Sidebar
          detConfig={detConfig}
          setDetConfig={setDetConfig}
          recoConfig={recoConfig}
          setRecoConfig={setRecoConfig}
        />
      </Grid>
      <Grid xs={12} item md={5}>
        <AnnotationViewer
          loadingImage={loadingImage}
          setAnnotationStage={setAnnotationStage}
          annotationData={annotationData}
          onShapeMouseEnter={onShapeMouseEnter}
          onShapeMouseLeave={onShapeMouseLeave}
          onShapeClick={onShapeClick}
        />
      </Grid>
      <Grid xs={12} item md={4}>
        <WordsList
          fieldRefsObject={fieldRefsObject.current}
          onFieldMouseLeave={onFieldMouseLeave}
          onFieldMouseEnter={onFieldMouseEnter}
          extractingWords={extractingWords}
          words={words}
        />
      </Grid>
    </Grid>
  );
}
