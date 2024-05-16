import { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar, Box, Link, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import ClienteAPI from '@/API/ClienteAPI';
import ClienteClass from '@/models/ClienteClass';
import { Cliente } from '../../types/Cliente';

export default function CadastroCliente() {
    const [clientes, setClientesCadastrados] = useState<Cliente[]>([]);
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCPF] = useState('');
    const [identidade, setIdentidade] = useState('');
    const [nomeAniversariante, setNomeAniversariante] = useState('');
    const [idadeAniversariante, setIdadeAniversariante] = useState('');
    const [enderecoResidencial, setEnderecoResidencial] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [enderecoEvento, setEnderecoEvento] = useState('');
    const [dataEvento, setDataEvento] = useState(new Date());
    const [horaEvento, setHoraEvento] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [comoConheceu, setComoConheceu] = useState('');

     const [errors, setErrors] = useState({cpf: '', telefone: '', email: ''});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const router = useRouter();

    const handleCadastrarCliente = async () => {
        if (validarFormulario()) {
            const clienteDTO = new ClienteClass(nomeCompleto, cpf, identidade, nomeAniversariante, idadeAniversariante, enderecoResidencial, telefone, email, instagram, enderecoEvento, dataEvento, horaEvento, formaPagamento, comoConheceu);
            try {
                await ClienteAPI.criarCliente(clienteDTO);
                limparCampos();
                setSnackbarMessage('Cliente cadastrado com sucesso.');
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarMessage('Erro ao cadastrar cliente: ' + error);
                setSnackbarOpen(true);
            }
        }
    };

    const limparCampos = () => {
        setNomeCompleto('');
        setCPF('');
        setIdentidade('');
        setNomeAniversariante('');
        setEnderecoResidencial('');
        setTelefone('');
        setEmail('');
        setInstagram('');
        setEnderecoEvento('');
        setDataEvento(new Date());
        setFormaPagamento('');
        setComoConheceu('');
        setErrors({cpf, telefone, email});
    };

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                setClientesCadastrados(await ClienteAPI.buscarTodosClientes());
            } catch (error) {
                console.error("Erro ao carregar usuários: ", error);
            }
        };
        carregarUsuarios();
    }, []);

    const validarFormulario = () => {
        const newErrors = {cpf, telefone, email};

        if (!validarCPF(cpf)) {
            newErrors.cpf = 'CPF inválido.';
        }
        if (!validarTelefone(telefone)) {
            newErrors.telefone = 'Telefone inválido.';
        }
        if (!validarEmail(email)) {
            newErrors.email = 'Email inválido.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validarCPF = (cpf: string) => {
        const cpfSemFormatacao = cpf.replace(/[^\d]+/g, '');
        if (cpfSemFormatacao.length !== 11) {
            return false;
        }
        const cpfArray = cpfSemFormatacao.split('').map((d) => parseInt(d));
        let sum = 0;
        let factor = 10;
        for (let i = 0; i < 9; i++) {
            sum += cpfArray[i] * factor;
            factor--;
        }
        let remainder = sum % 11;
        if (remainder < 2) {
            if (cpfArray[9] !== 0) {
                return false;
            }
        } else {
            if (cpfArray[9] !== 11 - remainder) {
                return false;
            }
        }
        sum = 0;
        factor = 11;
        for (let i = 0; i < 10; i++) {
            sum += cpfArray[i] * factor;
            factor--;
        }
        remainder = sum % 11;
        if (remainder < 2) {
            if (cpfArray[10] !== 0) {
                return false;
            }
        } else {
            if (cpfArray[10] !== 11 - remainder) {
                return false;
            }
        }
        return true;
    };

    const validarTelefone = (telefone: string) => {
        return telefone.replace(/[^\d]+/g, '').length === 11;
    };

    const validarEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    return (
            <Grid container justifyContent="center" spacing={3} marginTop={1}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 4 }}>
                        <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '20px' }} textAlign="center">
                            Cadastro de Cliente
                        </Typography>

                        <Box mb={3}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nome Completo"
                                value={nomeCompleto}
                                onChange={(e) => setNomeCompleto(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="CPF"
                                value={cpf}
                                onChange={(e) => setCPF(e.target.value)}
                                error={Boolean(errors.cpf)}
                                helperText={errors.cpf}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Identidade"
                                value={identidade}
                                onChange={(e) => setIdentidade(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nome do(a) aniversariante"
                                value={nomeAniversariante}
                                onChange={(e) => setNomeAniversariante(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Idade do(a) aniversariante"
                                value={idadeAniversariante}
                                onChange={(e) => setIdadeAniversariante(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Endereço Residencial"
                                value={enderecoResidencial}
                                onChange={(e) => setEnderecoResidencial(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                error={Boolean(errors.telefone)}
                                helperText={errors.telefone}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Endereço do Evento"
                                value={enderecoEvento}
                                onChange={(e) => setEnderecoEvento(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Data do Evento"
                                type="date"
                                value={format(dataEvento, 'yyyy-MM-dd')}
                                onChange={(e) => setDataEvento(new Date(e.target.value))}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Hora do Evento"
                                type="time"
                                value={horaEvento}
                                onChange={(e) => setHoraEvento(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Forma de Pagamento"
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

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleCadastrarCliente}
                            >
                                Cadastrar Cliente
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />
            </Grid>
    );
}
