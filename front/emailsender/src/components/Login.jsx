import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';


function Login() {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'http://localhost/dolibarr/api/index.php/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: login,
            password: password,
          }),
        }
      );

      const data = await response.json();
      
      const token = data.success.token;
      if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/email-form';
      }
    } catch (error) {
      console.error('Error authenticating:', error);
      setError('Username or password incorrect !');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
          Login
        </Typography>
        <TextField
          variant="standard"
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          required
          value={login}
          onChange={handleUsernameChange}
        />
        <TextField
          variant="standard"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#0F1B4C',
            '&:hover': { backgroundColor: '#fff', color: '#0F1B4C' },
          }}
        >
          Log In
        </Button>
      </form>
    </Container>
  );
}

export default Login;
