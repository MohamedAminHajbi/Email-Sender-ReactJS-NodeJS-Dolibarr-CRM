import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Typography,
} from '@mui/material';

const List = () => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
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

  const redirectToEmailForm = () => {
    if (checked.length === 0) {
      console.log('No email selected.');
    } else {
      navigate('/email-form', { state: { emails: checked } });
    }
  };

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const apiKey = 'd41ff35672158204318e18d8637eba48a327090b';
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

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" component="h2" mb={2}>
        Prospects List
      </Typography>

      <FormGroup>
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
                    color: '#0F1B4C',
                  },
                  '& .Mui-checked': {
                    color: '#0F1B4C',
                  },
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </FormGroup>

      <Button variant="contained" onClick={redirectToEmailForm} sx={{ mt: 2, backgroundColor: "#0F1B4C" }}>
        Send
      </Button>

      <Button variant="text" onClick={handleLogout} sx={{ mt: 2, color:"#0F1B4C" }}>
        Logout
      </Button>
    </Box>
  );
};

export default List;
