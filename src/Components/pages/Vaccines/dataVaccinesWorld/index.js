
import React, { useMemo } from 'react'
import CountUp from 'react-countup';
function DataVaccinesWorld({ world }) {
    localStorage.clear();
    window.localStorage.clear();
    let getDataWorld = [];
    for (let i = 0; i < world.length; i++) {
        if (world[i].country === "World") {
            getDataWorld.push(world[i].data);
        }

    }
    //console.log('da', getDataWorld);
    const lastItem = getDataWorld[0];
   // console.log('r', lastItem);

    // Laaays phần tử cuối cùng tron mảng 
    /*     const dataitem = lastItem[lastItem.length - 1]; */
    //console.log( 'phan tu cuoi',dataitem);

    const boxitem = useMemo(() => {
        if (lastItem && lastItem.length) {
            const latestData = lastItem[lastItem.length - 1];
            return [
                {
                    count: latestData.people_vaccinated_per_hundred,
                    type: 'people_vaccinated_per_hundred'
                },


            ];
        }
        return [];
    }, [lastItem]);
    const data2 = useMemo(() => {
        if (lastItem && lastItem.length) {
            const latestData = lastItem[lastItem.length - 1];
            return [

                {
                    count1: latestData.total_vaccinations,
                    type: 'total_vaccinations'
                },

            ];
        }
        return [];
    }, [lastItem]);
    // console.log('r', boxitem);
    return (
        <div>
            <div className='phone:flex-col flex justify-between'>
                <div>
                    <h2 className='phone:text-xl  max-w-[650px]  relative float-right  font-inter font-semibold text-3xl  text-tahiti-100 uppercase ' >
                        Thế giới của chúng ta trong dữ liệu tiêm chủng COVID-19
                    </h2>
                </div>
                <div>
                    <p className='font-inter ipad:text-xs ipad:normal-case ipad:mt-5 ipad:mb-5 ipad:opacity-90 lg:text-lg font-semibold relative float-right  text-tahiti-100 max-w-[500px] m-auto  uppercase'>
                        Trong vòng chưa đầy 12 tháng sau khi bắt đầu đại dịch, một số nhóm nghiên cứu đã vượt qua thử thách và phát triển vắc xin bảo vệ khỏi SARS-CoV-2.    <br />
                        <br />
                        Bây giờ thách thức là làm cho những loại vắc xin này có sẵn cho mọi người trên thế giới. Điều quan trọng là mọi người ở tất cả các quốc gia - không chỉ ở các quốc gia giàu có - nhận được sự bảo vệ cần thiết.
                    </p>
                    <div className=''>
                        <div className=' mt-3'>
                            <h2 className="text-[#286DA8] phone:text-4xl lg:text-6xl  font-inter font-semibold ">
                                {
                                    boxitem.map((item, res) => {
                                        return <span key={res} >
                                            <CountUp
                                                end={item.count}
                                                duration={5}
                                            />
                                            %

                                        </span>
                                    })
                                }



                            </h2>
                            <h3 className=' font-inter ipad:text-xs ipad:max-w-xs lg:text-xl max-w-[400px]'>
                                Dân số thế giới đã nhận được ít nhất một liều vắc-xin COVID-19.
                            </h3>
                        </div>
                        <div className='mt-8'>
                            <h2 className="text-[#286DA8]  phone:text-4xl lg:text-6xl font-inter font-semibold">

                                {
                                    data2.map((res, item) => {
                                        return <span key={item}>
                                            <CountUp
                                                end={res.count1}
                                                duration={5}
                                            />
                                            
                                        </span>
                                    })
                                }
                            </h2>
                            <h3 className=' font-inter ipad:text-xs ipad:max-w-xs lg:text-xl max-w-[400px] phone:mb-8'>
                                Liều lượng đã được quản lý trên toàn cầu
                            </h3>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default DataVaccinesWorld
