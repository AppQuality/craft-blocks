import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
  GlobalStyle,
  ThemeProvider, Title,
} from "@appquality/appquality-design-system";
import {Element, Frame} from "@craftjs/core";
import React, {useState} from "react";
import "./App.css";
import {
  Button,
  Container,
  Layout,
  Wysiwyg,
  Editor,
} from "./components";
import {SettingsPanel} from "./components/generic/SettingsPanel";

function App() {
  const [data, setData] = useState<string>("");
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <div className="App">
        <Editor
          onNodesChange={query => {
            const json = query.serialize();
            setData(json);
          }}
        >
          <div className="aq-mt-3">
            <BSGrid>
              <BSCol size="col-9">
                <div id="editor-area">
                  <Frame>
                    <Element
                      canvas
                      is={Container}
                      className="aq-p-3"
                      data-cy="root-container"
                    >
                      <Wysiwyg
                        text={JSON.parse(
                          '{"blocks":[{"key":"3eeir","text":"Ciao {{Profile.name}},","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdtka","text":"A partire dal 17 Maggio 2021 sarà necessario avere un profilo fiscale verificato per poter richiedere un pagamento sul proprio account AppQuality! 🤑","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":54,"length":26,"key":0}],"data":{}},{"key":"ekac1","text":"Per non subire interruzioni nelle tue attività ti invitiamo ad aggiornare le tue informazioni fiscali cliccando il bottone seguente ⬇️","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aelur","text":"Grazie e Keep Testing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"51t06","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/","rel":"noopener","target":"_blank","url":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/"}}}}'
                        )}
                      />
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
        <BSGrid>
          <BSCol size="col-9">
            <Editor>
              <div className="aq-m-3">
                <Title>Preview</Title>
                {data && <Frame data={data} />}
              </div>
            </Editor>
          </BSCol>
        </BSGrid>
      </div>
    </ThemeProvider>
  );
}

export default App;
