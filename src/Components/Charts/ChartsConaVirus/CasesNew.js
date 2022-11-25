
import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box, Stack, } from '@mui/material';
import DialogBox from './dialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CasesNew({ report }) {

    const generateOptions = (report) => {
        const categories = report.map((item) => item.day);

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

            animationDuration: 10000,
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

                data: categories,

            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 90,
                    end: 100,
                },
                {
                    type: 'inside',
                    start: 90,
                    end: 100
                },

            ],

            series: [
                {
                    name: 'Cases New',
                    data: report.map((item) => item.cases.new),
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                },
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
    /// Xử lý dữ liệu theo ngày 


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
    const text = ['Số liệu trường hợp được báo cáo vào một ngày nhất định không nhất thiết cho thấy số trường hợp mới vào ngày đó - điều này là do sự chậm trễ trong việc báo cáo. ',
        'Số trường hợp thực tế có khả năng cao hơn nhiều so với số trường hợp được xác nhận - điều này là do thử nghiệm hạn chế. ']

    const [day, setDay] = React.useState('');

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    return (
        <div className=' mt-8'>
            <div className='  min-h-[500px] bg-[#E9E8EE82] rounded-xl'>
                <Tooltip title={text} arrow>
                    <h2 className='phone:text-xl ipad:text-2xl font-inria font-semibold lg:text-4xl text-[#3E3E3E] capitalize cursor-pointer text-center p-3' >
                        Số trường hợp được xác nhận hàng ngày là bao nhiêu?
                    </h2>
                </Tooltip>
                <div className='flex justify-between p-4 phone:hidden'>
                    <Stack direction="row" spacing={1}>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} name="button" onClick={() => setReportType('14')}>14 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('30')} >30 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('60')}>60 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('all')}>ALL days</Button>
                        <DialogBox></DialogBox>
                    </Stack>
                </div>
                <div className=' lg:hidden  md:hidden  '>
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
        </div >
    )
}

export default CasesNew


