import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import ImageItem1 from '../../../file/Images/BoxItemData1.jpg'
import ImageItem2 from '../../../file/Images/BoxItemData2.jpg'
import DialogPageCorona from '../dialogCorona';
import DialogPageVaccines from '../dialogVaccines';
import Skeleton from 'react-loading-skeleton'
export default function BoxItemData() {
    return (
        <Box
            sx={{ minWidth: '100%', marginTop: 4 }}
        >
            <Box
                sx={{ maxWidth: '100%', minHeight: 490, bgcolor: '#E9E8EE', borderRadius: 4, display: 'flex', gap: 5, marginBottom: 4 }}
                className=" phone:flex-col-reverse  phone:m-0 "
            >
                <CardMedia
                    component="img"
                    sx={{ maxWidth: '50%', minHeight: 490, borderRadius: 4, objectFit: 'cover' }}
                    image={ImageItem1 || <Skeleton />}
                    className="phone:min-w-[100%]"

                />


                <CardContent sx={{ maxWidth: '50%', flex: '1 0 auto' }}

                    className='phone:m-0 phone:mt-0 mt-32 phone:min-w-full'
                >
                    <Typography component="div" variant="h5" className=' uppercase max-w-[300px]' sx={{ fontWeight: 'bold', opacity: 0.8 }}>
                        download bộ dữ liệu
                        covid-19.
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" className=' max-w-[300px]'>
                        Bộ dữ liệu này là sự tổng hợp từ các nguồn khác nhau, và được data-covid-19 tổng hợp lại do đó có thể các nguồn dữ liệu sẽ không được thống nhất.Và đây là quyền truy cập mở và miễn phí cho bất kỳ ai muốn sử dụng nguồn dữ liệu.
                    </Typography>

                    {/*  <Button variant="outlined" sx={{ width: 150, marginTop: 2, fontWeight: 'bold', color: "#3C4E66", borderColor: '#3C4E66', borderRadius: 4 }}>
                        <EastRoundedIcon sx={{ fontSize: 40 }} />
                    </Button> */}
                    <DialogPageCorona></DialogPageCorona>
                </CardContent>
            </Box>
            <Box
                sx={{ maxWidth: '100%', minHeight: 490, bgcolor: '#B6CAE0', borderRadius: 4, display: 'flex', gap: 5, marginBottom: 4 }}
                className=" phone:flex-col-reverse   phone:m-0 "
            >
                <CardMedia
                    component="img"
                    sx={{ maxWidth: '50%', minHeight: 490, borderRadius: 4, objectFit: 'cover' }}
                    image={ImageItem2 || <Skeleton />}
                    className="phone:min-w-[100%]"
                />
                <CardContent sx={{ maxWidth: '50%', flex: '1 0 auto' }}
                    className='phone:m-0 phone:mt-0 mt-32 phone:min-w-full'

                >
                    <Typography component="div" variant="h5" className=' uppercase max-w-[300px]' sx={{ fontWeight: 'bold', opacity: 0.8 }}>
                        download bộ dữ liệu
                        Vaccines.
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" className=' max-w-[300px]'>
                        Bộ dữ liệu này là sự tổng hợp từ các nguồn khác nhau, và được data-covid-19 tổng hợp lại do đó có thể các nguồn dữ liệu sẽ không được thống nhất.Và đây là quyền truy cập mở và miễn phí cho bất kỳ ai muốn sử dụng nguồn dữ liệu.
                    </Typography>


                    <DialogPageVaccines></DialogPageVaccines>
                </CardContent>
            </Box>

        </Box>
    )
}