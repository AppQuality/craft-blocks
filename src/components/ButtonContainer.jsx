import { FormLabel } from '@appquality/appquality-design-system';
import { useNode } from '@craftjs/core';
import React from 'react';
import { Button } from './Button';
import { MarginSettings, useMargins } from './generic/Margins';
import { Picture } from './Picture';

export const ButtonContainer = ({ children, positions, ...props }) => {
  const {
    connectors: { connect, drag },
    isSelected
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  let className = useMargins(props);
  if (isSelected) className = `${className} craftjs-node-selected`;

  const style = { display: 'flex' };
  if (positions) {
    style.justifyContent = positions;
  }

  return (
    <div
      className={className}
      style={style}
      {...props}
      ref={ref => connect(drag(ref))}
    >
      {children}
    </div>
  );
};

export const ButtonContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode(node => ({
    props: node.data.props,
  }));
  return (
    <div>
      <div style={{ float: 'left', width: '100%', marginBottom: '10px' }}>
        <MarginSettings props={props} setProp={setProp} />
      </div>
      <div style={{ float: 'left', width: '100%', marginBottom: '10px' }}>
        <FormLabel htmlFor="spacing-select" label="Spacing" />
        <select
          id="spacing-select"
          onChange={e => setProp(props => (props.positions = e.target.value))}
        >
          <option
            selected={typeof props.positions === 'undefined' ? true : false}
            value="none"
          >
            None
          </option>
          <option
            selected={props.positions === 'center' ? true : false}
            value="center"
          >
            Center
          </option>
          <option
            selected={props.positions === 'space-between' ? true : false}
            value="space-between"
          >
            Space Between
          </option>
          <option
            selected={props.positions === 'space-around' ? true : false}
            value="space-around"
          >
            Space Around
          </option>
          <option
            selected={props.positions === 'space-evenly' ? true : false}
            value="space-evenly"
          >
            Space Evenly
          </option>
          <option
            selected={props.positions === 'flex-end' ? true : false}
            value="flex-end"
          >
            Right
          </option>
          <option
            selected={props.positions === 'flex-start' ? true : false}
            value="flex-start"
          >
            Left
          </option>
        </select>
      </div>
    </div>
  );
};

ButtonContainer.craft = {
  rules: {
    canMoveIn: incomingNode => incomingNode.length && (incomingNode[0].data.type === Button || incomingNode[0].data.type === Picture),
  },
  related: {
    settings: ButtonContainerSettings,
  },
};
