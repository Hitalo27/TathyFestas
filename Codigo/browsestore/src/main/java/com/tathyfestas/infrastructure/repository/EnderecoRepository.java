package com.tathyfestas.infrastructure.repository;

import java.net.HttpURLConnection;
import java.net.URL;

import com.tathyfestas.model.Endereco;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.io.IOException;

public class EnderecoRepository {
	@SuppressWarnings("deprecation")
	public Endereco buscarEnderecoPorCEP(String cep) throws IOException {
		try {
			String url = "https://viacep.com.br/ws/" + cep + "/json/";
			URL obj = new URL(url);

			HttpURLConnection connection = (HttpURLConnection) obj.openConnection();

			connection.setRequestMethod("GET");
			int responseCode = connection.getResponseCode();

			if (responseCode == 200) {
				ObjectMapper objectMapper = new ObjectMapper();
				Endereco endereco = objectMapper.readValue(connection.getInputStream(), Endereco.class);
				return endereco;
			} else {
				throw new IOException("Falha na requisição. Código de resposta: " + responseCode);
			}
		} catch (Exception e) {
			throw new IOException("URL mal formada: " + e.getMessage(), e);
		}
	}
}
