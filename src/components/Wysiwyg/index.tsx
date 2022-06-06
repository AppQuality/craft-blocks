import {useNode, UserComponent} from "@craftjs/core";
import React, {ReactNode, useContext, useEffect, useState} from "react";
import Draft, {
  EditorState as DraftJsState,
  convertToRaw,
  CompositeDecorator,
  convertFromRaw, RawDraftContentState, DraftDecorator, ContentState, Modifier, EditorState, ContentBlock
} from "draft-js";
import "./Draft.css";
import editorStyles from "./editorStyles.module.css";
import buttonStyles from "./buttonStyles.module.css";
import toolbarStyles from "./toolbarStyles.module.css";

import DraftJs from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import { MarginSettings, useMargins } from "../generic/Margins";
import EditorContext from "src/components/EditorContext";
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

  useEffect(() => {
    if (resolver && resolveDynamicContent) {
      const editorState = DraftJsState.createWithContent(convertFromRaw(text));
      const currentContent = editorState.getCurrentContent();
      let decorators: DraftDecorator[] = []
      currentContent.getAllEntities().map((entity) => {
        if (entity && entity.getType() === 'VARIABLE') {
          const data = entity.getData();
          decorators.push(generateDecorator(data.content));
        }
      });
      setEditorState(EditorState.set(editorState, {decorator: new CompositeDecorator(decorators)}));
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
  const variableDecorator = new CompositeDecorator([
    {
      strategy: (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges(
          (character) => {
            const entityKey = character.getEntity();
            if (entityKey !== null && contentState.getEntity(entityKey).getType() === 'VARIABLE') {
              console.log('variable found');
            }
            return (
              entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'VARIABLE'
            );
          },
          callback
        );
      },
      component: (props: any) => {
        const {content} = (props.entityKey) ? props.contentState.getEntity(props.entityKey).getData() : 'suca';
        console.log('variable component');
        return (
          <span data-content={content} >
                        pippo
                      </span>
        );
      },
    }
  ]);
  const [editorState, setEditorState] = React.useState<DraftJsState>(() =>
    props.text
      ? DraftJsState.createWithContent(convertFromRaw(props.text), variableDecorator)
      : DraftJsState.createEmpty(variableDecorator)
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
