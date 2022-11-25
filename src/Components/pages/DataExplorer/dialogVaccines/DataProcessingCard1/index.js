import { Button } from '@mui/material'
import React from 'react'
import CardDialog from './CardDialog'

export default function DataProcessingCard1() {
    const exportDataJson = () => {
        fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                    JSON.stringify(json)
                )}`;
                const link = document.createElement("a");
                link.href = jsonString;
                link.download = "vaccinations.json";
                link.click();
            })
    };
    localStorage.clear();
    window.localStorage.clear();
    return (

        <div className='flex justify-between'>
            <CardDialog></CardDialog>
            <Button variant="outlined" sx={{
                width: 130, borderRadius: 2, fontWeight: 'bold', bgcolor: '#058527', color: '#FFFFFF', ':hover': {
                    bgcolor: '#F1F1F2',
                    color: '#058527',
                    borderColor: '#058527'
                },
            }} onClick={exportDataJson}>Download</Button>
        </div>
    )
}
