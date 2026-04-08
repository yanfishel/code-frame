import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { Container } from '@mantine/core';
import Footer from '@/src/components/footer';
import Header from '@/src/components/header';
import GoogleFonts from './google-fonts';
import classes from './layout.module.css';


interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <GoogleFonts>
        <Header />
        <Container fluid className={classes.mainContainer}>
          {children}
        </Container>
        <Footer />
      </GoogleFonts>
    </>
  );
}

export default Layout;