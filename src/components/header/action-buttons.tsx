import React, { memo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import { HouseIcon, SquareChartGanttIcon } from 'lucide-react';
import { Button } from '@mantine/core';
import SaveButton from '@/src/components/header/save-button';
import { SIGNUP_LIST_OPTIONS } from '@/src/constants';
import classes from './header.module.css';
import { useStore } from '@/src/store';


const ActionButtons = () => {

  const pathname = usePathname();
  const router = useRouter();
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  const goToPage = useStore((state) => state.goToPage);


  const onHomeClickHandler = () => {
    goToPage(() => router.push('/'))
  };

  const onSnippetsClickHandler = useCallback(() => {
    if (isSignedIn) {
      goToPage(() => router.push('/snippets'))
    } else {
      openSignUp(SIGNUP_LIST_OPTIONS)
    }
  }, [isSignedIn])


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

      <Button
        size="xs"
        variant="default"
        radius="sm"
        disabled={pathname === '/snippets'}
        onClick={onSnippetsClickHandler}
        leftSection={<SquareChartGanttIcon size={14} />}
        className={classes.toolbarButton}
      >
        Your snippets
      </Button>
    </>
  );

}

export default memo(ActionButtons)