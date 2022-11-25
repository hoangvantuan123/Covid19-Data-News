
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function CountrieSelector({ countries, handleOnChange, value }) {


    return (
        <FormControl sx={{ m: 1, width:300}} >
            <Select 
                value={value}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector',
                }}
            >
                {countries.map(({ name }) => (
                    <MenuItem variant="outlined" key={name} value={name} label={name} >{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

CountrieSelector.defaultProps = {
    countries: [],
};