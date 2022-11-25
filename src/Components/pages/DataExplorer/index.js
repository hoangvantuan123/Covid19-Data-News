import { Box, Container } from '@mui/material'
import React from 'react'
import FooterPage from '../Discoveries/footer'
import BoxItemData from './Box'
import HeaderDataExplorer from './header'

export default function DataExplorer() {
    localStorage.clear();
    return (
        <div>
            <div className='max-w-[1250px]  m-auto justify-center items-center phone:p-2 lg:p-0  ipad:p-2'>
                <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:min-h-[100%] lg:w-[1250px] lg:min-h-[346px] bg-[#FFFF]  rounded-3xl phone:rounded-xl ipad:rounded-xl  ipad:mt-2  p-10 gap-[24px]' >
                    <HeaderDataExplorer />
                </Box>
                <BoxItemData></BoxItemData>
            </div>
            <FooterPage></FooterPage>
        </div>
    )
}
