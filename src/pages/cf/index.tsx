import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { Flex, Loader } from '@mantine/core';
import Layout from '@/src/components/layout';
import SnippetsList from '@/src/components/list';


const IndexCFPage = () => {

  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if(isLoaded && !isSignedIn){
      router.push('/')
    }
  }, [isLoaded, isSignedIn]);


  return (
    <Layout>
      { isLoaded
        ? <SnippetsList />
        : <Flex flex={1} align="center" justify="center">
            <Loader size={30} />
          </Flex>
      }
    </Layout>
  )

}

export default IndexCFPage;