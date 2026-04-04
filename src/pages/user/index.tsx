import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { Flex, Loader } from '@mantine/core';
import Layout from '@/src/components/layout';



const LoginPage = () => {

  const { isLoaded, user } = useUser();
  const router = useRouter();


  const updateUserData = async (user:any) => {

    const response = await fetch(`/api/users/${user.id}`, {
      method: 'POST',
      body: JSON.stringify(user),
    });

    if(!response.ok){
      throw new Error('Failed to update user data');
    }
    router.push('/');
  }


  useEffect(() => {
    if(isLoaded){
      if(!user){
        router.push('/');
        return
      }
      updateUserData(user)
    }
  }, [isLoaded, user])


  return (
    <Layout>
      <Flex flex={1} align="center" justify="center">
        <Loader size={70} />
      </Flex>
    </Layout>
  );
};

export default LoginPage;