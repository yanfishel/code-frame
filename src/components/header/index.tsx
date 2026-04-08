import React from 'react';
import dynamic from 'next/dynamic';
import { SettingsIcon } from 'lucide-react';
import { ActionIcon, Box, Container, Flex, Group, Text } from '@mantine/core';
import { LogoIcon } from '@/src/assets/icons';
import ThemeToggler from '@/src/components/theme-toggler';
import { useStore } from '@/src/store';
import SaveButton from './save-button';
import UserMenu from './user-menu';
import classes from './header.module.css';


const Header = () => {

  return (
    <Box className={classes.header}>
      <Container fluid className={classes.mainSection}>
        <Group justify="space-between">
          <Flex gap="xs" align="center">
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

          <Flex align="center" gap="xs" className={classes.headerToolbar} >
            <SaveButton />

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
        </Group>
      </Container>
    </Box>
  );
};

export default Header;