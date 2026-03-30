import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/src/theme';

import '@mantine/core/styles.css';
import '@/src/styles/global.css';
import '@/src/styles/highlights.css';

import { DM_Mono, Fira_Code, Inconsolata, JetBrains_Mono, Roboto_Mono, Source_Code_Pro, Space_Mono, Ubuntu_Mono } from 'next/font/google';


const dm_mono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm_mono', // define a CSS variable
  weight: ['300', '400', '500'], // specify weights if not using a variable font
});
const jet_brains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jet_brains', // define a CSS variable
  weight: ['400', '700'], // specify weights if not using a variable font
});
const fira = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira', // define a CSS variable
  weight: ['400', '500'], // specify weights if not using a variable font
});
const source_code = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source_code', // define a CSS variable
  weight: ['400', '600'], // specify weights if not using a variable font
});
const ubuntu = Ubuntu_Mono({
  subsets: ['latin'],
  variable: '--font-ubuntu', // define a CSS variable
  weight: ['400', '700'], // specify weights if not using a variable font
});
const roboto = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto', // define a CSS variable
  weight: ['400', '500'], // specify weights if not using a variable font
});
const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata', // define a CSS variable
  weight: ['400', '500'], // specify weights if not using a variable font
});
const space = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space', // define a CSS variable
  weight: ['400', '700'], // specify weights if not using a variable font
});



export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component
        {...pageProps}
        className={`${jet_brains.variable} ${dm_mono.variable} ${fira.variable} ${inconsolata.variable} ${roboto.variable} ${source_code.variable} ${space.variable} ${ubuntu.variable}`}
      />
    </MantineProvider>
  );
}
