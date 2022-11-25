
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CountryDialog({ vaccines, handleOnChangeCountry, value }) {
  return (
    <FormControl sx={{ m: 1, width: '100%' }} >
      <Select
        value={value}
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        onChange={handleOnChangeCountry}
        inputProps={{
          name: 'country',
          id: 'country-selector',
        }}
      >
         {vaccines.map(({ country }) => (
          <MenuItem variant="outlined" key={country} value={country} label={country} >{country}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CountryDialog.defaultProps = {
  countries: [],
};