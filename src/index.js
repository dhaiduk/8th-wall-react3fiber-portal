import ReactDOM from "react-dom";
import React, { useState } from "react";
import Component from "./Experience";
import ComponentOnscreen from "./ExperienceOnscreen";
import { GenTools } from "./genTools";
import useStore from "./state";

const onComplete = (action, result) => {
  console.log("onComplete has been triggered");
  console.log("action =", action);
  console.log("result =", result);
  alert("Check your logs!");
};

const ComponentWrapper = componentProps => {
  const { changeModel } = useStore();
  const { modelNum } = useStore();
  if (!componentProps) {
    return null;
  }

  //cheap routing here!
  var onscreenVersion = GenTools.ParamsGet("onscreen");
 
  if (onscreenVersion) {
    return <ComponentOnscreen {...componentProps} />;
  } else {
    return <Component {...componentProps} />;
  }
};

const initComponent = async () => {
  const fetchData = await fetch("config.json");
  const componentProps = await fetchData.json();

  ReactDOM.render(
    <ComponentWrapper onComplete={onComplete} {...componentProps} />,
    document.querySelector("#root")
  );
};

initComponent();
