import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import CardDialog from './CardDialog';
import * as Realm from "realm-web";
import API_KEY from '../../../../../KEY';
export default function DataProcessingCard3() {
    const [countries, setCountries] = React.useState([]);

    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const countries = await user.functions.getLocationTableVaccines();
                setCountries(countries);
                //console.log('vaccinesMongoDb', countries);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])
    const exportDataJson = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(countries)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "Vaccines_Location.json";
        link.click();
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
