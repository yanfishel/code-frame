import React from 'react';
import { Flex, Text } from '@mantine/core';
import classes from './placeholder.module.css';


const PreviewPlaceholder = () => {

  return (
    <Flex className={classes.previewPlaceholder}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        style={{ width: '240px', height: '240px' }}
      >
        <path
          fill="currentColor"
          d="M12 6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V12a6 6 0 0 0-6-6zm8.884 9.366a1.25 1.25 0 0 1 0 1.768L14.018 24l6.866 6.866a1.25 1.25 0 0 1-1.768 1.768l-7.75-7.75a1.25 1.25 0 0 1 0-1.768l7.75-7.75a1.25 1.25 0 0 1 1.768 0m8 0l7.75 7.75a1.25 1.25 0 0 1 0 1.768l-7.75 7.75a1.25 1.25 0 0 1-1.768-1.768L33.982 24l-6.866-6.866a1.25 1.25 0 0 1 1.768-1.768"
        />
      </svg>
      <Text size="70px" lh="1" component="span" style={{ fontWeight: 900, textAlign: 'center' }}>
        CODE FRAME
      </Text>
    </Flex>
  );
};

export default PreviewPlaceholder;