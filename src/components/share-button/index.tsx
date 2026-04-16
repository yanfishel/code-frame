import React, { MouseEvent, useState } from 'react';
import { CheckIcon, FilesIcon, ShareIcon } from 'lucide-react';
import { ActionIcon, Button, CopyButton, Flex, Popover, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { SHARE_LINKS } from '@/src/constants';
import classes from './share-button.module.css';


interface IShareButtonProps {
  id?: string;
  name?: string;
}
const ShareButton = ({ id, name }: IShareButtonProps) => {

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const theme = useMantineTheme();

  const shareUrl = encodeURI(`${window.location.origin}/${id}`)


  const onShareClickHandler = (link: string) => {
    setOpened(false);
    const shareText = `Check out this ${name ? `«${name}»` : 'awesome'} snippet!`
    const windowUrl = link.replace('***TEXT***', shareText).replace('***URL***', shareUrl)
    window.open(windowUrl, '_blank');
  };


  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpened(true);
  };


  if(!id) {
    return null;
  }

  return (
    <>
      <Popover withArrow offset={0} shadow="lg" opened={opened}>
        <Popover.Target>
          <Tooltip
            label="Share Snippet"
            withArrow
            position="top"
            transitionProps={{ transition: 'skew-down' }}
          >
            <Button
              variant="default"
              size="xs"
              leftSection={<ShareIcon size={14} />}
              onClick={onClickHandler}
            >
              Share
            </Button>
          </Tooltip>
        </Popover.Target>
        <Popover.Dropdown ref={ref} p="md" w={260}>
          <Flex direction="column" gap="xs" align="center">
            <Text size="sm" ta="center" mb="xs">
              Share this snippet with your friends
            </Text>
            <Flex align="center" gap="xs" wrap="wrap" justify="center" w="100%">
              {SHARE_LINKS.map((link) => (
                <Tooltip
                  label={`Share with ${link.name}`}
                  withArrow
                  position="top"
                  transitionProps={{ transition: 'skew-down' }}
                >
                  <ActionIcon
                    key={link.name}
                    variant="default"
                    size={36}
                    radius="xl"
                    onClick={() => onShareClickHandler(link.link)}
                    className={classes.shareButton}
                  >
                    {link.icon}
                  </ActionIcon>
                </Tooltip>
              ))}

              <CopyButton value={shareUrl}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? 'Copied!' : 'Copy URL to Clipboard'}
                    withArrow
                    position="top"
                    transitionProps={{ transition: 'skew-down' }}
                  >
                    <ActionIcon onClick={copy} variant="default" size={36} radius="xl">
                      {copied ? (
                        <CheckIcon size={18} color={theme.colors.green[6]} />
                      ) : (
                        <FilesIcon size={18} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Flex>
          </Flex>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default ShareButton;