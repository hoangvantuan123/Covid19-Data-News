import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { getVaccineData } from '../../../../../API';
import CardDialog from './CardDialog'
import { sortBy } from 'lodash';
export default function DataProcessingCard2() {
    const [vaccines, setVaccine] = React.useState([]);
    useEffect(() => {
        getVaccineData().then((res) => {
            const { data } = res;
            const vaccines = sortBy(data, 'country');
            setVaccine(vaccines);
        })
    }, []);
    console.log('hehe', vaccines.selectedCountryId)

    /// Xử lý dữ liệu lấy giá trị có tên Viet Nam
    let getDataWorld = [];
    for (let i = 0; i < vaccines.length; i++) {

        if (vaccines[i].country === "Vietnam") {

            getDataWorld.push(vaccines[i].data);

        }

    }

    /// Xử lý dữ liệu lấy phần tử cuối cùng trong mảng 
    //console.log('da', getDataWorld);
  

    localStorage.clear();
    window.localStorage.clear();
    const exportDataJson = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(getDataWorld)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "Vaccines_Country_VNM.json";
        link.click();
    };
    return (

        <div className='flex justify-between'>
            <CardDialog></CardDialog>
            <Button variant="outlined" sx={{
                width: 130, borderRadius: 2, fontWeight: 'bold', bgcolor: '#058527', color: '#FFFFFF', ':hover': {
                    bgcolor: '#F1F1F2',
                    color: '#058527',
                    borderColor: '#058527'
                },
            }} onClick={exportDataJson}>Download</Button>
        </div>
    )
}
