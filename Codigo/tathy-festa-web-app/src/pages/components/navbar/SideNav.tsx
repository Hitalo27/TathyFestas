import React, { FC } from 'react';
import { Drawer, Box, Typography, Button, Divider, SvgIcon, Stack } from '@mui/material';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import SquaresPlusIcon from '@heroicons/react/24/solid/SquaresPlusIcon';

import { SideNavItem } from './SideNavItem';
import { PageContext } from '@/types/enums/PageContext';

import { useRouter } from 'next/navigation';

interface SideNavProps {
    open?: boolean;
    onClose?: () => void;
    permissaoUsuario?: string | null;
}

const SideNav: FC<SideNavProps> = ({ open, onClose, permissaoUsuario }) => {
    const router = useRouter();

    const handleNavigation = (path: PageContext) => {
        router.push(path as any);
        if (onClose) onClose();
    };

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: '#001F3F',
                    color: 'common.white',
                    width: 280,
                    zIndex: (theme) => theme.zIndex.appBar + 100,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }
            }}
            variant="temporary"
        >
            {permissaoUsuario === "ADMIN" && (
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: 1,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                            p: '12px'
                        }}
                        onClick={() => handleNavigation(PageContext.PainelAdmin)}
                    >
                        <div>
                            <Typography color="inherit" variant="subtitle1"> Tathy Festas </Typography>
                            <Typography color="neutral.400" variant="body2"> Admin </Typography>
                        </div>
                        <SvgIcon fontSize="small" sx={{ color: 'neutral.500' }}>
                            <ChevronUpDownIcon />
                        </SvgIcon>
                    </Box>
                </Box>
            )}

            <Divider sx={{ borderColor: 'neutral.700' }} />

            <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3 }}>
                <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    <SideNavItem
                        title="Decorações"
                        onClick={() => handleNavigation(PageContext.ListagemProdutos)}
                        icon={<ShoppingBagIcon style={{ width: 20, height: 20, fill: 'white' }} />}
                    />
                    {permissaoUsuario === "ADMIN" && (
                        <SideNavItem
                            title="Cadastrar Decorações"
                            onClick={() => handleNavigation(PageContext.CadastroProduto)}
                            icon={<SquaresPlusIcon style={{ width: 20, height: 20, fill: 'white' }} />}
                        />
                    )}
                    {permissaoUsuario === "ADMIN" && (
                        <SideNavItem
                            title="Cadastrar Usuarios"
                            onClick={() => handleNavigation(PageContext.CadastroUsuario)}
                            icon={<UserPlusIcon style={{ width: 20, height: 20, fill: 'white' }} />}
                        />
                    )}
                </Stack>
            </Box>

            <Divider sx={{ borderColor: 'neutral.700' }} />
        </Drawer>
    );
};

export default SideNav;
