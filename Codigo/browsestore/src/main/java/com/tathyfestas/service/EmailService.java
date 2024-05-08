package com.tathyfestas.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

//TODO Ajustar config do bean
@Service
public class EmailService {

    // @Autowired
    // private JavaMailSender _mailSender;

    public void enviarRedefinicaoSenha(String destinatario, String resetLink) {
        SimpleMailMessage mensagem = new SimpleMailMessage();

        mensagem.setTo(destinatario);

        mensagem.setSubject("TathyFestas: Redefinição de Senha");

        mensagem.setText("Para redefinir a sua senha, clique o link abaixo:\n" + resetLink);

        // _mailSender.send(mensagem);
    }
}