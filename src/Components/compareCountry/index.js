import React, { useEffect } from 'react';
import CompareSelectUI from './countrySelect';

import Select from "react-select"
import makeAnimated from "react-select/animated";
import { Box } from '@mui/material';
import * as Realm from "realm-web";
import API_KEY_2 from '../../KEY/key2';
const animatedComponents = makeAnimated();

export default function CompareCountry() {
    const [report, setReport] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY_2
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const options = await user.functions.getDataWorldLatestCustom();
                setOptions(options.map(({
                    iso_code, continent, location, last_updated_date, total_cases, new_cases, new_cases_smoothed,
                    total_deaths, new_deaths, new_deaths_smoothed, total_cases_per_million, new_cases_per_million, new_cases_smoothed_per_million
                    , total_deaths_per_million, new_deaths_per_million, new_deaths_smoothed_per_million, reproduction_rate,
                    hosp_patients, icu_patients, icu_patients_per_million, hosp_patients_per_million, weekly_icu_admissions,
                    weekly_icu_admissions_per_million, weekly_hosp_admissions, weekly_hosp_admissions_per_million,
                    total_tests, new_tests, total_tests_per_thousand, new_tests_per_thousand, new_tests_smoothed,
                    new_tests_smoothed_per_thousand, positive_rate, tests_per_case, tests_units, total_vaccinations, people_vaccinated,
                    people_fully_vaccinated, total_boosters, new_vaccinations, new_vaccinations_smoothed, total_vaccinations_per_hundred,
                    people_vaccinated_per_hundred, people_fully_vaccinated_per_hundred, total_boosters_per_hundred,
                    new_vaccinations_smoothed_per_million, new_people_vaccinated_smoothed, new_people_vaccinated_smoothed_per_hundred,
                    stringency_index, population_density, median_age, aged_65_older, aged_70_older, gdp_per_capita, extreme_poverty,
                    cardiovasc_death_rate, diabetes_prevalence, female_smokers, male_smokers, handwashing_facilities,
                    hospital_beds_per_thousand, life_expectancy, human_development_index, population, excess_mortality_cumulative_absolute,
                    excess_mortality_cumulative, excess_mortality, excess_mortality_cumulative_per_million
                }) => ({
                    iso_code,
                    continent, 
                    value: location,
                    label: location,
                    last_updated_date, total_cases, new_cases, new_cases_smoothed,
                    total_deaths, new_deaths, new_deaths_smoothed, total_cases_per_million, new_cases_per_million, new_cases_smoothed_per_million
                    , total_deaths_per_million, new_deaths_per_million, new_deaths_smoothed_per_million, reproduction_rate,
                    hosp_patients, icu_patients, icu_patients_per_million, hosp_patients_per_million, weekly_icu_admissions,
                    weekly_icu_admissions_per_million, weekly_hosp_admissions, weekly_hosp_admissions_per_million,
                    total_tests, new_tests, total_tests_per_thousand, new_tests_per_thousand, new_tests_smoothed,
                    new_tests_smoothed_per_thousand, positive_rate, tests_per_case, tests_units, total_vaccinations, people_vaccinated,
                    people_fully_vaccinated, total_boosters, new_vaccinations, new_vaccinations_smoothed, total_vaccinations_per_hundred,
                    people_vaccinated_per_hundred, people_fully_vaccinated_per_hundred, total_boosters_per_hundred,
                    new_vaccinations_smoothed_per_million, new_people_vaccinated_smoothed, new_people_vaccinated_smoothed_per_hundred,
                    stringency_index, population_density, median_age, aged_65_older, aged_70_older, gdp_per_capita, extreme_poverty,
                    cardiovasc_death_rate, diabetes_prevalence, female_smokers, male_smokers, handwashing_facilities,
                    hospital_beds_per_thousand, life_expectancy, human_development_index, population, excess_mortality_cumulative_absolute,
                    excess_mortality_cumulative, excess_mortality, excess_mortality_cumulative_per_million
                })));

                console.log('[TestGetAllCountry]', options);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])


    const handleChange = (selectedOption) => {
        console.log("handleChange", selectedOption);
        setReport(selectedOption)
    }
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
                        onChange={handleChange}
                        className='w-full p-3'
                        components={animatedComponents}
                        classNamePrefix="Country"
                    >
                    </Select>
                    <CompareSelectUI
                        report={report}
                    />
                </Box>
            </Box>
        </div>
    )
}





