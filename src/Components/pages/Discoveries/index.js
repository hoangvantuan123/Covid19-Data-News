import React from 'react'
import Country from '../../Country'
import World from './world'
import TestMongoDB from '../test'
import FooterPage from './footer'
import Title from './header/Header'
import { Box } from '@mui/material'
import FocusPage from './focus'
import NewsUI from '../../news/newsUI'


export default function Discoveries() {
  localStorage.clear();
  window.localStorage.clear();
  return (
    <div className=" bg-[#F1F1F2]">
      <div className='max-w-[1250px]  m-auto justify-center items-center phone:p-2  ipad:p-2 lg:p-0'>
        <Title />
        <Box className=' phone:flex-col ipad:w-[100%]  ipad:mt-2 ipad:flex-col  lg:flex lg:w-[1250px] lg:h-[546px] bg-[#FFFF]  rounded-3xl phone:rounded-xl  flex  '>
          <World />
          <Country />
        </Box>
        <FocusPage></FocusPage>
        <NewsUI></NewsUI>
      </div>
      <FooterPage />
    </div>
  )
}
