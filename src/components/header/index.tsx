import React from 'react';
import dynamic from 'next/dynamic';
import { Burger, Container, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserMenu from '@/src/components/user-menu';
import classes from './header.module.css';


const ThemeToggler = dynamic(() => import('@/src/components/theme-toggler'), { ssr: false });


const Header = () => {

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className={classes.header}>
      <Container fluid className={classes.mainSection}>
        <Group justify="space-between">
          <Text
            size="lg"
            variant="gradient"
            component="span"
            fw="bold"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            &lt;Code.Frame/&gt;
          </Text>

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