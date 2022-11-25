import React, { useEffect } from 'react';
import { sortBy } from 'lodash';
import { getReportByCountry2 } from '../../API/history';
import CountrySelect from './countrySelect';
import CircleMap from './cricleMap';
import * as Realm from "realm-web";
import API_KEY from '../../KEY';
export default function Country() {

  const [countries, setCountries] = React.useState([]);
  const [selectedCountryId, setSelectedCountryId] = React.useState('');
  const [report, setReport] = React.useState([]);



  useEffect(() => {
    async function loadCountry() {
      const REALM_APP_ID = API_KEY
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
    <div className='phone:p-2 ipad:p-0 p-5 ipad:mt-10   lg:min-h-[500px]  m-auto phone:justify-center'>
      <div className='  mb-6'>
        <h2 className='phone:text-center uppercase font-inter font-semibold text-3xl text-[#3E3E3E]' >
          Cập nhật tình hình quốc gia
        </h2>

        <div className='phone:p-2'>
          <CountrySelect handleOnChange={handleOnChange}
            countries={countries}
            value={selectedCountryId} />
          <CircleMap report={report} />
        </div>
      </div>
    </div>
  )
}
