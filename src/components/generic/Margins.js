import React from 'react';

import { useState, useEffect } from 'react';
import {
  Button,
  Text,
  BSGrid,
  Input,
  BSCol,FormLabel
} from '@appquality/appquality-design-system';

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
    return '';
  }

  if (
    parseInt(props.topMargin) > 0 ||
    parseInt(props.bottomMargin) > 0 ||
    parseInt(props.leftMargin) > 0 ||
    parseInt(props.rightMargin) > 0
  ) {
    let className = '';
    if (props.topMargin == props.bottomMargin) {
      className += ` aq-my-${props.topMargin}`;
    } else {
      if (parseInt(props.topMargin) > 0)
        className += ` aq-mt-${props.topMargin}`;
      if (parseInt(props.bottomMargin) > 0)
        className += ` aq-mb-${props.bottomMargin}`;
    }
    if (props.leftMargin == props.rightMargin) {
      className += ` aq-mx-${props.leftMargin}`;
    } else {
      if (parseInt(props.leftMargin) > 0)
        className += ` aq-ml-${props.leftMargin}`;
      if (parseInt(props.rightMargin) > 0)
        className += ` aq-mr-${props.rightMargin}`;
    }
    return className;
  }
  return '';
};

export const MarginSettings = ({ setProp, props }) => {
  const [allSides, setAllSides] = useState(
    typeof props.allSides == 'undefined' ? true : props.allSides
  );
  const [allSidesMargin, setAllSidesMargin] = useState(
    props.allSidesMargin || -1
  );
  const [topMargin, setTopMargin] = useState(props.topMargin || -1);
  const [bottomMargin, setBottomMargin] = useState(props.bottomMargin || -1);
  const [leftMargin, setLeftMargin] = useState(props.leftMargin || -1);
  const [rightMargin, setRightMargin] = useState(props.rightMargin || -1);
  useEffect(() => {
    setProp(props => {
      props.topMargin = topMargin;
      props.bottomMargin = bottomMargin;
      props.leftMargin = leftMargin;
      props.rightMargin = rightMargin;
      props.allSidesMargin = allSidesMargin;
      props.allSides = allSides;
    });
  }, [
    topMargin,
    bottomMargin,
    leftMargin,
    rightMargin,
    allSidesMargin,
    allSides,
  ]);
  return (
    <div className="aq-mb-3" style={{ float: 'left', width: '100%' }}>
      <FormLabel htmlfor="input-margin" label="Margin" />
      <Text className="aq-my-2">
        All Sides
        <input
          type="checkbox"
          defaultChecked={allSides}
          onChange={e => setAllSides(!allSides)}
        />
      </Text>

      {allSides ? (
        <SideMarginSettings value={allSidesMargin} set={setAllSidesMargin} />
      ) : (
        <BSGrid>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Top</Text>
              <SideMarginSettings value={topMargin} set={setTopMargin} />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Left</Text>
              <SideMarginSettings value={leftMargin} set={setLeftMargin} />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Bottom</Text>

              <SideMarginSettings value={bottomMargin} set={setBottomMargin} />
            </Text>
          </BSCol>
          <BSCol size="col-6">
            <Text className="aq-my-2">
              <Text>Right</Text>

              <SideMarginSettings value={rightMargin} set={setRightMargin} />
            </Text>
          </BSCol>
        </BSGrid>
      )}
    </div>
  );
};
