import { Button, Container, TextField, Typography, Box, FormControlLabel, Checkbox} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomButton from './CustomButton';
import LogoutButton from './LogoutButton/LogoutButton'
import JoditEditor from 'jodit-react';

const EmailForm = () => {
  const [subject, setSubject] = useState('');
  const [mail, setMail] = useState('');
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reps, setReps] = useState({});
  const editor = useRef(null);
  
  console.log(checked);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  const removeArray = (mainArray, arrayToRemove) => {
    const counts = {};

    for (const item of mainArray) {
      counts[item] = (counts[item] || 0) + 1;
    }
    for (const item of arrayToRemove) {
      counts[item] = (counts[item] || 0) - 1;
    }
    const result = [];
    for (const item of mainArray) {
      if (counts[item] > 0) {
        result.push(item);
        counts[item]--;
      }
    }
    
    return result;
  };
  
  const handelChecked = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (Array.isArray(reps[value])) {
        setChecked((prevChecked) => [...prevChecked, ...reps[value]]);
      } else if (reps[value] !== undefined) {
        setChecked((prevChecked) => [...prevChecked, reps[value]]);
      }
    } else {
      if (Array.isArray(reps[value])) {
        setChecked((prevChecked) => removeArray(prevChecked, reps[value]));
      } else if (reps[value] !== undefined) {
        setChecked((prevChecked) => prevChecked.filter(item => item !== reps[value]));
      }
    }
  };
  

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const apiKey = window.localStorage.getItem('token');
        const url = `http://localhost/dolibarr/api/index.php/thirdparties?DOLAPIKEY=${apiKey}`;
        const response = await fetch(url);
        const allData = await response.json();
        const data = allData.filter((item)=>item.client === '3' || item.client === '2');
        const emails = data.map((item) => item.email);
        const ids = data.map((item) => item.id);
        console.log(ids);
        console.log(emails);
        
        const reps = {};

        for (let i = 0; i < ids.length; i++) {
          const urlComm = `http://localhost/dolibarr/api/index.php/thirdparties/${ids[i]}/representatives?DOLAPIKEY=${apiKey}`;
          const res = await fetch(urlComm);
          const repData = await res.json();
          
          repData.forEach((item) => {
            const login = item.login;
            if (reps[login]) {
              reps[login].push(emails[i]);
            } else {
              reps[login] = [emails[i]];
            }
          });
        }
        setReps(reps);
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
    const newChecked = checked.filter((item, index) => checked.indexOf(item) === index);
    setChecked(newChecked);
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
    <Box height="100vh">
      <Box display="flex" flexGrow={1} sx={{height:"100%",backgroundColor:"#EDEDED"}}>
      <Box
          onClick={handleSidebarToggle}
          width={sidebarOpen ? '240px' : '20px'}
          p={2}
          display='flex'
          flexDirection="column"
          alignItems="center"
          sx={{
            
            transition: 'width 0.3s',
            overflow: 'hidden',
            cursor:"pointer",
            borderRadius:"25px",
            backgroundColor:"#D3D4D4",
            margin:"10px",
          }}
        >
          <Box display={sidebarOpen ? 'flex' : 'none'} sx={{flexDirection:"column", alignitems: "center", justifycontent:"center"}}>
            <Typography variant="h6" component="h2" mb={2}>
              Liste des représentants
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {Object.keys(reps).map((login) => (
                <FormControlLabel
                  key={login}
                  control={<Checkbox />}
                  label={login}
                  value={login}
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
              ))}
            </Box>
            <Typography variant="h6" component="h2" mb={2}>
              Liste des prospects
            </Typography>
            <Box sx={{display:"flex", flexDirection:"column"}}>
            {data.map((item) => {
              return (
                <FormControlLabel
                  key={item.id}
                  control={<Checkbox />}
                  label={item.name}
                  value={item.email}
                  onChange={handelChecked}
                  sx={{
                    '& .MuiCheckbox-root': {
                      color: '#0F1B4C',
                    },
                    '& .Mui-checked': {
                      color: '#0F1B4C',
                    },
                  }}
                />
              );
          })}
          </Box>
          </Box>

        </Box>
        
        <Container sx={{width:"100%"}}>
        <div style={{width:"100%", paddingTop: "20px", display:"flex", justifyContent:"end"}}>
            <LogoutButton logout={handleLogout}/>
        </div>
        <Container
          sx={{
            display:"flex",
            height:"100%",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 1,
            width:"100%"
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
                <div>
                  <JoditEditor
                ref={editor}
                value={mail}
                tabIndex={1}
                onChange={(e) => setMail(e)}
                />
                </div>
                
                
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
          
        </Container>
      </Box>
    </Box>
      
    
  );
};

export default EmailForm;
