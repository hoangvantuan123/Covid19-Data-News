import { Button } from '@mui/material'
import React, { useEffect } from 'react';
import CardDialog from './CardDialog'
import * as Realm from "realm-web";
import API_KEY_5 from '../../../../../KEY/key5';


export default function DataProcessingCard4() {
    localStorage.clear();
    window.localStorage.clear();
    const [download, setDownload] = React.useState([]);
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY_5
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const download = await user.functions.getTotalCases();
                setDownload(download);
                // console.log('[setDownload]', download);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])

    const exportDataJson = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(download)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "Total-Cases.json";
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
