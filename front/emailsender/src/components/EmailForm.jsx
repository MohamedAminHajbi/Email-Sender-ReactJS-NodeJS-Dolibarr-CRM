import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const EmailForm = () => {
  const [subject, setSubject] = useState();
  const [to, setTo] = useState();
  const [mail, setMail] = useState();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubject("");
      setTo("");
      
      setMail("");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="xs">
        <div>
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold" , paddingBottom:"20px"}}>
            Register
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '700px' }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Subject"
              type="text"
              fullWidth
              multiline
              sx={{ width: '100%', paddingBottom: "15px" }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="To"
              type="email"
              fullWidth
              multiline
              sx={{ width: '100%', paddingBottom: "15px" }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Mail"
              type="text"
              fullWidth
              multiline
              rows={12}
              sx={{ width: '100%', paddingBottom: "15px" }}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#0F1B4C",
                "&:hover": { backgroundColor: "#fff", color: "#0F1B4C" },
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
