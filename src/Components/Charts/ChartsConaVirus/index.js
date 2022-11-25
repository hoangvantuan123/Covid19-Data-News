import React from 'react'
import CasesNew from './CasesNew'
import CasesTotal from './CasesTotal'
import DeathsNew from './DeathsNew'

function PageChartConaVirus({ report }) {
    return (
        <div>
            <CasesNew report={report} />
            <DeathsNew report={report}/>
            <CasesTotal report={report}/>   
        </div>
    )
}

export default PageChartConaVirus
