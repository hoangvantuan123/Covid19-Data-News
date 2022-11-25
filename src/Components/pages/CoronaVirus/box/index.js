import { Box, Grid } from '@mui/material'
import React, { useMemo } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'
import CountUp from 'react-countup';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 200,
    borderRadius: 16,

}));
function BoxCountry({ report }) {
    //console.log("testdatareport", report);
    const dataitem = report[report.length - 1];
    /*     const boxitem = useMemo(() => {
            if (report && report.length) {
                const latestData = report[report.length - 1];
                return [
                    {
                        count: latestData.cases.total,
                        span: latestData.cases.new,
                        type: 'total cases'
                    },
                    {
                        count1: latestData.deaths.total,
                        span1: latestData.deaths.new,
                        type: 'total deaths',
                    },
                    {
                        count2: latestData.cases.recovered,
                        type: 'recovered'
                    },
                    {
                        count3: latestData.cases.active,
                        type: 'active'
                    },
                ]
            }
            return [];
        }, [report]); */
    //console.log('r', boxitem);
    return (
        <Box sx={{ flexGrow: 2, }} className='phone:mt-5 ipad:mt-7 mt-7     '>
            <Grid container spacing={1} columns={16}>
                <Grid item sm={4} xs={16} >
                    <Item className="min-h-[250px]">
                        <div className=' w-full  h-4 rounded-t-2xl bg-[#EF4444]'>
                        </div>
                        <div className='relative  '>
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] w-full justify-center'>
                                <div>
                                    <h2 className=' font-inter font-semibold phone:text-[23px] ipad:text-lg lg:text-xl mb-4'>Tổng số nhiễm trùng</h2>

                                    <h3 className='ipad:text-4xl  lg:text-4xl font-bold text-[#EF4444]' >
                                        <CountUp
                                            end={dataitem?.cases.total}
                                            duration={5}
                                        />
                                    </h3>
                                </div>
                                <div className=' flex  justify-center'>
                                    <h3 className='font-bold'>
                                        Ca nhiễm/ngày: &nbsp;
                                    </h3>
                                    <h4>

                                        <span className=' text-xs font-bold text-[#EF4444]' >
                                            <CountUp
                                                end={dataitem?.cases.new}
                                                duration={5}
                                            />
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </Item>
                </Grid>
                <Grid item sm={4} xs={16}>
                    <Item  className="min-h-[250px]"> 
                        <div className=' w-full  h-4 rounded-t-2xl bg-[#ACACAC]'>
                        </div>
                        <div className='relative '>
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] w-full justify-center'>
                                <div>

                                    <h2 className=' font-inter font-semibold phone:text-[23px] ipad:text-lg lg:text-xl mb-4'>Tổng ca tử vong</h2>

                                    <h3 className='phone:text-4xl ipad:text-4xl  lg:text-4xl font-bold text-[#ACACAC]' >
                                        <CountUp
                                            end={dataitem?.deaths.total}
                                            duration={5}
                                        />
                                    </h3>
                                </div>
                                <div className=' flex  justify-center'>

                                    <h3 className=' font-bold'>
                                        Tử vong/ngày: &nbsp;
                                    </h3>
                                    <h4>

                                        <span className=' text-xs font-bold text-[#ACACAC]' >
                                            <CountUp
                                                end={dataitem?.deaths.new}
                                                duration={5}
                                            />
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </Item>
                </Grid>
                <Grid item sm={4} xs={16}>
                    <Item  className="min-h-[250px]">
                        <div className=' w-full  h-4 rounded-t-2xl bg-[#22C563]'>
                        </div>
                        <div className='relative '>
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] w-full justify-center'>
                                <div>

                                    <h2 className=' font-inter font-semibold phone:text-[23px] ipad:text-lg lg:text-xl mb-4'>Tổng ca hồi phục</h2>

                                    <h3 className=' phone:text-4xl ipad:text-4xl  lg:text-4xl font-bold text-[#22C563]' >
                                        <CountUp
                                            end={dataitem?.cases.recovered}
                                            duration={5}
                                        />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Item>
                </Grid>
                <Grid item sm={4} xs={16}>
                    <Item  className="min-h-[250px]">
                        <div className=' w-full  h-4 rounded-t-2xl bg-[#F59E0B]'>
                        </div>
                        <div className='relative '>
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] w-full justify-center'>
                                <div>
                                    <h2 className=' font-inter font-semibold phone:text-[23px] ipad:text-lg lg:text-xl mb-4'>Tổng đang điều trị</h2>

                                    <h3 className=' phone:text-4xl ipad:text-4xl lg:text-4xl font-bold text-[#F59E0B]' >
                                        <CountUp
                                            end={dataitem?.cases.active}
                                            duration={5}
                                        />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BoxCountry