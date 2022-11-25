import React, { useEffect } from 'react';
import Select from "react-select"
import makeAnimated from "react-select/animated";
import { Box } from '@mui/material';
import CompareEcharts from './CountrySelect';
import { sortBy } from 'lodash';
import { getVaccineData } from '../../API'
import * as Realm from "realm-web";
import Test from './test';
import API_KEY from '../../KEY';
const animatedComponents = makeAnimated();

export default function CompareVaccines() {
    const [options, setOptions] = React.useState([]);
    const [report, setReport] = React.useState([]);
    const [getCountryid, setCountryid] = React.useState('');
    const [vaccine, setVaccine] = React.useState([]);
    const [name, setName] = React.useState([])
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const options = await user.functions.locations();
                setOptions(options.map(({ location }) => ({
                    value: location,
                    label: location,
                    location,
                })));

                //console.log('[TestGetAllCountrytest]', options);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])

    const handlecountry = (event) => {
        console.log("handleChange", event);
        const getCountryid = event;
        setCountryid(event);
        const Location = getCountryid.map((item) => item.location)
        const cuoi = Location[Location.length - 1];
        setName(cuoi)
    }
    console.log('(name)', name);

    useEffect(() => {

        async function loadCountry() {
            const REALM_APP_ID = "vaccines-bflux"
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const vaccine = await user.functions.getVaccinesDataCountry(name);
                console.log('[getCompareDataVaccines]', vaccine);
                setVaccine(vaccine);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, []);


    localStorage.clear();
    window.localStorage.clear();
    return (
        <div>
            <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%]  lg:w-[1250px] min-h-full bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl   ipad:mt-2 mt-5 md:p-2 p-10 gap-[24px]' >
                <Box className='bg-[#E9E8EE82] h-full rounded-xl'>
                    <div>
                        <h2 className='phone:text-xl ipad:text-2xl font-inria font-semibold text-4xl text-[#3E3E3E] capitalize cursor-pointer text-center p-3' >
                            Biểu đồ so sánh dữ liệu trên toàn thế giới
                        </h2>
                    </div>
                    <Select
                        isMulti
                        options={options}
                        className='w-full p-3'
                        onChange={(e) => handlecountry(e)}
                        components={animatedComponents}
                        classNamePrefix="Country"
                    >
                    </Select>
                    {/* <Test
                        vaccine={vaccine}
                    ></Test> */}
                </Box>
            </Box>
        </div>
    )
}





