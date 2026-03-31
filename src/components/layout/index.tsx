import React, { useEffect, useState } from 'react';
import { DM_Mono, Fira_Code, Inconsolata, JetBrains_Mono, Roboto_Mono, Source_Code_Pro, Space_Mono, Ubuntu_Mono } from 'next/font/google';
import clsx from 'clsx';
import { Container } from '@mantine/core';
import Aside from '@/src/components/aside';
import Footer from '@/src/components/footer';
import Header from '@/src/components/header';
import classes from './layout.module.css';
import { useStore } from '@/src/store';


const dm_mono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm_mono', // define a CSS variable
  weight: ['300', '400', '500'], // specify weights if not using a variable font
});
const jet_brains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains_mono', // define a CSS variable
  weight: ['400', '700'], // specify weights if not using a variable font
});
const fira = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira_code', // define a CSS variable
  weight: ['400', '500'], // specify weights if not using a variable font
});
const source_code = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source_code_pro', // define a CSS variable
  weight: ['400', '600'], // specify weights if not using a variable font
});
const ubuntu = Ubuntu_Mono({
  subsets: ['latin'],
  variable: '--font-ubuntu_mono', // define a CSS variable
  weight: ['400', '700'], // specify weights if not using a variable font
});
const roboto = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto_mono', // define a CSS variable
  weight: ['400', '500'], // specify weights if not using a variable font
});
const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata', // define a CSS variable
  weight: ['400', '500'], // specify weights if not using a variable font
});
const space = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space_mono', // define a CSS variable
  weight: ['400', '700'], // specify weights if not using a variable font
});

interface LayoutProps {
  children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {

  return (
    <div
      className={clsx(
        classes.layout,
        jet_brains.variable,
        dm_mono.variable,
        fira.variable,
        inconsolata.variable,
        roboto.variable,
        source_code.variable,
        space.variable,
        ubuntu.variable
      )}
    >
      <Header />
      <Container fluid className={classes.mainContainer}>
        <Aside />
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;