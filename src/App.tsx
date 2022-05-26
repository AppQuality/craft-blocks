import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
  GlobalStyle,
  ThemeProvider, Title,
} from "@appquality/appquality-design-system";
import { Editor, Element, Frame } from "@craftjs/core";
import lz from "lzutf8";
import React, {useState} from "react";
import "./App.css";
import {
  Button,
  ButtonContainer,
  Container,
  Layout,
  Picture,
  Text,
  Wysiwyg,
  DynamicEditor, DynamicPreview,
} from "./components";

function App() {
  const [data, setData] = useState<string>("");
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <div className="App">
        <DynamicEditor setData={setData}/>
        <Editor
          enabled={false}
          resolver={{
            Button,
            Container,
            Text,
            Wysiwyg,
            Picture,
            ButtonContainer,
            Layout
          }}
        >
          <BSGrid>
            <BSCol size="col-9">
              <Title>Preview</Title>
              <DynamicPreview data={data} />
            </BSCol>
          </BSGrid>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default App;
