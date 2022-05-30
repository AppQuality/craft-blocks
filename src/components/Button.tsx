import { useNode } from "@craftjs/core";
import {
  Button as AppqButton,
  Select,
  BSGrid,
  BSCol,
  FormLabel,
  Input
} from "@appquality/appquality-design-system";
import React, {useContext, useEffect} from "react";
import { MarginSettings, useMargins } from "./generic/Margins";
import {AvailableDynamicContent} from "src/components/generic/AvailableDynamicContent";
import EditorContext from "src/components/EditorContext";
import populateDynamicContent from "src/utils/populateDynamicContent";

interface ButtonProps extends MarginProps{
  text: string;
  type?: string;
  size: string;
  link: string;
  color: string;
  onClick?: () => void;
}

export const Button = ({ size, link, color, text, ...props }: ButtonProps) => {
  const [buttonText, setButtonText] = React.useState(text);
  const [buttonLink, setButtonLink] = React.useState(link);
  const {
    connectors: { connect, drag },
    isSelected
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  const {resolver, resolveDynamicContent} = useContext(EditorContext);
  let className = useMargins(props);
  if (isSelected) className = `${className} craftjs-node-selected`;

  useEffect(() => {
    if (resolver && resolveDynamicContent) {
      resolver().then(res => {
        setButtonText(populateDynamicContent(text, res));
      });
    }
  }, [text, resolver, resolveDynamicContent]);

  useEffect(() => {
    if (resolver && resolveDynamicContent) {
      resolver().then(res => {
        setButtonLink(populateDynamicContent(link, res));
      });
    }
  }, [link, resolver, resolveDynamicContent]);

  return (
    <span className={className} {...props} ref={ref => connect(drag(ref as HTMLElement))}>
      <AppqButton size={size} type={color} as="a" href={buttonLink} target="_blank">
        {buttonText}
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
        <AvailableDynamicContent />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <FormLabel htmlfor="input-text" label="Text" />
        <Input
          onChange={(e: any) => setProp((props: ButtonProps) => (props.text = e))}
          value={props.text}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <FormLabel htmlfor="input-link" label="Link" />
        <Input
          onChange={(e: any) => setProp((props: ButtonProps) => (props.link = e))}
          value={props.link}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <Select
          name="input-size"
          label="Size"
          options={sizeOptions}
          value={currentSize || {label: "", value: ""}}
          onChange={e => setProp((props: ButtonProps) => (props.size = e.value || ""))}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <Select
          name="input-color"
          label="Color"
          options={colorOptions}
          value={currentColor|| {label: "", value: ""}}
          onChange={e => setProp((props: ButtonProps) => (props.color = e.value || ""))}
        />
      </BSCol>
      <BSCol size="col-12 aq-mb-3">
        <MarginSettings />
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
