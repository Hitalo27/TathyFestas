import React from 'react';
import { Container, Grid, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <div style={{ backgroundColor: '#001F3F', color: '#fff', padding: '16px', marginTop: '100px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={{ color: '#ffbb33', marginBottom: '8px' }}>Conheça-nos</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Sobre a Tathy Festa" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Informações corporativas" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={{ color: '#ffbb33', marginBottom: '8px' }}>Atendimento</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Horario de atendimento 08:00 às 20:00 Segunda a Domingo, horario de Brasilia" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={{ color: '#ffbb33', marginBottom: '8px' }}>Email</Typography>
            <Typography>tathyfestas@gmail.com</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <IconButton style={{ margin: '8px', color: '#fff' }}>
            <FaFacebook />
          </IconButton>
          <IconButton style={{ margin: '8px', color: '#fff' }}>
            <FaInstagram />
          </IconButton>
          <IconButton style={{ margin: '8px', color: '#fff' }}>
            <FaWhatsapp />
          </IconButton>
        </Grid>
        <Typography align="center" style={{ marginTop: '16px', fontWeight: 'bold' }}>
          <span style={{ color: '#ffbb33' }}>Tathy Festa</span> &copy; 2024
        </Typography>
      </Container>
    </div>
  );
}
