import { memo, useEffect, useMemo } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { Flex, Loader } from '@mantine/core';
import Layout from '@/src/components/layout';
import Snippets from '@/src/components/snippets';
import SnippetsSignin from '@/src/components/snippets/snippets-signin';
import { SNIPPETS_PATH } from '@/src/constants';
import { useStore } from '@/src/store';
import { signInOptions } from '@/src/util';


const SnippetsPage = () => {

  const { openSignIn } = useClerk();
  const { isLoaded, isSignedIn } = useUser();

  const SignInOptions = useMemo(() => signInOptions(SNIPPETS_PATH, '/'), []);


  useEffect(() => {
    if(isLoaded && !isSignedIn){
      openSignIn(SignInOptions);
    } else if(isLoaded && isSignedIn){
      const listDivider = Math.round(window.innerWidth * 0.1);
      useStore.setState({ dividerPosition: listDivider });
    }
  }, [isLoaded, isSignedIn]);


  return (
    <Layout>
      {!isLoaded ? (
        <Flex flex={1} align="center" justify="center">
          <Loader size={30} />
        </Flex>
      ) : isSignedIn ? (
        <Snippets />
      ) : (
        <SnippetsSignin />
      )}
    </Layout>
  );

}

export default memo(SnippetsPage)