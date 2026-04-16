import React from 'react';
import Layout from '@/src/components/layout';
import NotFound from '@/src/components/not-found';
import classes from '@/src/styles/main.module.css';


const NotFoundPage = () => {

  return (
    <Layout>
      <main role="main" className={classes.mainViewArea}>
        <NotFound />
      </main>
    </Layout>
  );
};

export default NotFoundPage;