import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { Box, Card, DialogContent, Grid, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import ImageItem1 from '../../../file/Images/BoxItemData1.jpg'
import Paper from '@mui/material/Paper';
import DataProcessingCard1 from './DataProcessingCard1'
import DataProcessingCard2 from './DataProcessingCard2';
import DataProcessingCard3 from './DataProcessingCard3';
import DataProcessingCard6 from './DataProcessingCard6';
import DataProcessingCard4 from './DataProcessingCard4';
import DataProcessingCard5 from './DataProcessingCard5';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Paper)(({ theme }) => ({

}));

export default function DialogPageCorona() {
    localStorage.clear();
    window.localStorage.clear();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xl');
    const [scroll, setScroll] = React.useState('paper');


    const handleClose = () => {
        setOpen(false);
    };
    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button onClick={handleClickOpen('body')} variant="outlined" sx={{
                width: 150, marginTop: 2, fontWeight: 'bold', color: "#3C4E66", borderColor: '#3C4E66', borderRadius: 4, ':hover': {
                    color: '#3C4E66',
                    borderColor: '#3C4E66'
                },
            }}>
                <EastRoundedIcon sx={{ fontSize: 40 }} />

            </Button>

            <Dialog
                maxWidth={maxWidth}
                open={open}
                scroll={scroll}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    style: { borderRadius: 20 },
                }}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <Card sx={{ display: 'flex', boxShadow: 0, borderRadius: 0 }} >
                    <ImageListItem >
                        <img src={ImageItem1} alt="" loading="lazy"
                            className='object-cover'
                        />
                        <ImageListItemBar
                            sx={{
                                background: 'none'
                            }}
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon sx={{ fontSize: 40 }} />
                                </IconButton>
                            }
                            actionPosition="right"

                        />

                    </ImageListItem>

                </Card>
                <Box className=' phone:p-2 p-7'>
                    <Box>
                        <Button variant="outlined" disabled sx={{ width: 150, borderRadius: 8, fontWeight: 'bold' }}>
                            Download
                        </Button>
                        <h3 className=' uppercase max-w-[430px] pt-2 phone:text-2xl text-4xl font-bold opacity-80'>
                            Trình khám dữ liệu
                            covid-19.
                        </h3>
                    </Box>
                    <Box className='mt-10'>
                        <Grid sx={{ minWidth: '100%', flexGrow: 1 }} className="grid relative"  >
                            <Grid container spacing={5} columns={{ xs: 2, sm: 2, md: 12 }}
                            >

                                <Grid item xs={3} >
                                    <Item variant="outlined" sx={{ minHeight: 325, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }} >
                                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', minHeight: 82 }} >
                                            Nhận tất cả số liệu thống kê mới nhất cho tất cả các quốc gia trên thế giới.
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8, minHeight: 98 }} >
                                            Tập dữ liệu tóm tắt số lượng và thống kê các trường hợp mới nhất COVID-19 tích lũy của toàn quốc gia trên thế giới.
                                        </Typography>
                                        <br />
                                        <DataProcessingCard1>
                                        </DataProcessingCard1>
                                    </Item>
                                </Grid>
                                <Grid item xs={3} >
                                    <Item variant="outlined" sx={{ minHeight: 325, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }}>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', minHeight: 82 }}>
                                            Nhận thống kê lịch sử cho một quốc gia trên thế giới.
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8, minHeight: 98 }}>
                                            Tập dữ liệu thống kê lịch sử từ trước đến nay về biến chủng COVID-19 cho một gia trên thế giới.
                                            <span className='text-[9px]'>
                                                ( Giá trị mặc định để tải xuống "VIỆT NAM" bạn của thể tải xuống các thành thành phố khác trong phần SEE MORE)
                                            </span>
                                        </Typography>
                                        <br />
                                        <DataProcessingCard2></DataProcessingCard2>
                                    </Item>
                                </Grid>
                                <Grid item xs={3} >
                                    <Item variant="outlined" sx={{ minHeight: 325, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }}>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', minHeight: 82 }}>
                                            Nhận thống kê về tổng số lượng tử vong trên toàn thế giới.
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8, minHeight: 98 }}>
                                            Tập dữ liệu thống kê số lượng tử vong của toàn quốc gia từ trước đến nay.

                                        </Typography>
                                        <br />
                                        <DataProcessingCard3 />
                                    </Item>
                                </Grid>

                                <Grid item xs={3} >
                                    <Item variant="outlined" sx={{ minHeight: 325, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }}>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', minHeight: 82 }}>
                                            Nhận thống kê về tổng số ca nhiễm trên toàn thế giới.
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8, minHeight: 98 }}>
                                            Tập dữ liệu thống kê số lượng ca nhiễm của toàn quốc gia từ trước đến nay.
                                            
                                        </Typography>
                                        <br />
                                        <DataProcessingCard4></DataProcessingCard4>
                                    </Item>
                                </Grid>

                                <Grid item xs={3} >
                                    <Item variant="outlined" sx={{ minHeight: 325, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }}>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', minHeight: 82 }}>
                                            Nhận thống kê về các ca nhiễm mới nhất trên toàn thế giới.
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8, minHeight: 98 }}>
                                            Tập dữ liệu thống kê số lượng các ca nhiễm mới nhất của toàn quốc gia.
                                           
                                        </Typography>
                                        <br />
                                        <DataProcessingCard5></DataProcessingCard5>
                                    </Item>
                                </Grid>
                                <Grid item xs={3} >
                                    <Item variant="outlined" sx={{ minHeight: 325, bgcolor: '#F1F1F2', borderRadius: 3, boxShadow: 0, padding: 2, cursor: 'pointer' }}>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', minHeight: 82 }}>
                                            Nhận thống kê về các ca tử vong mới nhất trên toàn thế giới.
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography sx={{ fontSize: 13, fontWeight: 'bold', opacity: 0.8, minHeight: 98 }}>
                                            Tập dữ liệu thống kê số lượng các ca tử vong của toàn quốc gia.
                                           
                                        </Typography>
                                        <br />
                                        <DataProcessingCard6 />
                                    </Item>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Dialog>
        </div >
    )
}
