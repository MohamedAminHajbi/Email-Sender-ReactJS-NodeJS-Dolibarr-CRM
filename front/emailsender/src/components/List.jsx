import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [data, setData] = useState([]);
  const [checked,setChecked] = useState([]);
  const navigate = useNavigate();
  const handelChecked = (event) => {
    
    let exist = false;
    if (event.target.checked) {
      for (let i = 0; i < checked.length; i++) {
        if (event.target.value === checked[i]) exist = true;
      }
      if (event.target.checked && exist == false) {
        setChecked((prevChecked) => [...prevChecked, event.target.value]);
      }
    } else {
      setChecked((prevChecked) =>
        prevChecked.filter((value) => value !== event.target.value)
      );
    }
  };

  const redirectToEmailForm = () => {
    navigate('/email-form', { state: { emails: checked } });
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
    <div>
      <FormGroup>
        {data.map((item) => {
            if (item.client == 3 || item.client == 2) {
            return (
              <FormControlLabel
              key={item.id}
              control={<Checkbox />}
              label={item.name}
              value={item.email}
              onChange={handelChecked} // Add onChange prop
            />
            );
            } else {
            return null;
            }
        })}
        
        </FormGroup>
        <Button variant="text" onClick={redirectToEmailForm}>Send</Button>
    </div>
  );
};

export default List;
