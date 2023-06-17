import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';

const List = () => {
  const [data, setData] = useState([]);

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
                control={<Checkbox/>}
                label={item.name}
                />
            );
            } else {
            return null; // If the condition is not met, return null or you can skip this else block if you don't want to render anything in that case.
            }
        })}
        </FormGroup>
    </div>
  );
};

export default List;
