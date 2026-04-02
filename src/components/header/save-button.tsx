import React from 'react';
import { Button, Tooltip } from '@mantine/core';
import { HardDriveDownload } from 'lucide-react';


const SaveButton = () => {

  return (
    <div>
      <Tooltip label="Coming soon">
        <Button disabled size="sm" variant="primary" radius="sm" leftSection={ <HardDriveDownload size={14} />}>
          Save snippet
        </Button>
      </Tooltip>
    </div>
  );
};

export default SaveButton;