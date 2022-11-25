
import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box, Stack, } from '@mui/material';
import DialogBox from './dialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function DeathsNew({ report }) {
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
                boundaryGap: [0, '0%']
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 70,
                    end: 100,
                },
                {
                    type: 'inside',
                    start: 70,
                    end: 100
                },

            ],
            series: [
                {
                    name: 'Death New',
                    data: report.map((item) => item.deaths.new),
                    type: 'bar',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                },
            ],
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
        <div className='mt-9'>
            <div className=' min-h-[500px] bg-[#E9E8EE82] rounded-xl'>
                <Tooltip
                    title={<div>
                        <h4 className=' text-xs'>
                            Ba điểm về số liệu tử vong được xác nhận cần ghi nhớ
                        </h4>
                        <br />
                        <p >
                            Số người chết thực tế do COVID-19 có thể cao hơn số người chết được xác nhận - điều này là do thử nghiệm hạn chế và các vấn đề trong việc xác định nguyên nhân tử vong. Sự khác biệt giữa số ca tử vong được xác nhận được báo cáo và số ca tử vong thực tế khác nhau tùy theo quốc gia.
                            <br />
                            Cách ghi nhận các ca tử vong do COVID-19 có thể khác nhau giữa các quốc gia (ví dụ: một số quốc gia có thể chỉ tính số ca tử vong tại bệnh viện, trong khi những quốc gia khác cũng bao gồm ca tử vong tại nhà.
                            <br />
                            Số liệu tử vong vào một ngày nhất định không nhất thiết cho biết số người chết mới vào ngày đó, mà là số người chết được báo cáo vào ngày đó. Vì báo cáo có thể thay đổi đáng kể giữa các ngày - không phân biệt bất kỳ biến thể thực tế nào về số ca tử vong - nên sẽ hữu ích khi xem mức trung bình luân phiên trong bảy ngày của các số liệu hàng ngày như chúng ta làm trong biểu đồ ở đây.
                        </p>
                    </div>
                    } arrow>
                    <h2 className=' phone:text-xl ipad:text-2xl font-inria font-semibold text-4xl text-[#3E3E3E] capitalize  mb-7 cursor-pointer   text-center pt-3' >
                        Số người chết được xác nhận hàng ngày là bao nhiêu?
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
        </div>
    )
}

export default DeathsNew
