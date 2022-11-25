import React, { useEffect, useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import * as Realm from "realm-web";
import API_KEY_4 from '../../../../../KEY/key4';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Paper)(({ theme }) => ({

}));


export default function CardDialog() {


    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [download, setDownload] = React.useState([]);
    const [world, setWorld] = React.useState([]);
    /*  */
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
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
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY_4
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const download = await user.functions.getDataCovid19Latest();
                setDownload(download);
                // console.log('[setDownload]', download);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])
    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY_4
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const world = await user.functions.getLocationDate("World");
                setWorld(world);

            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])
    const Date = world[world.length - 1];
    const exportDataJson = () => {
        fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                    JSON.stringify(json)
                )}`;
                const link = document.createElement("a");
                link.href = jsonString;
                link.download = "latest-data-covid19.json";
                link.click();
                setOpen(false);
            })
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen('body')} variant="outlined" sx={{ borderRadius: 2 }}>
                see more
            </Button>
            <Dialog
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                TransitionComponent={Transition}

            >
                <DialogTitle id="scroll-dialog-title" className='uppercase max-w-[500px] pt-2 phone:text-2xl text-4xl  opacity-80 ' sx={{ fontWeight: 'bold', padding: 1 }} >
                    Nhận tất cả số liệu thống kê mới nhất cho tất cả các quốc gia trên thế giới.
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{ padding: 1 }}>
                    <Box>
                        <Box className=' flex justify-between gap-16 phone:flex-col'>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px] text-xs opacity-75 '>
                                    Tập dữ liệu tóm tắt số lượng và thống kê các trường hợp mới nhất về COVID-19 tích lũy của toàn quốc gia trên thế giới.
                                </Typography>
                            </Grid>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px]  opacity-75 '>
                                    Đã cập nhật:
                                    <br />
                                    {Date?.last_updated_date}

                                </Typography>
                                <br />
                                <Typography className='max-w-[300px]  opacity-75 '>
                                    Dữ liệu cung cấp bởi:
                                    <br />
                                    <span>
                                        <a href="https://ourworldindata.org/">ourworldindata.org</a>
                                    </span>
                                </Typography>
                            </Grid>
                        </Box>

                        <Box>
                            <Box>
                                <Typography sx={{ fontSize: 23 }}>
                                    Giới thiệu về tệp dữ liệu
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 2 }}>
                                    <Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12 }} sx={{ padding: 2 }}>
                                        <Grid xs={6}>
                                            <Grid>
                                                <Typography>
                                                    Đã cập nhật:
                                                </Typography>
                                                <Typography className='max-w-[250px] text-[#286DA8] ' sx={{ fontSize: 25, }}>
                                                    {Date?.last_updated_date}
                                                </Typography>
                                            </Grid>
                                            <br />
                                            <Grid>
                                                <Typography>
                                                    Dữ liệu cung cấp bởi
                                                    <br />
                                                    <span>
                                                        <a href="https://ourworldindata.org/">ourworldindata.org</a>
                                                    </span>
                                                </Typography>
                                                <Typography>
                                                    Chủ sở hữu tệp dữ  liệu
                                                    <br />
                                                    <span>
                                                        <a href="https://github.com/owid/covid-19-data">Our World in Data</a>
                                                    </span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={6}>
                                            <Typography>
                                                Chủ đề
                                            </Typography>
                                            <Table sx={{}} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell> Loại</TableCell>
                                                        <TableCell> Covid-19</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    <TableCell >
                                                        Thẻ
                                                    </TableCell>
                                                    <TableCell sx={{ color: '#286DA8' }}>
                                                        Covid-19 , Sức khỏe cộng đồng, thành phố , tỷ lệ nhiễm.
                                                    </TableCell>
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Box>
                            <br />
                            <Box>
                                <Typography sx={{ fontSize: 23 }}>
                                    Có gì trong tệp dữ liệu
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 2 }}>
                                    <Grid container spacing={1}>
                                        <Grid xs={12}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell> Tên cột </TableCell>
                                                        <TableCell> Mô tả </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>

                                                    <TableRow>
                                                        <TableCell >
                                                            iso_code
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                            ISO 3166-1 alpha-3 - mã quốc gia gồm ba chữ cái. Lưu ý rằng các vùng do OWID xác định (ví dụ: các lục địa như 'Châu Âu') có chứa tiền tố 'OWID_'.
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            continent
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8' }}>
                                                            Lục địa của vị trí địa lý.
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            location
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8' }}>
                                                            Vị trí địa lý. Vị trí 'Quốc tế' xem xét các khu vực đặc biệt.
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            last_updated_date
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8' }}>
                                                            Ngày quan sát
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            population
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8' }}>
                                                            Dân số (các giá trị hiện có mới nhất).
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            total_cases
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                            Tổng số trường hợp được xác nhận về COVID-19. Số lượng có thể bao gồm các trường hợp có thể xảy ra, nếu được báo cáo.
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            new_cases
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                            Các trường hợp COVID-19 mới được xác nhận. Số lượng có thể bao gồm các trường hợp có thể xảy ra, nếu được báo cáo. Trong một số trường hợp hiếm hoi mà nguồn của chúng tôi báo cáo sự thay đổi tiêu cực hàng ngày do chỉnh sửa dữ liệu
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell >
                                                            total_deaths
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                            Tổng số ca tử vong do COVID-19. Số lượng có thể bao gồm các trường hợp tử vong có thể xảy ra, nếu được báo cáo.   </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            new_deaths
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                            Những trường hợp tử vong mới được cho là do COVID-19. Số lượng có thể bao gồm các trường hợp tử vong có thể xảy ra, nếu được báo cáo. Trong một số trường hợp hiếm hoi mà nguồn của chúng tôi báo cáo sự thay đổi tiêu cực hàng ngày do chỉnh sửa dữ liệu, chúng tôi đặt số liệu này thành NA.
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            total_tests
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                            Tổng số kiểm tra COVID-19
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell >
                                                            new_tests
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                            Các thử nghiệm mới cho COVID-19 (chỉ được tính cho những ngày liên tiếp)
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Box>
                            <br />
                            <Box>
                                <Typography sx={{ fontSize: 23 }}>
                                    Xem trước bảng(1 phần dữ liệu)
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 2 }}>
                                    <Grid container spacing={1}>
                                        <Grid xs={12}>
                                            <TableContainer component={Paper} sx={{ width: '100%', bgcolor: '#EFEDED', boxShadow: 0 }} translate="no">
                                                <Table sx={{ width: '100%', minHeight: '100%', overflow: 'hidden' }} aria-label="simple table" >
                                                    <Box>

                                                        <TableBody >
                                                            <TableRow sx={{ width: '100%' }} >
                                                                <TableCell sx={{ width: '100%' }} > Tên cột </TableCell>
                                                                <TableCell sx={{ width: '100%' }} > Mô tả </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > iso_code</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.iso_code}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > continent</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.continent}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > location</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.location}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > last_updated_date</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.last_updated_date}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > total_cases</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.total_cases}
                                                                </TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell> Tên cột </TableCell>
                                                                <TableCell> Mô tả </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > total_deaths</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.total_deaths}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > new_deaths</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.new_deaths}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > "total_tests": </TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.total_cases_per_million}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > total_vaccinations</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.total_vaccinations}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > people_vaccinated</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {Date?.people_vaccinated}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>

                                                    </Box>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={exportDataJson} sx={{
                        bgcolor: '#058527', color: '#FFFFFF', width: '100%', height: 50, fontWeight: 'bold', border: 1, borderRadius: 3, ':hover': {
                            bgcolor: '#FFFFFF',
                            color: '#058527',
                            borderColor: '#058527',
                        },
                    }}>Download</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
