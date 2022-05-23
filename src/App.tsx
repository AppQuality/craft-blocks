import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
  GlobalStyle,
  ThemeProvider,
} from "@appquality/appquality-design-system";
import { Editor, Element, Frame } from "@craftjs/core";
import lz from "lzutf8";
import React from "react";
import "./App.css";
import {
  Button,
  ButtonContainer,
  Container,
  Layout,
  Picture,
  Text,
  Wysiwyg,
} from "./components";
import { SettingsPanel } from "./components/generic/SettingsPanel";

const backwardCompatibilityTest =
  process.env.REACT_APP_TEST_BACKWARD_COMPATIBILITY === "1"
    ? process.env.REACT_APP_BACKWARD_COMPATIBILITY_BASE64
    : undefined;

function App() {
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <div className="App">
        <Editor
          enabled
          resolver={{
            Button,
            Container,
            Text,
            Wysiwyg,
            Picture,
            ButtonContainer,
            Layout,
          }}
        >
          <div className="aq-mt-3">
            <BSGrid>
              <BSCol size="col-9">
                <div id="editor-area">
                  <Frame
                    data={
                      backwardCompatibilityTest
                        ? lz.decompress(
                            lz.decodeBase64(backwardCompatibilityTest)
                          )
                        : undefined
                    }
                  >
                    <Element
                      canvas
                      is={Container}
                      className="aq-p-3"
                      data-cy="root-container"
                    >
                      <Wysiwyg
                        text={JSON.parse(
                          '{"blocks":[{"key":"3eeir","text":"Ciao Tester,","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdtka","text":"A partire dal 17 Maggio 2021 sarà necessario avere un profilo fiscale verificato per poter richiedere un pagamento sul proprio account AppQuality! 🤑","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":54,"length":26,"key":0}],"data":{}},{"key":"ekac1","text":"Per non subire interruzioni nelle tue attività ti invitiamo ad aggiornare le tue informazioni fiscali cliccando il bottone seguente ⬇️","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aelur","text":"Grazie e Keep Testing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"51t06","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/","rel":"noopener","target":"_blank","url":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/"}}}}'
                        )}
                      />
                      <Layout>
                        <Picture
                          title="puppies"
                          width="10%"
                          src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
                        />
                      </Layout>

                      <Element
                        canvas
                        is={Layout}
                        data-cy="button-container"
                        positions="center"
                      >
                        <Button
                          color="success"
                          text="Vai al profilo fiscale"
                          link="https://google.com"
                          size="medium"
                          data-cy="frame-button"
                          rightMargin={2}
                          leftMargin={2}
                        />
                        <Button
                          color="success"
                          text="Vai al profilo fiscale"
                          link="https://google.com"
                          size="medium"
                          data-cy="frame-button"
                        />
                      </Element>
                    </Element>
                  </Frame>
                </div>
              </BSCol>
              <BSCol size="col-3">
                <SettingsPanel />
              </BSCol>
            </BSGrid>
          </div>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default App;
