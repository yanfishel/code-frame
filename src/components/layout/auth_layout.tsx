import React from 'react';
import { ClerkProvider } from "@clerk/nextjs";
import { Container } from '@mantine/core';
import Footer from '@/src/components/footer';
import Header from '@/src/components/header';
import GoogleFonts from '@/src/components/layout/google-fonts';

import classes from './layout.module.css';


interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {

  return (
    <ClerkProvider
      appearance={{
        cssLayerName: 'clerk',
      }}
    >
    <GoogleFonts >
      <Header />
      <Container fluid className={classes.mainContainer}>
        {children}
      </Container>
      <Footer />
    </GoogleFonts>
    </ClerkProvider>
  );
}

export default Layout;