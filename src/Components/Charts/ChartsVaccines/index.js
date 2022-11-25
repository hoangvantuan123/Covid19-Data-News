import React from 'react'
import VaccinesDaily from './VaccinesDaily'
import VaccinesProtocol from './VaccinesProtocol'
import VaccinesBooster from "./VaccinesBooster";
import VaccinesDailyPerMilion from './VaccinesDailyPerMilion';
import VaccinesBoosterHundred from './VaccinesBoosterHundred';
import PeopleVaccinesPerHundred from './peopleVaccinesPerHundred';
function ChartsVaccines({ report }) {
    return (
        <div>
            <VaccinesDaily report={report} />
            <VaccinesDailyPerMilion report={report} />
            <PeopleVaccinesPerHundred report={report} />
            <VaccinesBooster report={report} />
            <VaccinesBoosterHundred report={report} />
        </div>
    )
}

export default ChartsVaccines
