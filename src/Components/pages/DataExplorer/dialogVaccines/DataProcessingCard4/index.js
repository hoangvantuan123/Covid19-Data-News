import { Button } from '@mui/material';
import React, { useEffect , useCallback } from 'react';
import CardDialog from './CardDialog';
import * as Realm from "realm-web";
import API_KEY_5 from '../../../../../KEY/key5';
export default function DataProcessingCard4() {
    const [vaccines, setVaccines] = React.useState([]);
    const exportDataJson = useCallback(() => {
            async function loadCountry() {
                const REALM_APP_ID = API_KEY_5
                const app = new Realm.App({ id: REALM_APP_ID });
                const credentials = Realm.Credentials.anonymous();
                try {
                    const user = await app.logIn(credentials);
                    const vaccines = await user.functions.getVaccinationsByAgeGroup();
                    setVaccines(vaccines);
                    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                        JSON.stringify(vaccines)
                    )}`;
                    const link = document.createElement("a");
                    link.href = jsonString;
                    link.download = "Vaccinations_By_Age_Group.json";
                    link.click();
                    console.log('vaccines ', vaccines)
                } catch (err) {
                    console.error("Failed to log in", err);
                }
            };
            loadCountry();
        },
        [],
    )
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
