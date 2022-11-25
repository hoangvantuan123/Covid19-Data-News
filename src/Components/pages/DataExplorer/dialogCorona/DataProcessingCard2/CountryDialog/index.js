
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CountryDialog({ countries, handleOnChange, value }) {
  return (
    <FormControl sx={{ m: 1, width: '100%' }} >
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
        {countries.map(({ location }) => (
          <MenuItem variant="outlined" key={location} value={location} label={location} >{location}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CountryDialog.defaultProps = {
  countries: [],
};