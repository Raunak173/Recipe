import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Tooltip from "./Tooltip";
import Spotlight from "./Spotlight";
import Coachmark from "./Coachmark";

const NudgeMaker = ({
  nudgeInfo,
  setIdx,
  total,
  idx,
  setIsSpotlight,
  setSlColor,
  renderCard,
}) => {
  const { type } = nudgeInfo;
  if (type === "spotlight") setIsSpotlight(true);
  return (
    <View style={{ zIndex: 1000 }}>
      {type === "tooltip" && (
        <Tooltip
          tooltipInfo={nudgeInfo}
          setIdx={setIdx}
          total={total}
          idx={idx}
        />
      )}
      {type === "spotlight" && (
        <Spotlight
          spotlightInfo={nudgeInfo}
          setIdx={setIdx}
          total={total}
          idx={idx}
          setSlColor={setSlColor}
          setIsSpotlight={setIsSpotlight}
          renderCard={renderCard}
        />
      )}
      {type === "coachmark" && (
        <Coachmark
          coachmarkInfo={nudgeInfo}
          setIdx={setIdx}
          total={total}
          idx={idx}
          renderCard={renderCard}
        />
      )}
    </View>
  );
};

export default NudgeMaker;

const styles = StyleSheet.create({});
