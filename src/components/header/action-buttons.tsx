import React, { memo, useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import { HouseIcon, SquareChartGanttIcon } from 'lucide-react';
import { Button } from '@mantine/core';
import SaveButton from '@/src/components/header/save-button';
import { SIGNUP_LIST_OPTIONS } from '@/src/constants';
import { useStore } from '@/src/store';
import classes from './header.module.css';


const ActionButtons = () => {

  const pathname = usePathname();
  const router = useRouter();
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  const resetToStart = useStore((state) => state.resetToStart);


  const onHomeClickHandler = () => {
    resetToStart();
    router.push('/');
  };

  const onSnippetsClickHandler = useCallback(() => {
    if (isSignedIn) {
      useStore.setState({ isReady: false });
      router.push('/snippets');
    } else {
      openSignUp(SIGNUP_LIST_OPTIONS);
    }
  }, [isSignedIn]);

  console.log(pathname, router.asPath, router.pathname, router.query);


  return (
    <>
      {pathname === '/' && <SaveButton />}

      {pathname !== '/' && (
        <Button
          size="xs"
          variant="default"
          radius="sm"
          onClick={onHomeClickHandler}
          leftSection={<HouseIcon size={14} />}
          className={classes.toolbarButton}
        >
          Main page
        </Button>
      )}
      {pathname !== '/snippets' && (
        <Button
          size="xs"
          variant="default"
          radius="sm"
          onClick={onSnippetsClickHandler}
          leftSection={<SquareChartGanttIcon size={14} />}
          className={classes.toolbarButton}
        >
          Your snippets
        </Button>
      )}
    </>
  );

}

export default memo(ActionButtons)