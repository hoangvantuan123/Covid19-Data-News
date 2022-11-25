import React, { useEffect } from 'react'
import { getWorldData } from '../../../../API';
import { sortBy } from 'lodash';
import { Box } from '@mui/material';
import CountUp from 'react-countup';
export default function World() {

    const [world, setWorld] = React.useState([]);

    // World Data API 
    useEffect(() => {
        getWorldData().then((response) => {
            console.log('WorldData', response);
            const { data } = response;
            const world = sortBy(data);
            setWorld(world);
        });
    }, []);


    return (
        <Box className='phone:w-full md:w-full font-inter w-2/3 bg-hero-pattern bg-cover bg-no-repeat ipad:mb-4'>
            <Box className='  phone:min-h-full lg:min-w-[100%] lg:min-h-[750px] phone:pt-10 phone:pb-10 pt-28 phone:p-2'>
                <div className=' phone:flex-col flex justify-around items-center m-auto '>
                    <div className=' bg-[#286DA8] phone:w-full  w-[220px] h-[100px] relative rounded-2xl phone:rounded-xl'>
                        <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[260px] text-center phone:text-[12px] text-[#FFFFFF]'>
                            Tổng số ca nhiễm trùng
                            <h5>
                                {
                                    world.map(item => {
                                        return <span key={item} className='text-[#FFFFFF] phone:font-extrabold text-3xl'>
                                            <CountUp
                                                end={item.TotalCases}
                                                duration={5}
                                            />

                                        </span>
                                    })
                                }
                            </h5>
                        </div>
                    </div>
                    <div className=' bg-[#D75F24]  phone:w-full  w-[220px] h-[100px] relative rounded-2xl phone:rounded-xl mt-10'>
                        <div className=' phone:text-[12px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[260px] text-center text-[#FFFFFF]'>
                            Số người chết
                            <h5>
                                {
                                    world.map(item => {
                                        return <span key={item} className='text-[#FFFFFF] phone:font-extrabold  text-3xl'>

                                            <CountUp
                                                end={item.TotalDeaths}
                                                duration={5}
                                            />
                                        </span>
                                    })
                                }
                            </h5>
                        </div>
                    </div>
                </div>
                <div className=' bg-[#7BB224]  phone:w-full w-[220px] h-[100px] relative rounded-2xl  phone:rounded-xl phone:mt-10 md:mt-20 lg:mt-28 justify-around items-center m-auto  '>
                    <div className='  phone:text-[12px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[260px] text-center text-[#FFFFFF]'>
                        Tổng số lần khôi phục
                        <h5>
                            {
                                world.map(item => {
                                    return <span key={item} className='text-[#FFFFFF] phone:font-extrabold text-3xl'>
                                        <CountUp
                                            end={item.TotalRecovered}
                                            duration={5}
                                        />
                                    </span>
                                })
                            }
                        </h5>
                    </div>
                </div>
            </Box>

        </Box>
    )
}
