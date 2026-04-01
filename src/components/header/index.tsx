import React from 'react';
import dynamic from 'next/dynamic';
import { Burger, Container, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LogoIcon } from '@/src/components/assets/icons';
import UserMenu from '@/src/components/user-menu';
import classes from './header.module.css';


const ThemeToggler = dynamic(() => import('@/src/components/theme-toggler'), { ssr: false });


const Header = () => {

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className={classes.header}>
      <Container fluid className={classes.mainSection}>
        <Group justify="space-between">
          <Flex gap="xs" align="center">
            <LogoIcon />
            <Text
              size="xl"
              lh="1.1"
              variant="gradient"
              component="span"
              gradient={{ from: '#7d4fc6', to: '#228be6', deg: 32 }}
              style={{ fontWeight:900, filter: 'drop-shadow(1px 1px 1px light-dark(rgba(255, 255, 255, 0.95), rgba(0, 0, 0, 0.95))' }}
            >
              CODE FRAME
            </Text>

            {/*<Text
              size="lg"
              variant="gradient"
              component="span"
              fw="bold"
              gradient={{ from: 'pink', to: 'yellow' }}
            >
              &lt;Code.Frame/&gt;
            </Text>*/}
          </Flex>

          <Group>
            <UserMenu />

            <ThemeToggler />

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
              aria-label="Toggle navigation"
            />
          </Group>
        </Group>
      </Container>
    </div>
  );
};

export default Header;