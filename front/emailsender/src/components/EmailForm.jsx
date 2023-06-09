import { Button, Container, TextField, Typography, Box, FormControlLabel, Checkbox, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';

const EmailForm = () => {
  const [subject, setSubject] = useState('');
  const [mail, setMail] = useState('');
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Track sidebar state

  console.log(checked);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handelChecked = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked && !checked.includes(value)) {
      setChecked((prevChecked) => [...prevChecked, value]);
    } else if (!isChecked && checked.includes(value)) {
      setChecked((prevChecked) => prevChecked.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const apiKey = window.localStorage.getItem('token');
        const url = `http://localhost/dolibarr/api/index.php/thirdparties?DOLAPIKEY=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProspects();
  }, []);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('to', checked);
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
        setChecked([]);
        setMail('');
        setFiles([]);
      } else {
        console.log('Failed to send email');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#2B3A3E' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexGrow={1}>
        <Box
          bgcolor="#ECECEE"
          width={sidebarOpen ? '240px' : '0px'}
          p={2}
          display={sidebarOpen ? 'flex' : 'none'}
          transition="width 0.2s ease-in-out"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6" component="h2" mb={2}>
            Prospects list
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {data.map((item) => {
              if (item.client === '3' || item.client === '2') {
                return (
                  <FormControlLabel
                    key={item.id}
                    control={<Checkbox />}
                    label={item.name}
                    value={item.email}
                    onChange={handelChecked}
                    
                    sx={{
                      '& .MuiCheckbox-root': {
                        color: '#2B3A3E',
                      },
                      '& .Mui-checked': {
                        color: '#2B3A3E',
                      },
                      
                    }}
                  />
                );
              } else {
                return null;
              }
            })}
          </Box>
        </Box>
        <Container
          sx={{
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 1,
            backgroundColor:"#fff"
          }}
        >
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', paddingBottom: '20px' }}>
              Send mail
            </Typography>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="subject"
                  label="Subject"
                  required
                  fullWidth
                  multiline
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  sx={{ width: '100%', paddingBottom: '15px' }}
                />
                <TextField
                  id="mail"
                  label="Mail"
                  type="text"
                  fullWidth
                  multiline
                  required
                  rows={12}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  sx={{ width: '100%', paddingBottom: '15px' }}
                />
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" width="100%">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '17px' }}>
                    {files.length > 0 &&
                      files.map((file, index) => (
                        <Typography key={index} variant="subtitle1" sx={{ paddingBottom: '10px' }}>
                          Selected file {index + 1}: {file.name}
                        </Typography>
                      ))}
                    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" multiple />
                    <label htmlFor="file-upload">
                      <Button
                        component="span"
                        fullWidth
                        variant="outlined"
                        sx={{
                          fontWeight: 'bold',
                          borderColor: '#2B3A3E',
                          color: '#2B3A3E',
                          borderRadius: '0px',
                          '&:hover': { backgroundColor: '#2B3A3E', color: '#fff' },
                          marginBottom: '17px',
                        }}
                      >
                        Upload File
                      </Button>
                    </label>
                  </div>
                  <Box marginTop="20px">
                    <CustomButton onClick={handleSubmit} />
                  </Box>
                </Box>
              </div>
            </form>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default EmailForm;
