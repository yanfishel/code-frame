'use client';

import React, { memo, useEffect } from 'react';
import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { ActionIcon, Avatar, Divider, Flex, Menu, Text, Tooltip } from '@mantine/core';
import { useStore } from '@/src/store';
import { mapUserData } from '@/src/util';


const UserMenu = () => {

  const { isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const { openSignIn, openUserProfile, user } = useClerk();

  const setUser = useStore((state) => state.setUser);


  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    setUser(mapUserData(user));

  }, [user, isLoaded]);


  return !isSignedIn ? (
    <div>
      <Tooltip label="Sign in / Sign up" withArrow position="bottom">
        <ActionIcon
          size={30}
          radius="sm"
          variant="default"
          aria-label="Sign in / Sign up"
          onClick={() => openSignIn()}
          style={{ boxShadow: 'var(--mantine-shadow-xs)' }}
        >
          <UserIcon size={16} />
        </ActionIcon>
      </Tooltip>
    </div>
  ) : (
    <Menu shadow="md" position="bottom-end" trigger="hover" transitionProps={{ transition: 'pop-top-right' }}>
      <Menu.Target>
        <ActionIcon
          size={30}
          radius="sm"
          variant="default"
          aria-label="User menu"
          style={{ padding: 0, boxShadow: 'var(--mantine-shadow-xs)' }}
        >
          <Avatar
            src={user?.imageUrl ?? ''}
            variant="default"
            alt={user?.fullName ?? 'User'}
            radius="sm"
            size={30}
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Flex align="flex-start" px="sm" py="xs" gap="md">
          <Avatar
            src={user?.imageUrl ?? ''}
            variant="default"
            alt={user?.fullName ?? 'User'}
            radius="sm"
            size={40}
          />
          <Flex direction="column" gap="2px">
            <Text size="sm" fw={500}>
              {user?.fullName ?? 'User'}
            </Text>
            <Text size="xs" c="dimmed">
              {user?.primaryEmailAddress?.emailAddress ?? ''}
            </Text>
          </Flex>
        </Flex>
        <Divider />
        <Menu.Item onClick={() => openUserProfile()} leftSection={<SettingsIcon size={14} />}>
          Manage Account
        </Menu.Item>
        <Divider />
        <Menu.Item onClick={() => signOut()} leftSection={<LogOutIcon size={14} />}>
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default memo(UserMenu)