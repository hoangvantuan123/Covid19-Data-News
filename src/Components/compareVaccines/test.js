import React from 'react'

function Test({ vaccine }) {
    let getDataWorld = [];
    for (let i = 0; i < vaccine.length; i++) {
        if (vaccine[i].location === "VietNam") {
            getDataWorld.push(vaccine[i]);
        }
    }
    console.log('da', getDataWorld);
    const lastItem = getDataWorld[0];
    // console.log('r', lastItem);
    return (
        <div>

        </div>
    )
}

export default Test
