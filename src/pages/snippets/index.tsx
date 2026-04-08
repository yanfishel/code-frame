import { useEffect } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { UserIcon } from 'lucide-react';
import { Button, Flex, Loader, Text } from '@mantine/core';
import Layout from '@/src/components/layout';
import SnippetsList from '@/src/components/list';
import PreviewPlaceholder from '@/src/components/preview-placeholder';


const SnippetsPage = () => {

  const { openSignIn } = useClerk();
  const { isLoaded, isSignedIn } = useUser();

  const options = {
    signUpFallbackRedirectUrl: '/',
    signUpForceRedirectUrl: '/snippets',
    forceRedirectUrl: '/snippets',
    fallbackRedirectUrl: '/',
  };

  useEffect(() => {
    if(isLoaded && !isSignedIn){
      openSignIn(options);
    }
  }, [isLoaded, isSignedIn]);


  return (
    <Layout>
      {!isLoaded ? (
        <Flex flex={1} align="center" justify="center">
          <Loader size={30} />
        </Flex>
      ) : isSignedIn ? (
        <SnippetsList />
      ) : (
        <Flex flex={1} align="center" justify="center">
          <PreviewPlaceholder />
          <Flex direction="column" align="center" gap={10} style={{position: 'relative',zIndex:2}}>
            <Text>Sign in to view your snippets</Text>
            <Button leftSection={<UserIcon size={16} />} onClick={() => openSignIn(options)}>Sign In</Button>
          </Flex>
        </Flex>
      )}
    </Layout>
  );

}

export default SnippetsPage;