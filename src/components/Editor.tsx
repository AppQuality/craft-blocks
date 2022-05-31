import {Editor as CraftEditor} from "@appquality/craftjs-core";
import React from "react";
import {Button} from "src/components/Button";
import {Container} from "src/components/Container";
import {Text} from "src/components/Text";
import {Wysiwyg} from "src/components/Wysiwyg";
import {Picture} from "src/components/Picture";
import {ButtonContainer} from "src/components";
import {Layout} from "src/components/Layout";
import {Options} from "@appquality/craftjs-core/lib/interfaces";
import EditorContext from "src/components/EditorContext";
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