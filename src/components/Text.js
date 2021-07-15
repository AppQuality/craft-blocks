import { useNode } from "@craftjs/core";
import { FormLabel, BSGrid, BSCol } from "@appquality/appquality-design-system";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { MarginSettings, useMargins } from "./generic/Margins";

export const Text = ({ text, fontSize, textAlign, ...props }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp }
  } = useNode(state => ({
    selected: state.events.selected,
    dragged: state.events.dragged
  }));

  const marginClass = useMargins(props || {});
  let className = props.className
    ? `${props.className} ${marginClass}`
    : marginClass;
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
      ref={ref => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={e =>
          setProp(
            props =>
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
    props
  } = useNode(node => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize
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
          onChange={e => setProp(props => (props.fontSize = e.target.value))}
        />
      </BSCol>
      <BSCol size="col-12">
        <MarginSettings props={props || {}} setProp={setProp} />
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
