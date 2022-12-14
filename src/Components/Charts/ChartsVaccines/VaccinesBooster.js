import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box, Stack, } from '@mui/material';
import DialogBox from './dialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function VaccinesBooster({ report }) {
    const generateOptions = (report) => {
        const categories = report.map((item) => item.date);

        return {
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {
                        readOnly: false
                    },
                    magicType: { show: true, type: ['line', 'bar', 'stack'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: categories,

            }, tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 100,
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },

            ],
            series: [
                {
                    type: 'line',
                    data: report.map((item) => item.total_vaccinations_per_hundred),
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    }, sampling: 'lttb',
                    showBackground: true,
                    itemStyle: {
                        color: 'rgb(42, 106, 83)',

                    },
                }
            ],
            legend: {
                show: true
            },
            animationDuration: 10000,
            animationDurationUpdate: 3000,

        }
    }

    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');
    useEffect(() => {
        setOptions(generateOptions(report));
    }, [report]);

    useEffect(() => {
        let customData = [];
        switch (reportType) {
            case 'all':
                customData = report;
                break;
            case '60':
                customData = report.slice(Math.max(report.length - 60, 1));
                break;
            case '30':
                customData = report.slice(Math.max(report.length - 30, 1));
                break;
            case '14':
                customData = report.slice(Math.max(report.length - 14, 1));
                break;

            default:
                customData = report;
                break;
        }

        setOptions(generateOptions(customData));
    }, [report, reportType]);

    const [day, setDay] = React.useState('');

    const handleChange = (event) => {
        setDay(event.target.value);
    };
    return (
        <div>
            <div className='  min-h-[500px] bg-[#E9E8EE82] rounded-xl mt-4'>
                <div className='p-3'>

                    <h2 className='phone:text-xl ipad:text-2xl font-inria font-semibold tablet:text-2xl md:text-3xl lg:text-4xl text-[#3E3E3E] capitalize mt-8  text-center ' >
                        C?? bao nhi??u li???u v???c xin t??ng c?????ng
                        ???????c qu???n l???
                    </h2>
                    <br />
                    <p className=' tablet:text-sm md:text-base lg:text-xl font-normal  text-tahiti-100 max-w-[650px]  '>
                        C??c bi???u ????? sau ????y cho th???y s??? li???u t??ng c?????ng ???????c s??? d???ng. Li???u t??ng c?????ng l?? li???u ???????c s??? d???ng v?????t qu?? quy ?????nh c???a ph??c ????? ti??m ch???ng ban ?????u - v?? d???, li???u th??? ba c???a v???c xin Pfizer / BioNTech ho???c li???u th??? hai c???a v???c xin Johnson & Johnson.    </p>
                </div>
                <div className='flex justify-between p-4 phone:hidden'>
                    <Stack direction="row" spacing={1}>

                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} name="button" onClick={() => setReportType('14')}>14 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('30')} >30 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('60')}>60 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('all')}>ALL days</Button>
                        <DialogBox></DialogBox>
                    </Stack>

                </div>
                <div className='  lg:hidden  md:hidden '>
                    <Box className="phone:flex">
                        <FormControl sx={{ m: 1, minWidth: 140 }}>
                            <Select
                                value={day}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ height: 36 }}
                            >
                                <MenuItem value="" onClick={() => setReportType('all')}>
                                    <em>ALL days</em>
                                </MenuItem>
                                <MenuItem value={10} onClick={() => setReportType('14')}>14 days</MenuItem>
                                <MenuItem value={20} onClick={() => setReportType('30')}>30 days</MenuItem>
                                <MenuItem value={30} onClick={() => setReportType('60')}>60 days</MenuItem>
                            </Select>
                        </FormControl>
                        <DialogBox></DialogBox>
                    </Box>
                </div>
                <div>
                    <ReactEcharts option={(options)} data={report} style={{
                        minHeight: 400,
                        minWidth: '100%',
                    }} ></ReactEcharts>
                </div>
            </div>
        </div>
    )
}
