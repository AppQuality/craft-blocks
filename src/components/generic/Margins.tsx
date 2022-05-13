// @ts-nocheck
import React from "react";

import {
  Button,
  Text,
  BSGrid,
  Input,
  BSCol,
  FormLabel
} from "@appquality/appquality-design-system";
interface MarginProps {
  allSides?: boolean;
  allSidesMargin?: string;
  topMargin?: string;
  bottomMargin?: string;
  leftMargin?: string;
  rightMargin?: string;
}
interface SideMarginSettingsProps {
  value: number;
  set: (e: number) => void;
}
interface MarginSettingsProps {
  setProp: (prop: MarginProps) => void;
  props: MarginProps;
}

const SideMarginSettings = ({ value, set }: SideMarginSettingsProps) => {
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


export const useMargins = ({allSidesMargin, allSides, topMargin, leftMargin, rightMargin, bottomMargin}: MarginProps) => {
  function hasAllSidesMargin() {
    return allSides;
  }
  function isPositive(aNumeric?: string) {
    return aNumeric && parseInt(aNumeric) > 0;
  }
  function getAllSidesMargin() {
    if (isPositive(allSidesMargin)) {
      return  `aq-m-${allSidesMargin}`;
    }
    return "";
  }
  function hasAtLeastOneMargin() {
    return isPositive(topMargin) ||
      isPositive(bottomMargin) ||
      isPositive(leftMargin) ||
      isPositive(rightMargin);
  }
  function getAtLeastOneMargin() {
    let result = "";
    if (isPositive(topMargin)) {
      result += ` aq-mt-${topMargin}`;
    }
    if (isPositive(bottomMargin)) {
      result += ` aq-mb-${bottomMargin}`;
    }
    if (isPositive(leftMargin)) {
      result += ` aq-ml-${leftMargin}`;
    }
    if (isPositive(rightMargin)) {
      result += ` aq-mr-${rightMargin}`;
    }
    return result;
  }

  if (hasAllSidesMargin()) {
    return getAllSidesMargin();
  }
  if (hasAtLeastOneMargin()) {
    return getAtLeastOneMargin();
  }
  return "";
};

export const MarginSettings = ({ setProp, props }: MarginSettingsProps) => {
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
