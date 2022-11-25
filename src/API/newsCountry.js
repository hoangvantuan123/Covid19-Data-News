import axios from 'axios';

const headers = {
    'X-RapidAPI-Key': '124d5f6cd1mshf0f4e4913aa0baep171bc2jsn36c019071960',
    'X-RapidAPI-Host': 'covid-19-news.p.rapidapi.com'

}

export const getNewsCountry = () =>
    axios.get(
        'https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=vi&country=VN&media=True',
        { headers }
    );