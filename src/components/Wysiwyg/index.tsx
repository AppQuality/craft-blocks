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
import {EditorContext} from "src/components/Editor";
import flatten from "utils/flatten";
import populateDynamicContent from "utils/populateDynamicContent";

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
  const {profile} = useContext(EditorContext);

  useEffect(() => {
    if (profile?.resolver && profile?.shape) {
      let rawContent = {
        entityMap: text.entityMap,
        blocks: text.blocks.map((block) => {
          return {...block};
        })
      }
      profile.resolver().then(res => {
        rawContent.blocks = rawContent.blocks.map((block) => {
          block.text = populateDynamicContent(block.text, flatten(profile.shape), res);
          return block;
        });
        setEditorState(DraftJsState.createWithContent(convertFromRaw(rawContent)));
      });
    } else {
      setEditorState(DraftJsState.createWithContent(convertFromRaw(text)));
    }
  }, [text, profile]);

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
  const [availableContent, setAvailableContent] = useState<string[]>([]);
  const {profile} = useContext(EditorContext);
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

  const shapeDynamicContent = async (shape: GenericApiResponse) => {
    setAvailableContent(flatten(shape));
  }

  useEffect(() => {
    if (profile?.shape) shapeDynamicContent(profile.shape);
  }, [profile?.shape]);
  return (
    <div>
      {availableContent.length > 0 && (
      <div>
        you can use {availableContent.map(string => (<span>&#123;&#123;{string}&#125;&#125; </span>))}to populate the text with the profile name
      </div>
      )}
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
