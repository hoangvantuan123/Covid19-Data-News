import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Stack, Typography } from '@mui/material';
import DialogBox from './dialog';

export default function VaccinesProtocol({ report }) {
    console.log('vaccccccc', report)
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
dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 98,
                    end: 100,
                },
                {
                    type: 'inside',
                    start: 98,
                    end: 100
                },

            ],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: categories,

            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            series: [
                {
                    realtimeSort: true,
                    type: 'line',
                    data: report.map((item) => item.total_vaccinations_per_hundred),
                    showBackground: true,
                    itemStyle: {
                        color: 'rgb(42, 106, 83)'
                    },
                    name: 'Tổng liều vắc xin COVID-19 được tiêm trên 100 người',
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

    return (
        <div>

            <div className='  min-h-[500px] bg-[#E9E8EE82] rounded-xl'>
                <div>
                    <h2 className=' font-inria font-semibold tablet:text-2xl md:text-3xl lg:text-4xl text-[#3E3E3E] capitalize ' >
                        Tổng liều vắc xin COVID-19 được tiêm trên 100
                        người?
                    </h2>
                    <br />
                </div>
                <div className='flex justify-between p-4'>
                    <Stack direction="row" spacing={1}>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} name="button" onClick={() => setReportType('14')}>14 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('30')} >30 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('60')}>60 days</Button>
                        <Button sx={{ width: 100, bgcolor: '#FEFEFE' }} onClick={() => setReportType('all')}>ALL days</Button>
                        <DialogBox></DialogBox>
                    </Stack>

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
