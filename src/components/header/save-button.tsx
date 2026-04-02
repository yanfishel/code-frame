import React from 'react';
import { HardDriveDownload } from 'lucide-react';
import { Box, Button, Tooltip } from '@mantine/core';


const SaveButton = () => {

  return (
    <div>
      <Tooltip label="Coming soon">
        <Button
          disabled
          size="sm"
          variant="primary"
          radius="sm"
          leftSection={<HardDriveDownload size={14} />}
        >
          Save <Box visibleFrom="xs" style={{marginLeft: '6px'}}>snippet</Box>
        </Button>
      </Tooltip>
    </div>
  );
};

export default SaveButton;