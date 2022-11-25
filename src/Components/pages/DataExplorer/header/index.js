import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Rules from '../Rules'

export default function HeaderDataExplorer() {
    return (
        <Box className=' mt-10'>
            <Typography className='font-inter uppercase max-w-xs ' sx={{ fontSize: 25, fontWeight: 'bold', opacity: 0.8 }}>
                Trình khám phá  dữ liệu của
                data-covid-19
            </Typography>
            <Typography className='max-w-xs opacity-80'>
                Tự do lựa chọn tải xuống các dữ liệu của chúng tôi, với các chủ đề khác nhau, nguồn dữ liệu mà bạn cần.
            </Typography>
            <br></br>
            <Rules>
            </Rules>
        </Box>
    )
}
