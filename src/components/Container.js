import { useNode } from '@craftjs/core';
import React from 'react';
import { Container as AppqContainer } from '@appquality/appquality-design-system';

export const Container = ({ className, children, ...props }) => {
  const {
    connectors: { connect, drag },
    isSelected
  } = useNode(node => ({
    isSelected: node.events.selected
  }));
  return (
    <div {...props} ref={ref => connect(drag(ref))}>
      <AppqContainer className={className}>{children}</AppqContainer>
    </div>
  );
};
