package com.tathyfestas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //XXX Autorização de requisições deprecada
        // http.csrf().disable()
        //        .authorizeRequests().anyRequest().permitAll();

        http.csrf(csrf -> csrf
                    .disable())
            .cors(cors -> cors
                    .disable());

        return http.build();
    }
}
