import React from 'react';
import { useClerk } from '@clerk/nextjs';
import { UserIcon } from 'lucide-react';
import { Button, Flex, Text } from '@mantine/core';
import PreviewPlaceholder from '@/src/components/preview-placeholder';
import { SIGNIN_LIST_OPTIONS } from '@/src/constants';


const SnippetsSignin = () => {

  const { openSignIn } = useClerk();


  return (
    <Flex flex={1} align="center" justify="center">
      <PreviewPlaceholder />
      <Flex direction="column" align="center" gap={10} style={{ position: 'relative', zIndex: 2 }}>
        <Text>Sign in to view your snippets</Text>
        <Button
          leftSection={<UserIcon size={16} />}
          onClick={() => openSignIn(SIGNIN_LIST_OPTIONS)}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
};

export default SnippetsSignin;