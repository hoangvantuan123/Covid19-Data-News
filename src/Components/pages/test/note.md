import React, { useEffect } from 'react';
import * as Realm from "realm-web";

export default function TestMongoDB() {
    const [countries, setCountries] = React.useState([]);

    const [selectedCountryId, setSelectedCountryId] = React.useState('');
    const [report, setReport] = React.useState([]);

    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = "data-covid19-ggfjw"
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const countries = await user.functions.locations();
                setCountries(countries);
                setSelectedCountryId("Vietnam");
                console.log('[TestGetAllCountrytest]', countries);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])

    const handleOnChange = React.useCallback((e) => {
        setSelectedCountryId(e.target.value);
    }, []);

    useEffect(() => {
        if (selectedCountryId) {
            const selectedCountry = countries.find(
                (location) => location.location === selectedCountryId.toString()
            );
            console.log('test1', selectedCountry);
            async function loadCountry() {
                const REALM_APP_ID = "data-covid-statistics-beehu"
                const app = new Realm.App({ id: REALM_APP_ID });
                const credentials = Realm.Credentials.anonymous();
                try {
                    const user = await app.logIn(credentials);
                    const countries = await user.functions.getHistoricalACountry(selectedCountry.location);
                    console.log('[TestGetAllCountry12]', countries);
                } catch (err) {
                    console.error("Failed to log in", err);
                }
            };
            loadCountry();
        }
    }, [selectedCountryId, countries]);
    return (
        <div>TestMongoDB</div>
    )
}
