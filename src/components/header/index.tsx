import React, { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SettingsIcon } from 'lucide-react';
import { ActionIcon, Box, Container, Flex, Group } from '@mantine/core';
import SavingIndicator from '@/src/components/header/saving-indicator';
import ThemeToggler from '@/src/components/theme-toggler';
import { useStore } from '@/src/store';
import ActionButtons from './action-buttons';
import HeaderLogo from './header-logo';
import SnippetName from './snippet-name';
import UserMenu from './user-menu';
import classes from './header.module.css';


const Header = () => {

  const router = useRouter()

  useEffect(() => {
    let dividerPosition = 0;
    if (router.asPath === '/snippets') {
      dividerPosition = Math.round(window.innerWidth * 0.1);
    }
    useStore.setState({ dividerPosition });
  }, [router.asPath]);


  return (
    <Box className={classes.header}>
      <Container fluid className={classes.mainSection}>
        <Group justify="space-between">
          <Flex align="center">
            <HeaderLogo />

            <SnippetName />
          </Flex>

          <Flex gap="md" align="center">
            { (router.asPath !== '/' && router.asPath !== '/snippets') &&
              <SavingIndicator />
            }

            <Flex align="center" gap="xs" className={classes.headerToolbar}>
              <ActionButtons />

              <ThemeToggler />

              <UserMenu />

              <Box hiddenFrom="md">
                <ActionIcon
                  size="lg"
                  variant="default"
                  aria-label="Settings"
                  onClick={() => useStore.setState({ settingsOpened: true })}
                  style={{ width: '36px', height: '36px' }}
                >
                  <SettingsIcon size={18} />
                </ActionIcon>
              </Box>
            </Flex>
          </Flex>
        </Group>
      </Container>
    </Box>
  );
};

export default memo(Header)