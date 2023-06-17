import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react'

const List = () => {
    const fetchProspects = async () =>{
        try{
            const response = await fetch('http://localhost/dolibarr/api/index.php/thirdparties');
            const data = await response.json();
            console.log(data);
        }catch (error){
            console.log("error");
        }
    }
    fetchProspects();
  return (
    <div>
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
            <FormControlLabel required control={<Checkbox />} label="Required" />
            <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
    </div>
  )
}

export default List