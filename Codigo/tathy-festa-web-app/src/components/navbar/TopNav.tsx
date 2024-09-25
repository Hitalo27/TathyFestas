'use client';

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import UsuarioAPI from '../../API/UsuarioAPI';
import { JWTPayload } from '@/types/JWTPayload';
import SideNav from './SideNav';
import TopNavUsuario from './TopNavUsuario';
import { PageContext } from '@/types/enums/PageContext';
import Image from "next/image";
import logo from '../../assets/images/tathy.png';

export default function TopNav() {
  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);
  const [permissaoUsuario, setPermissaoUsuario] = useState<string | null>(null);
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token && token !== "undefined") {
      setUsuarioLogado(true);
      const decodedToken = jwtDecode<JWTPayload>(token);
      const userId = decodedToken?.sub;
      const fetchUserPermission = async () => {
        const isAdmin = await UsuarioAPI.buscarPermissaoUsuario(userId);
        setPermissaoUsuario(isAdmin);
      };
      fetchUserPermission();
    } else {
      setUsuarioLogado(false);
    }
  }, []);

  const handleLogoClick = () => {
    router.push(PageContext.Home);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#001F3F', color: 'common.white' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSideNavOpen(true)}>
            <MenuIcon />
          </IconButton>
          <div onClick={handleLogoClick} style={{ flexGrow: 1, cursor: 'pointer' }}>
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={60}
              layout="fixed"
            />
          </div>
          <TopNavUsuario usuarioLogado={usuarioLogado} />
        </Toolbar>
      </AppBar>
      <SideNav
        open={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
        permissaoUsuario={permissaoUsuario}
      />
       <div className="scrolling-container">
      <div className="scrolling-text">
      Promoções especiais com a locação de pipoca e algodão doce!
      </div>
    </div>
    </>
  );
}
