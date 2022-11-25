import { Button } from '@mui/material'
import React, { useEffect } from 'react';
import CardDialog from './CardDialog'
import * as Realm from "realm-web";
import * as localforage from 'localforage';
import API_KEY_3 from '../../../../../KEY/key3';

export default function DataProcessingCard2() {
    localStorage.clear();
    window.localStorage.clear();
    const [countries, setCountries] = React.useState([]);
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY_3
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const value = await localforage.getItem('user');
                console.log(value)
                const user = await app.logIn(credentials);
                const countries = await user.functions.getHistoricalACountry("Vietnam");
                setCountries(countries);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])

    localforage.setItem("user", countries).then(() => {
        console.log("used localForage");
    });
    

    const exportDataJson = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(countries)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "VietNam-data-covid19.json";
        link.click();
    };

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
