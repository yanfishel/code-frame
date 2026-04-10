import React from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Text } from '@mantine/core';
import { LogoIcon } from '@/src/assets/icons';
import { useStore } from '@/src/store';
import classes from './header.module.css';


const HeaderLogo = () => {

  const router = useRouter();
  const goToPage = useStore((state) => state.goToPage);

  const onLogoClick = () => {
    if (router.asPath !== '/') {
      goToPage('/', router.push);
    }
  }


  return (
    <Box className={classes.logoContainer}>
      <Flex gap="xs" align="center" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <LogoIcon size={36} />
        <Flex direction="column" gap="1px" visibleFrom="xs">
          <Text
            size="xl"
            lh="1.1"
            variant="gradient"
            component="span"
            gradient={{ from: '#7d4fc6', to: '#228be6', deg: 32 }}
            className={classes.logoText}
          >
            CODE FRAME
          </Text>
          <Text size="10px" c="dimmed" className={classes.logoSubText}>
            Code snippet image
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeaderLogo;