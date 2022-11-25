import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TableCoronaVirus from '../TableCoronaVirus';

function ButtonGroupWorld() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
            >
                <Tab
                    value="one"
                    label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
                    wrapped
                ></Tab>
                <Tab value="two" label="Item Two" >
                    <TableCoronaVirus></TableCoronaVirus>
                </Tab>
            </Tabs>
        </Box>
    )
}

export default ButtonGroupWorld