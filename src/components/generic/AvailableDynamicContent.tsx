import React, {useContext, useEffect, useState} from "react";
import EditorContext from "src/components/EditorContext";
import flatten from "src/utils/flatten";

export const AvailableDynamicContent = () => {
  const [availableContent, setAvailableContent] = useState<string[]>([]);
  const {resolver} = useContext(EditorContext);

  const shapeDynamicContent = async (shape: GenericApiResponse) => {
    setAvailableContent(flatten(shape));
  }

  useEffect(() => {
    if (resolver) {
      resolver().then(result => shapeDynamicContent(result));
    }
  }, [resolver]);
  return (
    <>
    {availableContent.length > 0 && (
      <div>
        you can use {availableContent.map(string => (<span>&#123;&#123;{string}&#125;&#125; </span>))}to populate the text with dynamic info
      </div>
    )}
    </>
  );
};
