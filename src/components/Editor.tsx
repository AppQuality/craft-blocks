import {Editor as CraftEditor} from "@craftjs/core";
import {Button} from "./Button";
import {Container} from "./Container";
import {Layout} from "./Layout";
import {Text} from "./Text";
import {Wysiwyg} from "./Wysiwyg";
import {Picture} from "./Picture";

export const Editor = () => {
  return <CraftEditor
    resolver={{
      Button,
      Container,
      Picture,
      Text,
      Wysiwyg,
      Layout,
    }}
  />;
}