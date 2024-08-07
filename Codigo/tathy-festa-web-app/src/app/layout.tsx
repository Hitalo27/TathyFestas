import React, { ReactNode } from 'react';
import Head from 'next/head';
import TopNav from '../components/navbar/TopNav';
import Footer from '@/components/footer/Footer';
import './globals.css'
import { Inter } from 'next/font/google'

type LayoutProps = {
  children: ReactNode;
  getLayout?: (page: ReactNode) => ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children, getLayout  }: LayoutProps) => {

  const layout = getLayout ? getLayout(children) : children;
  
  return (
    <html lang="en">
  <Head>
            <link rel="icon" href="/tathy.ico" />
            <title>{"Tathy Festa" || 'Default Title'}</title>
          </Head>
      <body className={inter.className}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'stretch' }}>
          <TopNav />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default Layout;
