import axios from 'axios';
const headers = {
    'X-RapidAPI-Key': '124d5f6cd1mshf0f4e4913aa0baep171bc2jsn36c019071960',
    'X-RapidAPI-Host': 'free-news.p.rapidapi.com'

}

export const getNewsCoronaVirus = () =>
    axios.get(
        'https://free-news.p.rapidapi.com/v1/search?q=Covid-19&lang=vi',
        { headers }
    );
