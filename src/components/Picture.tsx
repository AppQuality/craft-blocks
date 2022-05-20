import {
  BSCol,
  BSGrid,
  FormLabel,
  Input,
} from "@appquality/appquality-design-system";
import { useNode } from "@craftjs/core";
import React from "react";
import { MarginSettings, useMargins } from "./generic/Margins";

interface PictureProps extends MarginProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
}

export const PictureDefaultProps = {
  src: "data:image/png;base64,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",
  title: "placeholder image",
  width: "100%",
  height: "auto",
};

export const Picture = ({
  src,
  title,
  width = PictureDefaultProps.width,
  height = PictureDefaultProps.height,
  ...props
}: PictureProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  let classNames = useMargins(props);
  if (selected) classNames += " craftjs-node-selected";

  return (
    <div
      style={{ display: "block", width: "max-content" }}
      className={classNames}
      {...props}
      ref={(ref) => connect(drag(ref as HTMLDivElement))}
    >
      <img src={src} width={width} height={height} alt={title} />
    </div>
  );
};

export const PictureSettings = () => {
  const {
    actions: { setProp },
    src,
    title,
    width,
    height,
  } = useNode((node) => ({
    src: node.data.props.src,
    title: node.data.props.title,
    width: node.data.props.width,
    height: node.data.props.height,
  }));

  return (
    <BSGrid>
      <BSCol size="col-12">
        <FormLabel label="Picture src" />
        <Input
          placeholder="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
          value={src}
          onChange={(e: string) =>
            setProp((props: PictureProps) => (props.src = e))
          }
        />
      </BSCol>
      <BSCol size="col-12">
        <FormLabel label="Picture title (alt)" />
        <Input
          value={title}
          onChange={(e: string) =>
            setProp((props: PictureProps) => (props.title = e))
          }
        />
      </BSCol>
      <BSCol size="col-12">
        <FormLabel label="Image width" />
        <Input
          defaultValue={PictureDefaultProps.width}
          value={width}
          onChange={(e: string) =>
            setProp((props: PictureProps) => (props.width = e))
          }
        />
      </BSCol>
      <BSCol size="col-12">
        <FormLabel label="Image height" />
        <Input
          defaultValue={PictureDefaultProps.height}
          value={height}
          onChange={(e: string) =>
            setProp((props: PictureProps) => (props.height = e))
          }
        />
      </BSCol>
      <BSCol size="col-12">
        <MarginSettings />
      </BSCol>
    </BSGrid>
  );
};

Picture.craft = {
  props: PictureDefaultProps,
  related: {
    settings: PictureSettings,
  },
};
