import React, {useContext, useEffect, useState} from "react";
import EditorContext from "src/components/EditorContext";
import flatten from "src/utils/flatten";
import Draft, {EditorState, RichUtils, Modifier, SelectionState, CompositeDecorator} from "draft-js";

export const AvailableDynamicContent = ({editorState, setEditorState}: {editorState: any, setEditorState: any}) => {
  const [availableContent, setAvailableContent] = useState<string[]>([]);
  const {resolver} = useContext(EditorContext);

  const shapeDynamicContent = async (shape: GenericApiResponse) => {
    setAvailableContent(flatten(shape));
  }

  useEffect(() => {
    if (resolver) {
      resolver().then(result => shapeDynamicContent(result));
    }
  }, [resolver]);

  const variableDecorator = new CompositeDecorator([
    {
      strategy: (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges(
          (character) => {
            const entityKey = character.getEntity();
            return (
              entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'VARIABLE'
            );
          },
          callback
        );
      },
      component: (props:any) => {
        const {content} = props.contentState.getEntity(props.entityKey).getData();
        return (
          <span data-content={content} >
                        {props.children}
                      </span>
        );
      },
    }
  ]);

  return (
    <>
    {availableContent.length > 0 && (
      <div>
        you can use {availableContent.map(string => {
          const promptForVariable = (e: any) => {
            e.preventDefault();
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
              'VARIABLE',
              'MUTABLE',
              {content: string}
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const contentStateWithVariables = Modifier.applyEntity(
              contentStateWithEntity,
              editorState.getSelection(),
              entityKey,
            );
            // const styledcontentStateWithVariables = Modifier.applyInlineStyle(
            //   contentStateWithVariables,
            //   editorState.getSelection(),
            //   'VARIABLES'
            // );
            const newEditorState = EditorState.set(editorState, {
              currentContent: contentStateWithVariables,
              decorator: variableDecorator
            });
            setEditorState(newEditorState);
          }
        return (
          <button onClick={promptForVariable} style={{marginRight: '1em'}}>{string}</button>
        )
        })}
        to populate the text with dynamic info
      </div>
    )}
    </>
  );
};
