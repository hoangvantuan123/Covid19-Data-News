import React, { useEffect, useState, useCallback } from 'react';
import * as Realm from "realm-web";
import MapsWorld from './MapsWorld';
import API_KEY_6 from '../../../KEY/key6';
export default function PageMaps() {
    const [downloadMap, setDownload] = React.useState([]);
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY_6;
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const downloadMap = await user.functions.getMapsDataCountry();
                setDownload(downloadMap.map(({
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
                    code3: iso_code,
                    continent, location, last_updated_date, total_cases, new_cases,
                    new_cases_smoothed,
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
                console.log('[setDownload]', downloadMap);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])
    return (
        <div className='min-w-[100%] min-h-[100vh] m-auto justify-center items-center p-2 phone:max-w-full ipad:max-w-full phone:min-h-full ipad:min-h-full rounded-3xl relative'>
            <MapsWorld
                downloadMap={downloadMap}
            />
        </div>
    )
}
