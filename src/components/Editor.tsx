import {Editor as CraftEditor} from "@craftjs/core";
import React, {createContext} from "react";
import {Button} from "src/components/Button";
import {Container} from "src/components/Container";
import {Text} from "src/components/Text";
import {Wysiwyg} from "src/components/Wysiwyg";
import {Picture} from "src/components/Picture";
import {ButtonContainer} from "src/components";
import {Layout} from "src/components/Layout";
import {Options} from "@craftjs/core/lib/interfaces";

export const EditorContext = createContext({} as ContextState);

const enabledComponents = {
  Button,
  Container,
  Text,
  Wysiwyg,
  Picture,
  ButtonContainer,
  Layout,
};

export const Editor: React.FC<Partial<Options>> = ({children, context = {}, ...props}: EditorProps) => {
  return (
    <EditorContext.Provider value={context}>
      <CraftEditor resolver={enabledComponents} {...props}>
        {children}
      </CraftEditor>
    </EditorContext.Provider>
  )
}