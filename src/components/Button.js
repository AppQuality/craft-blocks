import { useNode } from "@craftjs/core";
import {
  Button as AppqButton,
  Select,
  BSGrid,
  BSCol,
  FormLabel,
  Input
} from "@appquality/appquality-design-system";
import React from "react";
import { MarginSettings, useMargins } from "./generic/Margins";

export const Button = ({ size, link, color, text, ...props }) => {
  const {
    connectors: { connect, drag },
    isSelected
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  let className = useMargins(props);
  if (isSelected) className = `${className} craftjs-node-selected`;

  return (
    <span className={className} {...props} ref={ref => connect(drag(ref))}>
      <AppqButton size={size} type={color} as="a" href={link}>
        {text}
      </AppqButton>
    </span>
  );
};

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props
  } = useNode(node => ({
    props: node.data.props
  }));

  const sizeOptions = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "lg" }
  ];
  const currentSize = sizeOptions.find(o => o.value === props.size);
  const colorOptions = [
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
    { label: "Success", value: "success" },
    { label: "Warning", value: "warning" },
    { label: "Danger", value: "danger" },
    { label: "Info", value: "info" }
  ];
  const currentColor = colorOptions.find(o => o.value === props.color);
  return (
    <BSGrid>
      <BSCol size="col-12 aq-mb-3">
        <FormLabel htmlfor="input-text" label="Text" />
        <Input
          onChange={e => setProp(props => (props.text = e))}
          value={props.text}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <FormLabel htmlfor="input-link" label="Link" />
        <Input
          onChange={e => setProp(props => (props.link = e))}
          value={props.link}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <Select
          name="input-size"
          label="Size"
          options={sizeOptions}
          value={currentSize}
          onChange={e => setProp(props => (props.size = e.value))}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <Select
          name="input-color"
          label="Color"
          options={colorOptions}
          value={currentColor}
          onChange={e => setProp(props => (props.color = e.value))}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <MarginSettings props={props} setProp={setProp} />
      </BSCol>
    </BSGrid>
  );
};

export const ButtonDefaultProps = {
  color: "primary",
  text: "Click me",
  size: "medium"
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings
  }
};
