import {useNode, UserComponent} from "@craftjs/core";
import React, {useContext, useEffect, useState} from "react";
import {
  EditorState as DraftJsState,
  convertToRaw,
  convertFromRaw, RawDraftContentState
} from "draft-js";
import "./Draft.css";
import editorStyles from "./editorStyles.module.css";
import buttonStyles from "./buttonStyles.module.css";
import toolbarStyles from "./toolbarStyles.module.css";

import DraftJs from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import { MarginSettings, useMargins } from "../generic/Margins";
import EditorContext from "src/components/EditorContext";
import flatten from "src/utils/flatten";
import populateDynamicContent from "src/utils/populateDynamicContent";
import {AvailableDynamicContent} from "src/components/generic/AvailableDynamicContent";

interface WysiwygProps extends BasicElementProps, MarginProps {
  text: RawDraftContentState;
}

export const Wysiwyg: UserComponent<WysiwygProps> = ({ text, ...props }) => {
  const [editorState, setEditorState] = useState(DraftJsState.createEmpty());
  const {
    connectors: { connect, drag },
    isSelected
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  const {resolver, resolveDynamicContent} = useContext(EditorContext);

  useEffect(() => {
    if (resolver && resolveDynamicContent) {
      let rawContent = {
        entityMap: text.entityMap,
        blocks: text.blocks.map((block) => {
          return {...block};
        })
      }
      resolver().then(res => {
        rawContent.blocks = rawContent.blocks.map((block) => {
          block.text = populateDynamicContent(block.text, flatten(res), res);
          return block;
        });
        setEditorState(DraftJsState.createWithContent(convertFromRaw(rawContent)));
      });
    } else {
      setEditorState(DraftJsState.createWithContent(convertFromRaw(text)));
    }
  }, [text, resolver, resolveDynamicContent]);

  const marginClass = useMargins(props);
  let className = props.className
    ? `${props.className} ${marginClass}`
    : marginClass;
  if (isSelected) className = `${className} craftjs-node-selected`;
  return (
    <div className={className} {...props} ref={ref => connect(drag(ref as HTMLDivElement))}>
      <DraftJs editorState={editorState} readOnly />
    </div>
  );
};

export const WysiwygSettings = () => {
  const {
    actions: { setProp },
    props
  } = useNode(node => ({
    props: node.data.props
  }));
  const [editorState, setEditorState] = React.useState<DraftJsState>(() =>
    props.text
      ? DraftJsState.createWithContent(convertFromRaw(props.text))
      : DraftJsState.createEmpty()
  );

  const [plugins, Toolbar] = React.useMemo(() => {
    const staticToolbarPlugin = createToolbarPlugin({
      theme: { buttonStyles, toolbarStyles }
    });
    return [[staticToolbarPlugin], staticToolbarPlugin.Toolbar];
  }, []);

  const updateEditor = (data:DraftJsState) => {
    setProp((props:WysiwygProps) => (props.text = convertToRaw(data.getCurrentContent())));
    setEditorState(data);
  };

  return (
    <div>
      <AvailableDynamicContent />
      <div
        className={editorStyles.editor}
      >
        <DraftJs
          editorState={editorState}
          onChange={updateEditor}
          plugins={plugins}
        />
        <Toolbar />
      </div>
      <div>
        <MarginSettings />
      </div>
    </div>
  );
};

export const WysiwygDefaultProps = {
  text: JSON.parse(
    '{"blocks":[{"key":"3eeir","text":"Hello i\'m a Rich Text Snippet","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":17,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
  )
};

Wysiwyg.craft = {
  props: WysiwygDefaultProps,
  related: {
    settings: WysiwygSettings
  }
};
