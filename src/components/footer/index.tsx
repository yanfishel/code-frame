import React from 'react';
import { MailIcon } from 'lucide-react';
import { ActionIcon, Box, Container, Flex, Tooltip, UnstyledButton, useMantineTheme } from '@mantine/core';
import { GithubIcon } from '@/src/assets/icons';
import classes from './footer.module.css';


const Footer = () => {


  return (
    <Container fluid className={classes.footer}>
      <UnstyledButton component="a" href="https://fishart.co.il" target="_blank">
        <Box lightHidden style={{ opacity: 0.25 }}>
          <img src="/images/fishart.png" alt="FishArt" width="90" height="21" />
        </Box>
        <Box darkHidden style={{ opacity: 0.85 }}>
          <img src="/images/fishart.png" alt="FishArt" width="90" height="21" />
        </Box>
      </UnstyledButton>

      <Flex gap="3px" align="center" style={{ fontSize: '0.7rem' }}>
        <span style={{ opacity: 0.65 }}>
          Code Frame &copy; {new Date().getFullYear()}. Made with
        </span>
        <span style={{ color: "red", fontSize: '1.2rem', opacity: 0.75 }}>♥</span>
        <span style={{ opacity: 0.65 }}>for the web</span>
      </Flex>

      <Flex gap="xs" align="center">
        <Tooltip
          label="Send feedback"
          withArrow
          position="top"
          transitionProps={{ transition: 'skew-down' }}
        >
          <ActionIcon
            aria-label="Send feedback"
            radius="xl"
            variant="default"
            size="lg"
            component="a"
            href="mailto:yan.fishel@gmail.com?subject=Code Frame Feedback"
            target="_blank"
          >
            <MailIcon size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label="Code Frame on GitHub"
          withArrow
          position="top"
          transitionProps={{ transition: 'skew-down' }}
        >
          <ActionIcon
            aria-label="Code Frame on GitHub"
            radius="xl"
            variant="default"
            size="lg"
            component="a"
            href="https://github.com/yanfishel/code-frame"
            target="_blank"
          >
            <GithubIcon />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Container>
  );
};

export default Footer;