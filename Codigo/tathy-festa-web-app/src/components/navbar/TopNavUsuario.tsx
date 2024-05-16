import React, { useState } from 'react';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import { Avatar, Badge, IconButton, Stack, SvgIcon, Tooltip, Menu, MenuItem, Button, Drawer, Snackbar, Typography } from '@mui/material';
import { PageContext } from '@/types/enums/PageContext';
import { useRouter } from 'next/navigation';
interface TopBarAcoesUsuarioProps {
    usuarioLogado: boolean;
    avatarImg?: string;
    notificacoesCounter?: number;
}

const AcoesUsuario: React.FC<TopBarAcoesUsuarioProps> = ({
    usuarioLogado,
    avatarImg = '',
    notificacoesCounter = 4
}) => {
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path: PageContext) => {
        router.push(path as any);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        router.push('/');
    };

    return (
        <Stack alignItems="center" direction="row" spacing={2}>
            {usuarioLogado && (
                <>
                    <Tooltip title="Notificacoes">
                        <IconButton>
                            <Badge badgeContent={notificacoesCounter} color="success" variant="dot">
                                <SvgIcon fontSize="small">
                                    <BellIcon style={{ width: 20, height: 20, fill: 'white' }} />
                                </SvgIcon>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </>
            )}
            {usuarioLogado ? (
                <>
                    <Avatar
                        onClick={onClickMenu}
                        sx={{ cursor: 'pointer', height: 40, width: 40 }}
                        src={avatarImg}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={onCloseMenu}
                    >
                        <MenuItem onClick={onCloseMenu} href="/perfil">Perfil</MenuItem>
                        <MenuItem onClick={onCloseMenu} href="/configuracoes">Configurações</MenuItem>
                        <MenuItem onClick={handleLogout} href="/logout">Logout</MenuItem>
                        
                    </Menu>
                </>
            ) : (
                <Button
                    color="inherit"
                    onClick={() => handleNavigation(PageContext.Login)}
                >Login
                </Button>
            )}
        </Stack>
    );
};

export default AcoesUsuario;
