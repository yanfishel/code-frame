'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HomeIcon } from 'lucide-react';
import { Button, Flex } from '@mantine/core';
import animationData from '@/src/animations/development.json';
import LottieAnimation from '@/src/components/lottie-animation';


const NotFound = () => {

  const router = useRouter();


  return (
    <Flex direction="column" align="center" gap="lg" style={{ minHeight: '600px' }}>
      <h1 style={{margin:'30px 0 0'}}>404. Not found :(</h1>

      <LottieAnimation
        data={animationData}
        style={{ width: '80%', maxWidth: '400px' }}
      />

      <Button variant="outline" leftSection={<HomeIcon size={16} />} onClick={() => router.push('/')} >Home Page</Button>
    </Flex>
  );
};

export default NotFound;