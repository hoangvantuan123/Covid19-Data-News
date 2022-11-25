import React, { useMemo } from 'react'
import CountUp from 'react-countup';
function CircleMap({ report }) {

    const dataitem = report[report.length - 1];
    /* const boxitem = useMemo(() => {
        if (report && report.length) {
            const latestData = report[report.length - 1];
            return [
                {
                    count1: latestData.cases.total,
                    type: 'confirmed',
                },
                {
                    count2: latestData.cases.recovered,
                    type: 'recovered',
                },
                {
                    count3: latestData.deaths.total,
                    type: 'death',
                },
            ];
        }
        return [];
    }, [report]); */

    return (
        <div className=' phone:p-2 font-inter font-medium text-[#3C4E66]  items-center justify-center mt-14 phone:mt-5'>
            <div className='flex justify-between phone:flex-col phone:text-center'>
                <div className=' '>
                    <h5 className=' '>
                        Tổng số ca nhiễm trùng
                        <br />
                       
                        <span className="text-[#286DA8] text-4xl font-black">
                            <CountUp
                                end={dataitem?.cases.total}
                                duration={5}
                            />

                        </span>

                    </h5>
                </div>
                <div className='phone:mt-5'>
                    <h5 className=' '>
                        Số người chết
                        <br />
                      
                        <span className="text-[#D75F24] text-4xl font-black">
                            <CountUp
                                end={dataitem?.deaths.total}
                                duration={5}
                            />
                        </span>
                    </h5>
                </div>
            </div>
            <div className='mt-10 phone:text-center phone:mt-5'>
                <h5 className=' '>
                    Số lần khôi phục
                    <br />
                </h5>
                    <span className='text-[#7BB224] text-4xl font-black'>
                        <CountUp
                            end={dataitem?.cases.recovered}
                            duration={5}
                        />
                    </span>
            </div>

        </div>
    )
}

export default CircleMap
