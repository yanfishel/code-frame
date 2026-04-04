import React from 'react';
import { useClerk } from "@clerk/nextjs";
import { HardDriveDownload } from 'lucide-react';
import { Box, Button, Tooltip } from '@mantine/core';


const SaveButton = () => {

  const { openSignIn, openUserProfile } = useClerk();

  return (
      <Tooltip label="Save snippet" withArrow position="top" transitionProps={{ transition: 'skew-down' }}>
        <Button
          size="sm"
          variant="primary"
          radius="sm"
          leftSection={<HardDriveDownload size={14} />}
          onClick={() => openSignIn()}
        >
          Save <Box visibleFrom="xs" style={{marginLeft: '6px'}}>snippet</Box>
        </Button>
      </Tooltip>
  );
};

export default SaveButton;