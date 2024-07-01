import axios from '../lib/apiConfig';

class AuthenticationAPI {
  static async loginUsuario(usuario: string, senha: string) {
    return await axios.post('/auth/login', { usuario, senha });
  }

  static async esqueciSenha(email: string) {
    return await axios.post('/auth/esqueci-senha', { email });
  }

  static async redefinirSenha(token: string, senha: string) {
    return await axios.post('/auth/redefinicao-senha', { token, senha });
  }
}

export default AuthenticationAPI;
