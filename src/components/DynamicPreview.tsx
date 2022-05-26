import {Frame, useEditor} from "@craftjs/core";
import {useEffect} from "react";

export const DynamicPreview = ({data}: {data: string}) => {
  const { actions } = useEditor();
  useEffect(() => {
    if (data) actions.deserialize(data);
  }, [data]);
  return (
    <div>
      {data && <Frame />}
    </div>
  )
}