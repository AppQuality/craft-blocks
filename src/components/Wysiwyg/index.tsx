import {useNode, UserComponent} from "@craftjs/core";
import React, {useContext, useEffect, useState} from "react";
import {
  EditorState as DraftJsState,
  convertToRaw,
  CompositeDecorator,
  convertFromRaw, RawDraftContentState, DraftDecorator, SelectionState, Modifier, EditorState, ContentBlock
} from "draft-js";
import "./Draft.css";
import editorStyles from "./editorStyles.module.css";
import buttonStyles from "./buttonStyles.module.css";
import toolbarStyles from "./toolbarStyles.module.css";

import DraftJs from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import { MarginSettings, useMargins } from "../generic/Margins";
import EditorContext from "src/components/EditorContext";
import {getTerm} from "src/utils/populateDynamicContent";
import {AvailableDynamicContent} from "src/components/generic/AvailableDynamicContent";

interface WysiwygProps extends BasicElementProps, MarginProps {
  text: RawDraftContentState;
}

const generateDecorator = (highlightTerm: string) => {
  const regex = new RegExp(highlightTerm, 'g');
  return {
    strategy: (contentBlock: ContentBlock, callback: (start: number, end: number) => void) => {
      if (highlightTerm !== '') {
        findWithRegex(regex, contentBlock, callback);
      }
    },
    component: (props:any) => (
      <span style={{backgroundColor: 'yellow'}}>{props.children}</span>
    ),
  }
};
const findWithRegex = (regex:RegExp, contentBlock: ContentBlock, callback: (start: number, end: number)=>void) => {
  const text = contentBlock.getText();
  let matchArr, start, end;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    end = start + matchArr[0].length;
    callback(start, end);
  }
};

const addDecorator = (data: DraftJsState, setEditorState: (data: DraftJsState) => void) => {
  const currentContent = data.getCurrentContent();
  let decorators: DraftDecorator[] = []
  currentContent.getAllEntities().forEach((entity) => {
    if (entity && entity.getType() === 'VARIABLE') {
      const data = entity.getData();
      decorators.push(generateDecorator(data.content));
    }
  });
  setEditorState(EditorState.set(data, {decorator: new CompositeDecorator(decorators)}));
}

export const Wysiwyg: UserComponent<WysiwygProps> = ({ text, ...props }) => {
  const [editorState, setEditorState] = useState<DraftJsState>(() => text ? DraftJsState.createWithContent(convertFromRaw(text)) : DraftJsState.createEmpty());
  const {
    connectors: { connect, drag },
    isSelected
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  const {resolver, resolveDynamicContent} = useContext(EditorContext);

  // update contextual preview with editor changes
  useEffect(() => {
    const newState = DraftJsState.createWithContent(convertFromRaw(text));
    addDecorator(newState, setEditorState);
  }, [text]);

  // replace variables with dynamic content
  useEffect(() => {
    if (resolver && resolveDynamicContent) {
      resolver().then(result => {
        console.log('resolve dynamic content');
        const blockMap = editorState.getCurrentContent().getBlockMap();
        const regex: RegExp[] = [];
        editorState.getCurrentContent().getAllEntities().map((entity) => {
          if (entity && entity.getType() === 'VARIABLE') {
            const data = entity.getData();
            if (data.content) {
              regex.push(new RegExp(data.content, 'g'));
            }
          }
        });

        blockMap.forEach((contentBlock) => {
          if (contentBlock) {
            let contentState = editorState.getCurrentContent();
            regex.forEach((regex) => {
              findWithRegex(regex, contentBlock, (start, end) => {
                const blockKey = contentBlock.getKey();
                const blockSelection = SelectionState
                  .createEmpty(blockKey)
                  .merge({
                    anchorOffset: start,
                    focusOffset: end,
                  });
                console.log(getTerm(regex.source, result));
                contentState = Modifier.replaceText(
                  contentState,
                  blockSelection,
                  getTerm(regex.source, result),
                )
                setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
              })
            });
          }
        });
      });
    }
  } , [text, resolver, resolveDynamicContent]);

  const marginClass = useMargins(props);
  let className = props.className
    ? `${props.className} ${marginClass}`
    : marginClass;
  if (isSelected) className = `${className} craftjs-node-selected`;
  return (
    <div className={className} {...props} ref={ref => connect(drag(ref as HTMLDivElement))}>
      <DraftJs editorState={editorState} />
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
  const [editorState, setEditorState] = useState<DraftJsState>(() =>
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

  // update editor with contextual preview changes
  const updateEditor = (newState:DraftJsState) => {
    setProp((props:WysiwygProps) => (props.text = convertToRaw(newState.getCurrentContent())));
    addDecorator(newState, setEditorState);
  };

  return (
    <div>
      <AvailableDynamicContent editorState={editorState} setEditorState={setEditorState} />
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
