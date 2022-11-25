import React from 'react'
import { Link } from 'react-router-dom'
import { Box, ListItem } from '@mui/material'

const boxitem = [
    {
        id: 1,
        h3: 'coronavirus',
        span: ' V1',
        img: 'https://raw.githubusercontent.com/hoangvantuan123/Covid-19-news/515a95ba9247694914318406aa776e2f6682e2c5/src/Components/file/Images/khang-the-troi-cho-trungquoc-omicron-2022-02-04-15-05.jpg',
        p: "Mục tiêu của trang website là làm cho dữ liệu và nghiên cứu có thể truy cập được để từ đó có thể đạt được tiến bộ trong các vấn đề lớn nhất của thế giới",
        h5: "SEE MORE",
        Arrow: 'https://raw.githubusercontent.com/hoangvantuan123/Covid-19-news/main/src/Components/file/svg/Arrow.svg',
        to: '/CoronaVirus'
    },
    {
        id: 2,
        h3: 'vaccines',
        span: ' V2',
        img: 'https://raw.githubusercontent.com/hoangvantuan123/Covid-19-news/main/client/src/Components/file/Images/Image2.png',
        p: "Để chấm dứt đại dịch này, một phần lớn thế giới cần được miễn dịch với vi rút. Cách an toàn nhất để đạt được điều này là tiêm vắc xin.",
        h5: "SEE MORE",
        Arrow: 'https://raw.githubusercontent.com/hoangvantuan123/Covid-19-news/main/src/Components/file/svg/Arrow.svg',
        to: '/Vaccines'
    },

]
console.log('tabelapi ', boxitem)
export default function FooterPages() {
    const delay = 2500;
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === boxitem.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);
    return (
        <div className='  mt-10 pb-6 phone:max-w-full'>
            <Box className='duration-1000 flex carousel-inner relative overflow-hidden phone:max-w-[500px] ipad:max-w-full lg:w-full' >
                {
                    boxitem.map((item) => {
                        return <ListItem key={item.id} className="w-full justify-center m-auto" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}  >
                            <Link to={item.to} className='  items-center gap-16 phone:min-w-full ipad:w-[1000px] lg:min-w-[1250px] justify-center phone:flex-col ipad:flex lg:flex'>
                                <div className='phone:items-center phone:justify-center phone:text-center phone:mb-4'>
                                    <h3 className=' uppercase  font-inria font-bold phone:text-3xl ipad:text-4xl lg:text-5xl  text-tahiti-100' translate="no">
                                        {item.h3}
                                        <span className=' phone:text-xl ipad:text-2xl  lg:text-3xl'>
                                            {item.span}
                                        </span>
                                    </h3>
                                </div>
                                <div >
                                    <img src={item.img} alt="" className='rounded-full  object-cover  phone:m-auto phone:max-w-[250px] phone:min-h-[250px] ipad:max-w-[220px] ipad:min-h-[220px]  lg:max-w-[340px] lg:min-h-[340px]   ' />
                                </div>
                                <div className=' phone:hidden ipad:block  lg:block'>
                                    <p className=' font-inria  font-normal ipad:text-xs lg:text-xl  text-tahiti-100 max-w-[350px]'>
                                        {item.p}
                                    </p>
                                    <h5 className=' font-inter font-semibold text-lg flex  text-[#3E3E3E] mt-4'>
                                        SEE MORE
                                    </h5>
                                </div>

                            </Link>

                        </ListItem>

                    })


                }

            </Box>
        </div>
    )
}
