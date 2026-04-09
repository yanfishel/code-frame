import React from 'react';
import { useRouter } from 'next/router';
import { SettingsIcon } from 'lucide-react';
import { ActionIcon, Box, Container, Flex, Group, Text } from '@mantine/core';
import { LogoIcon } from '@/src/assets/icons';
import SavingIndicator from '@/src/components/header/saving-indicator';
import ThemeToggler from '@/src/components/theme-toggler';
import { useStore } from '@/src/store';
import ActionButtons from './action-buttons';
import SnippetName from './snippet-name';
import UserMenu from './user-menu';
import classes from './header.module.css';


const Header = () => {

  const router = useRouter()

  const resetToStart = useStore((state) => state.resetToStart)

  const onLogoClick = () => {
    resetToStart();
    router.push('/')
  }


  return (
    <Box className={classes.header}>
      <Container fluid className={classes.mainSection}>
        <Group justify="space-between">
          <Flex align="center">
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

            <SnippetName />
          </Flex>

          <Flex gap="md" align="center">
            <SavingIndicator />

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

export default Header;