import axios from 'axios';
import moment from 'moment';


const headers = {
    'X-RapidAPI-Key': '6dc4243c49msh6217c2b1364ffc6p134ffdjsnb313fb71caa1',
    'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
}

// World Data API : https://rapidapi.com/vaccovidlive-vaccovidlive-default/api/vaccovid-coronavirus-vaccine-and-treatment-tracker/
export const getWorldData = () =>
    axios.get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world`,
        { headers }
    );
// Countries Data API :  https://documenter.getpostman.com/view/10808728/SzS8rjbc
export const getCountries = () => axios.get('https://api.covid19api.com/countries');
export const getReportByCountry = (country) =>
    axios.get(
        `https://api.covid19api.com/dayone/country/${country}?${moment()
            .utc(0)
            .format()}`
    );
export const getTableAllCountries = () =>
    axios.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/', { headers })


// Get All Coronavirus News :
/* export const getCoronaVirusNews = () =>
    axios.get(
        'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/0',
        { headers }
    ); */

//Get All Health News
export const getHealthNews = () =>
    axios.get(
        'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/1',
        { headers }
    );

// Get All Vaccine News 

export const getVaccineNews = () =>
    axios.get(
        'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/1',
        { headers }
    );

// get VaccineData api
export const getVaccineData = () =>
    axios.get(
        'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json',

    )


export const getTableVaccinesCoutry = () =>
    axios.get(
        'https://raw.githubusercontent.com/hoangvantuan123/data-covid19/main/data/VaccineCountry.json'
    )
export const getMaps = () =>
    axios.get('https://code.highcharts.com/mapdata/countries/vn/vn-all.topo.json')