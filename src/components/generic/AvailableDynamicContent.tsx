import React, {useContext, useEffect, useState} from "react";
import EditorContext from "src/components/EditorContext";
import flatten from "src/utils/flatten";
import {EditorState, Modifier} from "draft-js";

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



  const promptForVariable = (string: string) => {
    const currentContent = editorState.getCurrentContent();
    const newString = '{{'+string+'}}';
    const contentStateWithEntity = currentContent.createEntity(
      'VARIABLE',
      'MUTABLE',
      {content: newString}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithVariables = Modifier.applyEntity(
      contentStateWithEntity,
      editorState.getSelection(),
      entityKey,
    );
    const updatedEditorWithText = Modifier.insertText(
      contentStateWithVariables,
      editorState.getSelection(),
      newString,
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    const newEditorState = EditorState.set(editorState, {
      currentContent: updatedEditorWithText
    });
    setEditorState(newEditorState);
  }

  return (
    <>
    {availableContent.length > 0 && (
      <div>
        you can use {availableContent.map(string => {
        return (
          <button onClick={e => {
            e.preventDefault();
            promptForVariable(string);
          }} style={{marginRight: '1em'}}>{string}</button>
        )
        })}
        to populate the text with dynamic info
      </div>
    )}
    </>
  );
};
