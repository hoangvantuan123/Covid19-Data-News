import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CoronaVirus from './Components/pages/CoronaVirus';
import Discoveries from './Components/pages/Discoveries';
import Vaccines from './Components/pages/Vaccines';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import localforage from 'localforage';
import { sortBy } from 'lodash';
//
import * as Realm from "realm-web";
import MenuPages from './Components/menu';
import DataExplorer from './Components/pages/DataExplorer';



import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import PageMaps from './Components/pages/Maps';
//fire base


const firebaseConfig = {
    apiKey: "AIzaSyDF-rqqF_dKefsm0N3v_Cn-DJ9K5yuIw9E",
    authDomain: "covid19-data-news.firebaseapp.com",
    projectId: "covid19-data-news",
    storageBucket: "covid19-data-news.appspot.com",
    messagingSenderId: "1026728649163",
    appId: "1:1026728649163:web:80034e67a090f6dce3964e",
    measurementId: "G-4GX5WVJPTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




function App() {
    const [apiData, setData] = React.useState([]);
    const [country, setCountry] = React.useState([])
    const [countries, setCountries] = React.useState([]);
    const [test, setTTest] = React.useState([]);

 
    localStorage.clear();
    window.localStorage.clear();
    return (
        <div className="App  bg-[#F1F1F2] ">
            <Router>
                <MenuPages></MenuPages>
                <Routes>
                    <Route exact path='/' element={<Discoveries />} />
                    <Route exact path='/Maps' element={<PageMaps />} />
                    <Route exact path='/CoronaVirus' element={<CoronaVirus />} />
                    <Route exact path='/Vaccines' element={<Vaccines />} />
                    <Route exact path='/DataExplorer' element={<DataExplorer />} />
                </Routes>
            </Router>
        </div >
    );
}

export default App;
