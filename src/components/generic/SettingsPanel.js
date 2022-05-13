import {
  BSCol, BSGrid, Button, Card,
  Pill, Title
} from '@appquality/appquality-design-system';
import { useEditor } from '../index';
import React from 'react';

export const SettingsPanel = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return isEnabled && selected ? (
    <Card>
      <BSGrid>
        <BSCol size="col-12 aq-mb-3">
          <BSGrid>
            <BSCol size="col"><Title size="sm">Selected</Title></BSCol>
            <BSCol size="col">
              <Pill className="aq-float-right" type="primary" data-cy="chip-selected">
                {selected.name}
              </Pill>
            </BSCol>
          </BSGrid>
        </BSCol>
        <div data-cy="settings-panel">
          {selected.settings && React.createElement(selected.settings)}
        </div>
        {selected.isDeletable ? (
          <Button
            type="primary"
            flat={true}
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </Button>
        ) : null}
      </BSGrid>
    </Card>
  ) : null;
};
