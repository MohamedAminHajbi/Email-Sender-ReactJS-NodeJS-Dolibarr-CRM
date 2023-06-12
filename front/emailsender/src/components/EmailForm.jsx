import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const EmailForm = () => {
  const [subject, setSubject] = useState('');
  const [to, setTo] = useState('');
  const [mail, setMail] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('to', to);
    formData.append('mail', mail);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/send-email', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Email sent');
        setSubject('');
        setTo('');
        setMail('');
        setFile(null);
      } else {
        console.log('Failed to send email');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="xs">
        <div>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', paddingBottom: '20px' }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '700px' }}>
            <TextField
              id="subject"
              label="Subject"
              
              fullWidth
              multiline
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ width: '100%', paddingBottom: '15px' }}
            />
            <TextField
              id="to"
              label="To"
              type="email"
              fullWidth
              multiline
              value={to}
              onChange={(e) => setTo(e.target.value)}
              sx={{ width: '100%', paddingBottom: '15px' }}
            />
            <TextField
              id="mail"
              label="Mail"
              type="text"
              fullWidth
              multiline
              rows={12}
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              sx={{ width: '100%', paddingBottom: '15px' }}
            />
            <input type="file" onChange={handleFileChange} />
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#0F1B4C',
                '&:hover': { backgroundColor: '#fff', color: '#0F1B4C' },
              }}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default EmailForm;
