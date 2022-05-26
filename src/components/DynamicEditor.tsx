import {Editor, Element, Frame, useEditor} from "@craftjs/core";
import lz from "lzutf8";
import {Text, Container, Button, Layout, Wysiwyg, Picture, ButtonContainer} from "./index";
import {BSCol, BSGrid} from "@appquality/appquality-design-system";
import React, {useEffect, useState} from "react";
import {SettingsPanel} from "./generic/SettingsPanel";

interface GenericApiResponse {
  [key: string]: {
    [key: string]: string;
  };
}

export const DynamicEditor = ({setData}: {setData: (data: string)=>void}) => {
  // const { connectors, actions, query } = useEditor();
  // useEffect(() => {
  //   const populate = (): Promise<GenericApiResponse> => {
  //     return new Promise((resolve) => {
  //       resolve({"Profile": {"name": "pippo", "surname": "Franco"}});
  //     });
  //   };
  //   // populate().then((res) => {
  //   //   console.log(res);
  //   // });
  //   console.log(connectors);
  //   console.log(actions);
  //   console.log(query);
  //   const json = query.serialize();
  //   const base64 = lz.encodeBase64(lz.compress(json));
  //   setBase64(base64);
  // } , [query, connectors, actions]);

  return (
    <Editor
      onNodesChange={query => {
        const json = query.serialize();
        setData(json);
      }}
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
  )
}