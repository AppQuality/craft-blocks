import React, {useEffect, useState} from "react";
import {useNode} from "@craftjs/core";
import {
  Button,
  Text,
  BSGrid,
  Input,
  BSCol,
  FormLabel
} from "@appquality/appquality-design-system";

interface SideMarginSettingsProps {
  value: number;
  set: (e: number) => void;
}

const SideMarginSettings = ({ value, set }: SideMarginSettingsProps) => {
  return value <= 0 ? (
    <Button size="sm" flat={true} onClick={() => set(1)}>
      Set margin
    </Button>
  ) : (
    <>
      <Input
        type="number"
        min="-1"
        max="3"
        value={value}
        onChange={(e:number) => e < 4 && set(e)}
      />
    </>
  );
};


export const useMargins = ({allSidesMargin, allSides, topMargin, leftMargin, rightMargin, bottomMargin}: MarginProps) => {
  function hasAllSidesMargin() {
    return allSides;
  }
  function isPositive(aNumeric?: number) {
    return aNumeric && aNumeric > 0;
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

export const MarginSettings = () => {
  const {
    actions: { setProp },
    props
  } = useNode<{ props: Record<keyof MarginProps, any>; }>(node => ({
    props: node.data.props
  }));
  const [allSides, setAllSides] = useState(props.allSides);
  useEffect(() => {
    setAllSides(props.allSides);
  }, [props.allSides]);
  return (
    <div className="aq-mb-3" style={{ float: "left", width: "100%" }}>
      <FormLabel htmlfor="input-margin" label="Margin" />
      <Text className="aq-my-2">
        All Sides
        <input
          type="checkbox"
          defaultChecked={allSides}
          onChange={() => setProp((props: MarginProps) => {
            Object.keys(props).forEach(key => {
              console.log(key);
            });
            return(props.allSides = !props.allSides)
          })}
        />
      </Text>

      {allSides ? (
        <SideMarginSettings
          value={props.allSidesMargin || -1}
          set={e => setProp((props: MarginProps) => (props.allSidesMargin = e))}
        />
      ) : (
        <BSGrid>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Top</Text>
              <SideMarginSettings
                value={props.topMargin || -1}
                set={e => setProp((props: MarginProps) => (props.topMargin = e))}
              />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Left</Text>
              <SideMarginSettings
                value={props.leftMargin || -1}
                set={e => setProp((props: MarginProps) => (props.leftMargin = e))}
              />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Bottom</Text>

              <SideMarginSettings
                value={props.bottomMargin || -1}
                set={e => setProp((props: MarginProps) => (props.bottomMargin = e))}
              />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Right</Text>

              <SideMarginSettings
                value={props.rightMargin || -1}
                set={e => setProp((props: MarginProps) => (props.rightMargin = e))}
              />
            </Text>
          </BSCol>
        </BSGrid>
      )}
    </div>
  );
};
