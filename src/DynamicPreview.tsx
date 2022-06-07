import {Frame, useEditor} from "@craftjs/core";
import {useEffect} from "react";
import {Editor} from "src/components";
import {Title} from "@appquality/appquality-design-system";

const DynamicFrame = ({data}: {data: string}) => {
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

export const DynamicPreview = ({data}: {data: string}) => {
  return (
    <Editor
      enabled={false}
      context={{
        resolveDynamicContent: true,
        resolver: () => {
          return new Promise((resolve) => {
            resolve({
              Profile: {
                id: "1987",
                name: "Pippo",
                surname: "Franco",
              },
            });
          });
        },
      }}
    >
      <div className="aq-m-3">
        <Title>Preview</Title>
        <DynamicFrame data={data} />
      </div>
    </Editor>
  )
}