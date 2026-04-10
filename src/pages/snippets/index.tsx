import { useEffect } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { Flex, Loader } from '@mantine/core';
import Layout from '@/src/components/layout';
import Snippets from '@/src/components/snippets';
import SnippetsSignin from '@/src/components/snippets/snippets-signin';
import { SIGNIN_LIST_OPTIONS } from '@/src/constants';
import { useStore } from '@/src/store';


const SnippetsPage = () => {

  const { openSignIn } = useClerk();
  const { isLoaded, isSignedIn } = useUser();


  useEffect(() => {
    if(isLoaded && !isSignedIn){
      openSignIn(SIGNIN_LIST_OPTIONS);
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

export default SnippetsPage;