import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, DialogActions, Button } from '@mui/material';
import { Usuario } from '../../types/Usuario';
import { Permissao } from '@/types/enums/Permissao';

interface EdicaoUsuarioDialogProps {
    dialogOpen: boolean;
    usuarioEdicao: Usuario | null;
    handleDialogClose: () => void;
    handleUpdateUsuario: () => void;
    setUsuarioEdicao: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

const EdicaoUsuarioDialog: React.FC<EdicaoUsuarioDialogProps> = ({
    dialogOpen,
    usuarioEdicao,
    handleDialogClose,
    handleUpdateUsuario,
    setUsuarioEdicao
}) => {
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;

        setUsuarioEdicao(prev => ({ ...prev!, email }));
        
        if (!validarEmail(email)) {
            setEmailError('E-mail inválido.');
        } else {
            setEmailError('');
        }
    };

    const validarEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    return (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Edição Usuário</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    fullWidth
                    value={usuarioEdicao?.email || ''}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                />
                <Select
                    fullWidth
                    value={usuarioEdicao?.permissao || ''}
                    onChange={(e) => setUsuarioEdicao({ ...usuarioEdicao!, permissao: e.target.value as Permissao })}
                    label="Permissao"
                >
                    {Object.values(Permissao).filter(value => isNaN(Number(value))).map((value) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleUpdateUsuario} color="primary" disabled={!!emailError}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EdicaoUsuarioDialog;
