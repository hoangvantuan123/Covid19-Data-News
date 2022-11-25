import axios from 'axios';
const headers = {
    'X-RapidAPI-Key': '124d5f6cd1mshf0f4e4913aa0baep171bc2jsn36c019071960',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'

}

export const getCountries2 = () =>
    axios.get(
        'https://raw.githubusercontent.com/hoangvantuan123/data-covid19/main/data/Country.json',

    );

export const getReportByCountry2 = (Country) =>
    axios.get(
        `https://covid-193.p.rapidapi.com/history?country=${Country}`,
        { headers }

    );

    
export const getReportByCountry3 = (Country) =>
    axios.get(
        `https://covid-193.p.rapidapi.com/history?country=${Country}`,
        { headers }

    );
