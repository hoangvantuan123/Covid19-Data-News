import React, { useEffect, useMemo } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
/* import { getTableAllCountries } from '../../API'
import { sortBy } from 'lodash'; */
import * as Realm from "realm-web";

const columns = [
    {
        field: 'iso_code',
        headerName: 'iso_code',
    },
    {
        field: 'continent',
        headerName: 'continent',
    },
    {
        field: 'location',
        headerName: 'location',
    },
    {
        field: 'last_updated_date',
        headerName: 'last_updated_date',


    },
    {
        field: 'new_cases',
        headerName: 'new_cases',

        type: 'number',
    },
    {
        field: 'new_deaths',
        headerName: 'new_deaths',

    },
    {
        field: 'new_cases_per_million',
        headerName: 'new_cases_per_million',

    },
    {
        field: 'new_cases_smoothed',
        headerName: 'new_cases_smoothed',

    },
    {
        field: 'new_deaths_per_million',
        headerName: 'new_deaths_per_million',

    },
    {
        field: 'new_deaths_smoothed_per_million',
        headerName: 'new_deaths_smoothed_per_million',
    },
    {
        field: 'new_tests',
        headerName: 'new_tests',
    },
    {
        field: 'total_cases',
        headerName: 'total_cases',
    },
    {
        field: 'total_deaths',
        headerName: 'total_deaths',
    },
    {
        field: 'total_tests',
        headerName: 'total_tests',
    },
    {
        field: 'total_vaccinations',
        headerName: 'total_vaccinations',

    },

];

export default function TableUiCoronaVirus() {
    //const [data , setAllCountry] = React.useState([])
    /*   const [allCountry, setAllCoutry] = React.useState([]);
      const [value, setValue] = React.useState([]);
      const [country, setCountry] = React.useState([])
      const [countries, setCountries] = React.useState([]);
   */
    const [countriesLatest, setCountriesLatest] = React.useState([]);
    /*  useEffect(() => {
         getTableAllCountries().then((res) => {
             // console.log({ res });
             const { data } = res;
             const allCountry = sortBy(data);
             setAllCoutry(allCountry);
         });
     }, []);
     console.log('afsdf', allCountry)
     const deletefirstitem = allCountry.shift(); */

    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = "getdatacovidlatest-yhhxx"
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const countriesLatest = await user.functions.getDataCovid19Latest();
                setCountriesLatest(countriesLatest);
                // console.log('[TestGetAllCountry12]', countriesLatest);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])
    return (
        <Box>
            <Box>
                <h2 className='phone:text-xl ipad:text-2xl font-inria font-semibold text-4xl text-[#3E3E3E] capitalize ' >
                    Bộ dữ liệu toàn cầu về đột biến covid-19
                </h2>

                <p className='phone:text-[12px] ipad:text-lg phone:max-w-[300px] text-xl font-inria mt-7 mb-7  text-tahiti-100 max-w-[650px]  '>
                    Coronavirus COVID-19 đang ảnh hưởng đến 228 quốc gia và vùng lãnh thổ. Danh sách các quốc gia và phân loại khu vực của họ dựa trên
                    <a href="https://unstats.un.org/unsd/methodology/m49/" className='text-[#37629A]'> United Nations Geoscheme.</a>
                </p>
            </Box>
            <Box sx={{ height: 700, width: '100%' }} translate="no">
                <DataGrid
                    columns={columns}
                    rows={countriesLatest}
                    getRowId={(row) => row.location}
                    pageSize={20}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
            
        </Box>
    )
}
