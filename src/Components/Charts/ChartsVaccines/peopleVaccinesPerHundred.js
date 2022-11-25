import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box, Stack, } from '@mui/material';
import DialogBox from './dialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PeopleVaccinesPerHundred({ report }) {
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, '0%'],
            },

            yAxis: {
                type: 'category',
                data: categories,
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                max: 2 // only the largest 3 bars will be displayed
            },
            series: [
                {
                    realtimeSort: true,
                    type: 'bar',
                    data: report.map((item) => item.people_vaccinated_per_hundred),
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    }, itemStyle: {
                        color: 'rgb(42, 106, 83)'
                    },
                    name: ' Tỷ lệ dân số đã được tiêm ít nhất một liều vắc-xin (%)',
                }
            ],

            legend: {
                show: true
            },
            animationDuration: 10000,
            animationDurationUpdate: 3000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
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
                <div>

                    <h2 className='  phone:text-xl ipad:text-2xl font-inria font-semibold tablet:text-2xl md:text-3xl lg:text-4xl text-[#3E3E3E] capitalize text-center p-3 ' >
                        Tỷ lệ dân số đã được tiêm ít nhất một liều vắc-xin là bao nhiêu?
                    </h2>

                </div>
                <br />
                <div className='flex justify-between p-4  phone:hidden'>
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
