import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Cliente } from '../../types/Cliente';

interface EdicaoClienteDialogProps {
    dialogOpen: boolean;
    clienteEdicao: Cliente | null;
    handleDialogClose: () => void;
    handleUpdateCliente: () => void;
    setClienteEdicao: React.Dispatch<React.SetStateAction<Cliente | null>>;
}

const EdicaoClienteDialog: React.FC<EdicaoClienteDialogProps> = ({
    dialogOpen,
    clienteEdicao,
    handleDialogClose,
    handleUpdateCliente,
    setClienteEdicao
}) => {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCPF] = useState('');
    const [identidade, setIdentidade] = useState('');
    const [nomeAniversariante, setNomeAniversariante] = useState('');
    const [idadeAniversariante, setIdadeAniversariante] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [enderecoEvento, setEnderecoEvento] = useState('');
    const [dataEvento, setDataEvento] = useState(new Date());
    const [horaEvento, setHoraEvento] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [comoConheceu, setComoConheceu] = useState('');

    useEffect(() => {
        if (clienteEdicao) {
            setNomeCompleto(clienteEdicao.nomeCompleto || '');
            setCPF(clienteEdicao.cpf || '');
            setIdentidade(clienteEdicao.identidade || '');
            setNomeAniversariante(clienteEdicao.nomeAniversariante || '');
            setIdadeAniversariante(clienteEdicao.idadeAniversariante || '');
            setEndereco(clienteEdicao.endereco || '');
            setTelefone(clienteEdicao.telefone || '');
            setEmail(clienteEdicao.email || '');
            setInstagram(clienteEdicao.instagram || '');
            setEnderecoEvento(clienteEdicao.enderecoEvento || '');
            setDataEvento(clienteEdicao.dataEvento ? new Date(clienteEdicao.dataEvento) : new Date());
            setHoraEvento(clienteEdicao.horaEvento || '');
            setFormaPagamento(clienteEdicao.formaPagamento || '');
            setComoConheceu(clienteEdicao.comoConheceu || '');
        }
    }, [clienteEdicao]);

    const handleUpdateClienteFields = () => {
        if (clienteEdicao) {
            const updatedCliente: Cliente = {
                ...clienteEdicao,
                nomeCompleto,
                cpf,
                identidade,
                nomeAniversariante,
                idadeAniversariante,
                endereco,
                telefone,
                email,
                instagram,
                enderecoEvento,
                dataEvento,
                horaEvento,
                formaPagamento,
                comoConheceu
            };
            setClienteEdicao(updatedCliente);
        }
    };

    return (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Edição Cliente</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome Completo"
                    fullWidth
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="CPF"
                    fullWidth
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Identidade"
                    fullWidth
                    value={identidade}
                    onChange={(e) => setIdentidade(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Nome do(a) Aniversariante"
                    fullWidth
                    value={nomeAniversariante}
                    onChange={(e) => setNomeAniversariante(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Idade do(a) Aniversariante"
                    fullWidth
                    value={idadeAniversariante}
                    onChange={(e) => setIdadeAniversariante(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Endereço"
                    fullWidth
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Telefone"
                    fullWidth
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Instagram"
                    fullWidth
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Endereço do Evento"
                    fullWidth
                    value={enderecoEvento}
                    onChange={(e) => setEnderecoEvento(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Data do Evento"
                    type="date"
                    fullWidth
                    value={dataEvento.toISOString().split('T')[0]}
                    onChange={(e) => setDataEvento(new Date(e.target.value))}
                />
                <TextField
                    margin="dense"
                    label="Hora do Evento"
                    type="time"
                    fullWidth
                    value={horaEvento}
                    onChange={(e) => setHoraEvento(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Forma de Pagamento"
                    fullWidth
                    value={formaPagamento}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="comoConheceu-label">Como você conheceu a nossa empresa?</InputLabel>
                    <Select
                        labelId="comoConheceu-label"
                        id="comoConheceu"
                        value={comoConheceu}
                        onChange={(e) => setComoConheceu(e.target.value)}
                    >
                        <MenuItem value={"GOOGLE"}>Google</MenuItem>
                        <MenuItem value={"INSTAGRAM"}>Instagram</MenuItem>
                        <MenuItem value={"INDICACAO"}>Indicação</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => {
                    handleUpdateClienteFields();
                    handleUpdateCliente();
                }} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EdicaoClienteDialog;
