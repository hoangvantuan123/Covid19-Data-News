import React, { useEffect } from 'react';
import { sortBy } from 'lodash';
import { getReportByCountry2, getCountries2 } from '../../API/history';
import CountrieSelector from './CountrieSelector';
import PageChartConaVirus from '../Charts/ChartsConaVirus';
import * as Realm from "realm-web";
import BoxCountry from '../pages/CoronaVirus/box';
import API_KEY from '../../KEY';
export default function CountriesUI() {
    const [countries, setCountries] = React.useState([]);
    const [selectedCountryId, setSelectedCountryId] = React.useState('');
    const [report, setReport] = React.useState([]);
    
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY;
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();

            try {
                const user = await app.logIn(credentials);
                const countries = await user.functions.getAllCountrys();
                setCountries(countries);
                setSelectedCountryId('VietNam');
                console.log('[TestGetAllCountry]', countries);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])

    const handleOnChange = React.useCallback((e) => {
        setSelectedCountryId(e.target.value);
    }, []);


    /*  console.log('tiel',selectedCountryId);  */

    useEffect(() => {
        if (selectedCountryId) {
            const selectedCountry = countries.find(
                (name) => name.name === selectedCountryId.toString()
            );
            console.log('test1', selectedCountry);
            getReportByCountry2(selectedCountry.name).then((res) => {
                console.log('t', res)
                // remove last item = current date
                // Sắp xếp thời gian 
                res.data.response.sort(function (a, b) {
                    var c = new Date(a.day);
                    var d = new Date(b.day);
                    return c - d;
                });
                setReport(res.data.response);
            })


        }
    }, [selectedCountryId, countries]);

    localStorage.clear();
    window.localStorage.clear();
    return (
        <div className=''>
            <CountrieSelector
                handleOnChange={handleOnChange}
                countries={countries}
                value={selectedCountryId}

            />
            <BoxCountry report={report} />
            <PageChartConaVirus report={report} />
        </div>
    )
}
