import React, { ReactNode } from 'react';
import TopNav from '../pages/components/navbar/TopNav';
import Footer from '@/pages/components/footer/Footer';
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
