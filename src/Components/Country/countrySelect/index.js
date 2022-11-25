import React from 'react'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default function CountrySelect({ countries, handleOnChange, value }) {
    return (
        <FormControl sx={{ width: '100%' }} className="phone:w-full">
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

            {/*  <select
            value={value}
            onChange={handleOnChange}
        >
            {countries.map(({ Country, ISO2 }) => (
                <option key={ISO2} value={ISO2.toLowerCase()} >
                    {Country}
                </option>
            ))}
        </select> */}

        </FormControl>
    )
}
