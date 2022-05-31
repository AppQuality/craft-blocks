import { useNode } from '@appquality/craftjs-core';
import React from 'react';
import { Container as AppqContainer } from '@appquality/appquality-design-system';

export const Container: React.FC<BasicElementProps> = ({className, children, ...props }) => {
  const {
    connectors: { connect, drag }
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  return (
    <div {...props} ref={ref => connect(drag(ref as HTMLDivElement))}>
      <AppqContainer>{children}</AppqContainer>
    </div>
  );
};
