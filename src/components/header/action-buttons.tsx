import React, { memo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import { PlusIcon, SquareChartGanttIcon } from 'lucide-react';
import { Button } from '@mantine/core';
import { SIGNUP_LIST_OPTIONS, SNIPPETS_PATH } from '@/src/constants';
import { useStore } from '@/src/store';
import SaveButton from './save-button';
import classes from './header.module.css';


const ActionButtons = () => {

  const pathname = usePathname();
  const router = useRouter();
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  const goToPage = useStore((state) => state.goToPage);


  const onHomeClickHandler = () => {
    goToPage('/', router.push)
  };

  const onSnippetsClickHandler = useCallback(() => {
    if (isSignedIn) {
      if (router.asPath !== SNIPPETS_PATH) {
        goToPage(SNIPPETS_PATH, router.push);
      }
    } else {
      openSignUp(SIGNUP_LIST_OPTIONS)
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
          New snippet
        </Button>
      )}

      {isSignedIn && (
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