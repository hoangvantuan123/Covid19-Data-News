import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import usePagination from '../Pagination'
import { sortBy } from 'lodash';
import { getNewsCountry } from '../../../API/newsCountry';
import { Card, CardMedia, ImageList, ImageListItem, ImageListItemBar, Link, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

export default function NewsUI() {
    const [country, setCountry] = React.useState([]);
    useEffect(() => {
        getNewsCountry().then((res) => {
            console.log('Country', res)
            setCountry(res.data.articles);
            res.data.articles.sort(function (a, b) {
                var c = new Date(a.published_date);
                var d = new Date(b.published_date);
                return d - c;
            });
        }).catch(function (error) {
            console.error(error);
        })
    }, [])
    //Loaij bỏ phần tử đầu tiên trong mảng 
    const deletefirstitem = country.shift();
    /// Xử lý phân trang 
    const PER_PAGE = 20;
    // Xử lý Pagination : Phân trang
    const DATA = usePagination(country, PER_PAGE);
    console.log('tyu', DATA)
    // Lấy phần tử cuối cùng
    const latestData = country[country.length - 1];

    //MUI
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box className='phone:p-2 ipad:w-[100%] ipad:h-[100%] lg:w-[1250px] lg:min-h-[546px] bg-[#FFFF]  rounded-3xl  phone:rounded-xl flex ipad:mt-2 mt-5 p-9 mb-10'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Item sx={{ boxShadow: 0, padding: 0 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>
                                Tin nổi bật
                            </Typography>
                            <Card sx={{ boxShadow: 0, display: 'flex', padding: 0, gap: 3 }} className="phone:flex-col phone:p-0">
                                <Grid sx={{ width: '100%', maxHeight: 450, padding: 0 }} className="phone-w-full phone:p-0">
                                    <Link href={latestData?.link}>
                                        <ImageListItem sx={{ fontSize: 20, padding: 0 }}>
                                            <img
                                                src={latestData?.media}
                                                alt={latestData?.title}
                                                className='w-[100%] rounded-[5px]  overflow-auto'
                                            />
                                            <ImageListItemBar
                                                className="phone:h-auto h-[140px]"
                                                title={latestData?.rights}
                                                subtitle={<span className='phone:text-xs text-xl'>{latestData?.title}</span>}
                                            />
                                        </ImageListItem>
                                    </Link>
                                </Grid>
                                <Grid sx={{ alignContent: 'center', padding: 0 }} className="phone:hidden ipad:hidden ">
                                    <Typography sx={{ maxWidth: 300, fontSize: 15, opacity: 0.6 }} >
                                        {latestData?.summary}
                                    </Typography>
                                </Grid>
                            </Card>

                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item sx={{ boxShadow: 0 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 2 }}>
                                Tình hình dịch cả nước
                            </Typography>

                            <ImageList variant='masonry' cols={matchDownMd ? 1 : 3} gap={8} >
                                {

                                    DATA.currentData().map((item, use) => {
                                        return (

                                            < ImageListItem key={use}
                                                sx={{ padding: 0 }}
                                            >
                                                <img
                                                    className=' overflow-auto'
                                                    src={`${item.media}?w=248&fit=crop&auto=format`}
                                                    srcSet={`${item.media}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={item.title}
                                                    loading="lazy"
                                                />
                                                <Link href={item.link}>
                                                    <ImageListItemBar
                                                        title={item.title}
                                                        sx={{ padding: 0 }}
                                                        subtitle={<span className=''>{item.clean_url}</span>}
                                                    />
                                                </Link>
                                            </ImageListItem>
                                        )
                                    })

                                }

                            </ImageList>
                        </Item>
                    </Grid>

                </Grid>
            </Box>
        </Box >
    )
}


