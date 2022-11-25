import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CardMedia, Typography } from '@mui/material';
import VideoMedia from '../../../file/Videos/video_Covid.mp4'
import { Link } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({

}));
export default function FocusPage() {

    return (
        <Box className='phone:mt-0 phone:flex-col phone:p-2 ipad:flex-col ipad:w-[100%] ipad:h-[100%] lg:w-[1250px] lg:h-[646px] bg-[#FFFF]  rounded-3xl phone:rounded-xl  flex ipad:mt-2 mt-5 p-10 gap-[24px]' >
            <Grid sx={{ width: '100%', flexGrow: 1 }} className="grid relative"  >
                <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 2, sm: 12, md: 12 }}
                >

                    <Grid item xs={6} >
                        <Item sx={{ minHeight: 265, boxShadow: 0, cursor: 'pointer' }} >
                            <Typography sx={{ fontSize: 25, fontWeight: 'bold', textTransform: 'uppercase' }}>
                                Trình khám phá dữ liệu COVID-19
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8, textTransform: 'uppercase', maxWidth: 260 }}>
                                Khám phá sự biến động của đại dịch COVID-19 thông qua các chỉ số và báo cáo nhanh với các chủ đề mà chúng tôi thu thập được.
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6}  >
                        <Item variant="outlined" sx={{ minHeight: 265, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }} >
                            <Link to="/CoronaVirus" >
                                <Typography sx={{ fontSize: 18, fontWeight: 'bold', }} >
                                    Khám phá các nguồn dữ liệu về Coronavirus
                                </Typography>
                                <br />
                                <br />
                                <br />
                                <br />
                                <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8 }} >
                                    Mỗi hồ sơ bao gồm hình ảnh trực quan tương tác, giải thích về các chỉ số được trình bày và chi tiết về nguồn dữ liệu.
                                </Typography>
                            </Link>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item variant="outlined" sx={{ minHeight: 265, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }}>
                            <Link to="/Vaccines" >
                                <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                                    Khám phá các nguồn dữ liệu
                                    về Vaccines
                                </Typography>
                                <br />
                                <br />
                                <br />
                                <br />
                                <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8 }}>
                                    Để chấm dứt đại dịch này, một phần lớn thế giới cần được miễn dịch với vi rút. Cách an toàn nhất để đạt được điều này là tiêm vắc xin.
                                </Typography>
                            </Link>

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item variant="outlined" sx={{ minHeight: 265, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }}>
                            <Link to="/DataExplorer" >
                                <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                                    Trình khám phá dữ liệu của
                                    data-covid-19
                                </Typography>
                                <br />
                                <br />
                                <br />
                                <br />
                                <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8 }}>
                                    Tự do lựa chọn tải xuống các dữ liệu của chúng tôi, với các chủ đề khác nhau, nguồn dữ liệu mà bạn cần.
                                </Typography>
                            </Link>

                        </Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ width: '100%', flexGrow: 1 }} className="grid relative "   >
                <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 2, sm: 12, md: 12 }} >
                    <Grid item xs={6}  >
                        <Item variant="outlined" sx={{ minHeight: 265, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }} >
                            <Link to="/CoronaVirus" >
                                <Typography sx={{ fontSize: 18, fontWeight: 'bold', }} >
                                    Bản đồ vùng dịch COVID-19
                                </Typography>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8 }} >
                                    Bản đồ theo dõi trực quan về các thông tin dịch tễ các ca bệnh COVID-19 của thế giới.
                                </Typography>
                            </Link>
                        </Item>
                    </Grid>
                    <Grid item xs={12} >
                        <video
                            muted
                            autoPlay={"autoplay"}
                            loop={"loop"}
                            playsInline
                            className=' object-cover  rounded-xl max-h-[265px] min-w-full'
                            controls
                        >
                            <source type="video/mp4" src={VideoMedia} />
                        </video>
                    </Grid>



                </Grid>
            </Grid>
        </Box>
    )
}
