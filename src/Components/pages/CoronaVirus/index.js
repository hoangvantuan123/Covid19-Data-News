import React from 'react'
import Header from './header'
import BackgroundImage from '../../file/Images/khang-the-troi-cho-trungquoc-omicron-2022-02-04-15-05.jpg'
import CountriesUI from '../../countriesUI'
import FooterPages from '../../footer'
import TableUiCoronaVirus from '../../table/TableUiCoronaVirus'
import { Box } from '@mui/material'
import CompareCountry from '../../compareCountry'

export default function CoronaVirus() {
  localStorage.clear();
  window.localStorage.clear();
  return (
    < >


      <div className='max-w-[1250px]   m-auto justify-center items-center'>
        <img src={BackgroundImage} alt="" className='phone:p-2  ipad:p-2 lg:p-0 phone:w-[100%] phone:min-h-[650px] ipad:w-[100%] ipad:h-[100%] lg:w-[1250px] lg:h-[646px] ipad:rounded-xl  rounded-3xl object-cover ' />

      </div>
      <div className='max-w-[1250px] h-full phone:p-2 phone:mt-2 ipad:flex-col ipad:p-2 m-auto justify-center items-center lg:mt-8 ipad:mt-0 text-tahiti-100'>
        <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:h-[100%] lg:w-[1250px] lg:h-[646px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl   ipad:mt-0 mt-5 md:p-2 p-10 gap-[24px]' >
          <Header />
          <br />
          <br />
          <div className='phone:flex-col ipad:flex-col flex'>
            <h2 className='phone:text-xl  max-w-[650px]  relative float-right  font-inter font-semibold text-3xl  text-tahiti-100 uppercase ' >
              Khám phá dữ liệu toàn cầu về nhiễm trùng và tử vong do Covid-19
            </h2>
            <p className='font-inter ipad:text-xs ipad:normal-case ipad:mt-7 ipad:opacity-90 text-lg font-semibold relative float-right  text-tahiti-100 max-w-[500px] m-auto  uppercase '>
              Trang này có một số lượng lớn các biểu đồ về đại dịch. Trong hộp bên dưới, bạn có thể chọn bất kỳ quốc gia nào bạn quan tâm -
              hoặc một số quốc gia, nếu bạn muốn so sánh các quốc gia.
              <br />
              <br />
              Tất cả các biểu đồ trên trang này sau đó sẽ hiển thị dữ liệu cho các quốc gia mà bạn đã chọn.</p>
          </div>
        </Box>
        <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[646px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl   ipad:mt-2 mt-5 md:p-2 p-10 gap-[24px]' >
          <div className='pt-[50px]  '>
            <h2 className=' phone:text-xl phone:mb-4 ipad:text-2xl max-w-[500px] ipad:mb-0 mb-8   font-inter font-semibold text-3xl  uppercase' >
              Chọn quốc gia để hiển thị
              trong tất cả các biểu đồ
            </h2>
          </div>
          <CountriesUI />
        </Box>
        <CompareCountry />
        <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[646px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl    ipad:mt-2 mt-5 md:p-2 p-10 gap-[24px]' >
          <TableUiCoronaVirus></TableUiCoronaVirus>
        </Box>
        <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[446px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl    ipad:mt-2 mt-5 pt-4 gap-[24px]' >
          <FooterPages />
        </Box>
      </div>
    </>
  )
}
