import { FormLabel } from '@appquality/appquality-design-system';
import {useNode, UserComponent} from '@appquality/craftjs-core';
import React from 'react';
import { MarginSettings, useMargins } from './generic/Margins';

interface LayoutContainerProps extends BasicElementProps, MarginProps {
  positions: string;
}

export const Layout: UserComponent = ({ children, positions, ...props }: LayoutContainerProps) => {
  const {
    connectors: { connect, drag },
    isSelected
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  let className = useMargins(props);
  if (isSelected) className = `${className} craftjs-node-selected`;

  const style = { display: 'flex', justifyContent: positions || 'flex-start' };

  return (
    <div
      className={className}
      style={style}
      {...props}
      ref={ref => connect(drag(ref as HTMLDivElement))}
    >
      {children}
    </div>
  );
};

export const LayoutContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode(node => ({
    props: node.data.props,
  }));
  return (
    <div>
      <div style={{ float: 'left', width: '100%', marginBottom: '10px' }}>
        <MarginSettings />
      </div>
      <div style={{ float: 'left', width: '100%', marginBottom: '10px' }}>
        <FormLabel htmlFor="spacing-select" label="Spacing" />
        <select
          id="spacing-select"
          onChange={e => setProp((props: LayoutContainerProps) => (props.positions = e.target.value))}
        >
          <option
            selected={typeof props.positions === 'undefined'}
            value="none"
          >
            None
          </option>
          <option
            selected={props.positions === 'center'}
            value="center"
          >
            Center
          </option>
          <option
            selected={props.positions === 'space-between'}
            value="space-between"
          >
            Space Between
          </option>
          <option
            selected={props.positions === 'space-around'}
            value="space-around"
          >
            Space Around
          </option>
          <option
            selected={props.positions === 'space-evenly'}
            value="space-evenly"
          >
            Space Evenly
          </option>
          <option
            selected={props.positions === 'flex-end'}
            value="flex-end"
          >
            Right
          </option>
          <option
            selected={props.positions === 'flex-start'}
            value="flex-start"
          >
            Left
          </option>
        </select>
      </div>
    </div>
  );
};

Layout.craft = {
  rules: {
    canMoveIn: () => true,// accept all components
  },
  isCanvas: true,
  related: {
    settings: LayoutContainerSettings,
  },
};
