import {Editor} from "@craftjs/core";
import {Text, Container, Button, Layout, Wysiwyg, Picture, ButtonContainer, DynamicPreview} from "./index";
import React from "react";

const ApiResolver = (endpoints: ['users/me', 'users/me/profile']) => {
  return <></>
}

export const DynamicEditor = ({data}: {data: string}) => {
  return (
    <Editor
      onRender={({render}) => {
        return (
          <div style={{background: "#FFF", padding: "5px" }}>
            {render}
          </div>
        )
      }}
      enabled={false}
      resolver={{
        ApiResolver,
        Button,
        Container,
        Text,
        Wysiwyg,
        Picture,
        ButtonContainer,
        Layout,

      }}
    >
      <DynamicPreview data={data} />
    </Editor>
  )
}