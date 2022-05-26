import {Editor, Frame, useEditor} from "@craftjs/core";
import lz from "lzutf8";
import {Text, Container, Button, Layout, Wysiwyg, Picture, ButtonContainer} from "./index";
import {BSCol, BSGrid, Title} from "@appquality/appquality-design-system";
import {useEffect, useState} from "react";

interface GenericApiResponse {
  [key: string]: {
    [key: string]: string;
  };
}

export const DynamicPreview = ({data}: {data: string}) => {
  const populate = (): Promise<GenericApiResponse> => {
    return new Promise((resolve) => {
      resolve({"Profile": {"name": "pippo", "surname": "Franco"}});
    });
  };
  const { connectors, actions, query } = useEditor();
  useEffect(() => {
    if (data) actions.deserialize(data);
  }, [data]);
  return (
    <div>
      {data && <Frame />}
    </div>
  )
}