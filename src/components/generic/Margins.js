import React from "react";

import {
  Button,
  Text,
  BSGrid,
  Input,
  BSCol,
  FormLabel
} from "@appquality/appquality-design-system";

const SideMarginSettings = ({ value, set }) => {
  return value <= 0 ? (
    <Button size="sm" flat={true} onClick={e => set(1)}>
      Set margin
    </Button>
  ) : (
    <>
      <Input
        type="number"
        min="-1"
        max="3"
        value={value}
        onChange={e => e < 4 && set(e)}
      />
    </>
  );
};

export const useMargins = props => {
  if (props.allSides) {
    if (parseInt(props.allSidesMargin) > 0)
      return `aq-m-${props.allSidesMargin}`;
    return "";
  }

  if (
    parseInt(props.topMargin) > 0 ||
    parseInt(props.bottomMargin) > 0 ||
    parseInt(props.leftMargin) > 0 ||
    parseInt(props.rightMargin) > 0
  ) {
    let className = "";
    if (props.topMargin === props.bottomMargin) {
      className += ` aq-my-${props.topMargin}`;
    } else {
      if (parseInt(props.topMargin) > 0)
        className += ` aq-mt-${props.topMargin}`;
      if (parseInt(props.bottomMargin) > 0)
        className += ` aq-mb-${props.bottomMargin}`;
    }
    if (props.leftMargin === props.rightMargin) {
      className += ` aq-mx-${props.leftMargin}`;
    } else {
      if (parseInt(props.leftMargin) > 0)
        className += ` aq-ml-${props.leftMargin}`;
      if (parseInt(props.rightMargin) > 0)
        className += ` aq-mr-${props.rightMargin}`;
    }
    return className;
  }
  return "";
};

export const MarginSettings = ({ setProp, props }) => {
  const allSides = typeof props.allSides == "undefined" ? true : props.allSides;
  return (
    <div className="aq-mb-3" style={{ float: "left", width: "100%" }}>
      <FormLabel htmlfor="input-margin" label="Margin" />
      <Text className="aq-my-2">
        All Sides
        <input
          type="checkbox"
          defaultChecked={allSides}
          onChange={e => setProp(props => (props.allSides = !props.allSides))}
        />
      </Text>

      {allSides ? (
        <SideMarginSettings
          value={props.allSidesMargin || -1}
          set={e => setProp(props => (props.allSidesMargin = e))}
        />
      ) : (
        <BSGrid>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Top</Text>
              <SideMarginSettings
                value={props.topMargin || -1}
                set={e => setProp(props => (props.topMargin = e))}
              />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Left</Text>
              <SideMarginSettings
                value={props.leftMargin || -1}
                set={e => setProp(props => (props.leftMargin = e))}
              />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Bottom</Text>

              <SideMarginSettings
                value={props.bottomMargin || -1}
                set={e => setProp(props => (props.bottomMargin = e))}
              />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Right</Text>

              <SideMarginSettings
                value={props.rightMargin || -1}
                set={e => setProp(props => (props.rightMargin = e))}
              />
            </Text>
          </BSCol>
        </BSGrid>
      )}
    </div>
  );
};
