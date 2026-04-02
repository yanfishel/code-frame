import React, { useState } from 'react';
import cx from 'clsx';
import {
  ChevronDownIcon,
  HeartIcon,
  LogOutIcon,
  MessageSquareIcon,
  PauseIcon,
  SettingsIcon,
  StarIcon,
  SwitchCameraIcon,
  Trash2Icon,
} from 'lucide-react';
import { Avatar, Group, Menu, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import classes from './user-menu.module.css';


const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};


const UserMenu = () => {

  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton size="xs" className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar src={user.image} alt="" radius="xl" size={24} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            <ChevronDownIcon size={12} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<HeartIcon size={16} color={theme.colors.red[6]} />}>
          Liked posts
        </Menu.Item>
        <Menu.Item leftSection={<StarIcon size={16} color={theme.colors.yellow[6]} />}>
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={<MessageSquareIcon size={16} color={theme.colors.blue[6]} />}
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<SettingsIcon size={16} />}>
          Account settings
        </Menu.Item>
        <Menu.Item leftSection={<SwitchCameraIcon size={16} />}>
          Change account
        </Menu.Item>
        <Menu.Item leftSection={<LogOutIcon size={16} />}>Logout</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<PauseIcon size={16} />}>
          Pause subscription
        </Menu.Item>
        <Menu.Item color="red" leftSection={<Trash2Icon size={16} />}>
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;