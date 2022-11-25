import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getTableAllCountries } from '../../API'
import { sortBy } from 'lodash';
import { ButtonGroup } from '@mui/material';
import ButtonGroupWorld from '../table/buttonGroup/index.js'
import { padding } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
export default function TableCoronaVirus() {
    //const [data , setAllCountry] = React.useState([])
    const [allCountry, setAllCoutry] = React.useState([]);

    useEffect(() => {
        getTableAllCountries().then((res) => {
            // console.log({ res });
            const { data } = res;
            const allCountry = sortBy(data);
            setAllCoutry(allCountry);
            delete allCountry[0];

        });
    }, []);
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //console.log('te', allCountry)
    return (
        <div className='mt-9'>
            <h2 className=' font-inria font-semibold text-4xl text-[#3E3E3E] capitalize ' >
                Bộ dữ liệu toàn cầu về đột biến covid-19
            </h2>

            <p className=' text-xl font-inria mt-7 mb-7  text-tahiti-100 max-w-[650px]  '>
                Coronavirus COVID-19 đang ảnh hưởng đến 228 quốc gia và vùng lãnh thổ. Danh sách các quốc gia và phân loại khu vực của họ dựa trên
                <a href="https://unstats.un.org/unsd/methodology/m49/" className='text-[#37629A]'> United Nations Geoscheme.</a>
            </p>

            <TableContainer component={Paper} sx={{ height: 700, width: '100%', }} translate="no">
               
                <Table sx={{ Width: '100%', Height: '500px', overflow: 'hidden' }} size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow >
                            <TableCell align="right" >STT</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>COUNTRY</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>TOTAL CASES</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>NEW CASES ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>TOTAL DEATHS  ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>NEW DEATHS▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 190 }}>TOTAL RECOVERED ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>INFECTION RISK ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>SERIOUS, CRITICAL▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>ACTIVE CASES ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 230 }}>CASE FATALITY RATE (CFR)▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>TOTAL TESTS ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 190 }}>TEST PERCENTAGE ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 230 }}>RECOVERY PERCENTAGE ▾</TableCell>
                            <TableCell align="right" sx={{ minWidth: 170 }}>POPULATION ▾</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCountry.map((row, id) => (
                            <TableRow
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >
                                    {row.rank}
                                </TableCell>
                                <TableCell align="right" translate="no">{row.Country}</TableCell>
                                <TableCell align="right">{row.TotalCases}</TableCell>
                                <TableCell align="right">{row.NewCases}</TableCell>
                                <TableCell align="right">{row.TotalDeaths}</TableCell>
                                <TableCell align="right">{row.NewDeaths}</TableCell>
                                <TableCell align="right">{row.TotalRecovered}</TableCell>
                                <TableCell align="right">{row.Infection_Risk}</TableCell>
                                <TableCell align="right">{row.Serious_Critical}</TableCell>
                                <TableCell align="right">{row.ActiveCases}</TableCell>
                                <TableCell align="right">{row.Case_Fatality_Rate}</TableCell>
                                <TableCell align="right">{row.TotalTests}</TableCell>
                                <TableCell align="right">{row.Test_Percentage}</TableCell>
                                <TableCell align="right">{row.Recovery_Proporation}</TableCell>
                                <TableCell align="right">{row.Population}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
