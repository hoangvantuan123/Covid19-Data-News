import React, { useEffect } from 'react'
import { getVaccineData } from '../../../API'
import { sortBy } from 'lodash';
import HeaderVaccine from './header';
import DataVaccinesWorld from './dataVaccinesWorld';
import DataVaccinesCoutry from './country/DataVaccinesCoutry'
import CoutryVaccines from './country';
import CountrySelect from './country/CountrySelect';
import FooterPages from '../../footer'
import TableVaccinesCountry from '../../table/TableVaccinesCountry';
import * as localforage from 'localforage';
import * as Realm from "realm-web";
import { Box } from '@mui/material'
import CompareVaccines from '../../compareVaccines';
import API_KEY from '../../../KEY';
import API_KEY_7 from '../../../KEY/key7';
function Vaccines() {
    const [countries, setCountries] = React.useState([]);
    const [vaccine, setVaccine] = React.useState([]);
    const [selectedCountryId, setSelectedCountryId] = React.useState('');
    const [report, setReport] = React.useState([]);
    const [world, setWorld] = React.useState([]);

    //Gọi dữ liệu World
    useEffect(() => {
        getVaccineData().then((res) => {
            //console.log('VaccineData', res);
            const { data } = res;
            const world = sortBy(data, 'country');
            setWorld(world);

        })
    }, []);
    //CSDL mã của từng quốc gia 
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const countries = await user.functions.locations();
                setCountries(countries);
                setSelectedCountryId("Vietnam");
                //console.log('[TestGetAllCountrytestđ]', countries);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])

    const handleOnChange = React.useCallback((e) => {
        setSelectedCountryId(e.target.value);
    }, []);
    // Gọi nên một đất nước mặc định là việt nam
    useEffect(() => {
        if (selectedCountryId) {
            const selectedCountry = countries.find(
                (location) => location.location === selectedCountryId.toString()
            );
            //console.log('test1', selectedCountry);
            /*  setReport(selectedCountry.data) */
            async function loadCountry() {
                const REALM_APP_ID = API_KEY_7
                const app = new Realm.App({ id: REALM_APP_ID });
                const credentials = Realm.Credentials.anonymous();
                try {
                    const user = await app.logIn(credentials);
                    const vaccine = await user.functions.getVaccinesDataCountry(selectedCountry.location);
                    //console.log('[TestGetAllCountry12]', vaccine);
                    setReport(vaccine);
                } catch (err) {
                    console.error("Failed to log in", err);
                }
            };
            loadCountry();
        }
    }, [selectedCountryId, vaccine]);
    // console.log('report ', report)
    localStorage.clear();
    window.localStorage.clear();
    return (
        <div className=' phone:p-2 ipad:p-2 lg:p-0'>

            <div className='max-w-[1250px]  m-auto justify-center items-center mb-9'>
                <img src='https://images.unsplash.com/photo-1618961734760-466979ce35b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80' alt=""
                    className='phone:w-[100%] phone:min-h-[650px] ipad:w-[100%] ipad:h-[100%] lg:w-[1250px] lg:h-[646px] phone:rounded-xl ipad:rounded-xl  rounded-3xl object-cover ' />
            </div>
            <div className='max-w-[1250px]  m-auto justify-center items-center'>
                <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[646px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl    ipad:mt-0 mt-5 md:p-2 p-10 gap-[24px]' >
                    <HeaderVaccine />
                    <DataVaccinesWorld world={world} />
                </Box>
                <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[646px] bg-[#FFFF]  rounded-3xl phone:rounded-xl  ipad:rounded-xl   ipad:mt-2 mt-5 md:p-2 p-10 gap-[24px]' >
                    <CoutryVaccines />
                    <CountrySelect
                        handleOnChange={handleOnChange}
                        countries={countries}
                        value={selectedCountryId}

                    />
                    <DataVaccinesCoutry
                        report={report}
                    />
                </Box>
                {/* <CompareVaccines /> */} {/* đang tiến hành xử lý dữ liệu */}
                <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[646px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl    ipad:mt-2 mt-5 md:p-2 p-10 gap-[24px]' >

                    <TableVaccinesCountry />
                </Box>
                <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[446px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl    ipad:mt-2 mt-5 pt-4 gap-[24px]' >
                    <FooterPages />
                </Box>
            </div>
        </div>
    )
}

export default Vaccines
