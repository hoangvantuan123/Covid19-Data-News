import React from 'react'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default function CountrySelect({ countries, handleOnChange, value }) {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>

      <Select
        value={value}
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        onChange={handleOnChange}
        inputProps={{
          country: 'country',
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

CountrySelect.defaultProps = {
  countries: [],
};
