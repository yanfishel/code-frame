import React from 'react';
import dynamic from 'next/dynamic';
import { SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { SettingsIcon } from 'lucide-react';
import { ActionIcon, Box, Container, Flex, Group, Text, useMantineColorScheme } from '@mantine/core';
import { LogoIcon } from '@/src/assets/icons';
import SaveButton from '@/src/components/header/save-button';
import { useStore } from '@/src/store';
import classes from './header.module.css';


const ThemeToggler = dynamic(() => import('@/src/components/theme-toggler'), { ssr: false });


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
              <Text
                size="10px"
                c="dimmed"
                style={{ lineHeight: '1.1', textTransform: 'uppercase', letterSpacing: '1.5px' }}
              >
                Code snippet image
              </Text>
            </Flex>
          </Flex>


            <Flex
              align="center"
              gap="xs"
              p="xs"
              style={{
                height: '40px',
                borderRadius: 'var(--mantine-radius-sm)',
                background: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
              }}
            >
              <SaveButton />

              <ThemeToggler />

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