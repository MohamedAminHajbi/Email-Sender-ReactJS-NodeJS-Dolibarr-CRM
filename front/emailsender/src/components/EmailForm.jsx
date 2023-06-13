import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomButton from './CustomButton';

const EmailForm = () => {
  const [subject, setSubject] = useState('');
  const [to, setTo] = useState('');
  const [mail, setMail] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('to', to);
    formData.append('mail', mail);
    files.forEach((file) => {
      formData.append('files', file);
    });


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
        setFiles([]);
      } else {
        console.log('Failed to send email');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
      <Container maxWidth="xs">
        <div>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', paddingBottom: '20px' }}>
            Send mail
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '700px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField id="subject" label="Subject" required fullWidth multiline value={subject} onChange={(e) => setSubject(e.target.value)} sx={{ width: '100%', paddingBottom: '15px' }}
              />
              <TextField id="mail" label="Mail" type="text" fullWidth multiline required rows={12} value={mail} onChange={(e) => setMail(e.target.value)} sx={{ width: '100%', paddingBottom: '15px' }}/>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  To
                </InputLabel>
                <Select id="to" label="To" value={to} required onChange={(e) => setTo(e.target.value)}
                >
                  <MenuItem value={1}>Prospect</MenuItem>
                  <MenuItem value={2}>Client</MenuItem>
                  <MenuItem value={3}>Fournisseur</MenuItem>
                </Select>
              </FormControl>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '17px' }}>
                {files.length > 0 &&
                    files.map((file, index) => (
                      <Typography key={index} variant="subtitle1" sx={{ paddingBottom: '10px' }}>
                        Selected file {index + 1}: {file.name}
                      </Typography>
                    ))
                }
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" multiple />
                <label htmlFor="file-upload">
                  <Button component="span" fullWidth variant="outlined" sx={{ fontWeight: 'bold', borderColor: '#0F1B4C', color: '#0F1B4C', borderRadius:"0px", '&:hover': { backgroundColor: '#0F1B4C', color: '#fff' }, marginBottom: '17px',}}>
                    Upload File
                  </Button>
                </label>
              </div>
              <CustomButton onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default EmailForm;
