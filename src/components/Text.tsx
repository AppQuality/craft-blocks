import { useNode } from "@craftjs/core";
import { FormLabel, BSGrid, BSCol } from "@appquality/appquality-design-system";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { MarginSettings, useMargins } from "./generic/Margins";

interface TextProps extends MarginProps {
  text: string;
  fontSize?: string;
  textAlign: string;
  className?: string;
}

export const Text = ({ text, fontSize, textAlign, ...props }: TextProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp }
  } = useNode(state => ({
    selected: state.events.selected,
    dragged: state.events.dragged
  }));

  let className = useMargins(props);
  className += props.className ? ` ${props.className}` : "";
  if (selected) className = `${className} craftjs-node-selected`;

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div
      className={className}
      {...props}
      ref={ref => connect(drag(ref as HTMLElement))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={e =>
          setProp(
            (props:any) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
            500
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    textAlign
  } = useNode(node => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    textAlign: node.data.props.textAlign
  }));

  return (
    <BSGrid>
      <BSCol size="col-12">
        <FormLabel htmlFor="size" label="Font size" />
        <input
          id="size"
          type="number"
          defaultValue={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={e => setProp((props: any) => (props.fontSize = e.target.value))}
        />
      </BSCol>
      <BSCol size="col-12">
        <FormLabel htmlFor="textAlign" label="Text Align" />
        <input
          id="textAlign"
          type="string"
          defaultValue={textAlign || 'left'}
          onChange={(e) => setProp((props: TextProps) => (props.textAlign = e.target.value))}
        />
      </BSCol>
      <BSCol size="col-12">
        <MarginSettings />
      </BSCol>
    </BSGrid>
  );
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings
  }
};
