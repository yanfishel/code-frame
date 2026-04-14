import React, { memo, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import { PlusIcon, SquareChartGanttIcon } from 'lucide-react';
import { ActionIcon, Box, Button } from '@mantine/core';
import { SNIPPETS_PATH } from '@/src/constants';
import { useStore } from '@/src/store';
import { signUpOptions } from '@/src/util';
import SaveButton from './save-button';
import classes from './header.module.css';


const ActionButtons = () => {

  const pathname = usePathname();
  const router = useRouter();
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  const goToPage = useStore((state) => state.goToPage);

  const SignUpOptions = useMemo(() => signUpOptions(SNIPPETS_PATH, SNIPPETS_PATH), []);


  const onHomeClickHandler = () => {
    goToPage('/', router.push)
  };

  const onSnippetsClickHandler = useCallback(() => {
    if (isSignedIn) {
      if (router.asPath !== SNIPPETS_PATH) {
        goToPage(SNIPPETS_PATH, router.push);
      }
    } else {
      openSignUp(SignUpOptions);
    }
  }, [isSignedIn, router.asPath])


  return (
    <>
      {pathname !== SNIPPETS_PATH && <SaveButton />}

      {pathname === SNIPPETS_PATH && (
        <Button
          size="xs"
          radius="sm"
          onClick={onHomeClickHandler}
          leftSection={<PlusIcon size={14} />}
          className={classes.toolbarButton}
        >
          New{' '}
          <Box visibleFrom="xs" ml="0.5em">
            snippet
          </Box>
        </Button>
      )}

      {isSignedIn && (
        <>
          <Button
            size="xs"
            variant="default"
            radius="sm"
            visibleFrom="sm"
            onClick={onSnippetsClickHandler}
            leftSection={<SquareChartGanttIcon size={14} />}
            className={classes.toolbarButton}
          >
            Your snippets
          </Button>
          <ActionIcon
            hiddenFrom="sm"
            variant="default"
            radius="sm"
            size={30}
            onClick={onSnippetsClickHandler}
            className={classes.toolbarButton}
          >
            <SquareChartGanttIcon size={14} />
          </ActionIcon>
        </>
      )}
    </>
  );

}

export default memo(ActionButtons)