import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import CountryDialog from './CountryDialog';
import API_KEY from '../../../../../KEY';
import API_KEY_3 from '../../../../../KEY/key3';
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
    const [countries, setCountries] = React.useState([]);
    const [download, setDownload] = React.useState([]);
    const [selectedCountryId, setSelectedCountryId] = React.useState('');
    const [report, setReport] = React.useState([]);
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
            const REALM_APP_ID = API_KEY
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const countries = await user.functions.locations();
                setCountries(countries);
                setSelectedCountryId("Vietnam");
                console.log('[TestGetAllCountrytest]', countries);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])

    const handleOnChange = React.useCallback((e) => {
        setSelectedCountryId(e.target.value);
    }, []);


    useEffect(() => {
        if (selectedCountryId) {
            const selectedCountry = countries.find(
                (location) => location.location === selectedCountryId.toString()
            );
            console.log('test1', selectedCountry);
            async function loadCountry() {
                const REALM_APP_ID = API_KEY_3
                const app = new Realm.App({ id: REALM_APP_ID });
                const credentials = Realm.Credentials.anonymous();
                try {
                    const user = await app.logIn(credentials);
                    const countries = await user.functions.getHistoricalACountry(selectedCountry.location);
                    console.log('[TestGetAllCountry12]', countries);
                    setReport(countries);
                } catch (err) {
                    console.error("Failed to log in", err);
                }
            };
            loadCountry();
        }
    }, [selectedCountryId, countries]);
    console.log('report ', report)



    const exportDataJson = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(report)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "latest-data-covid19.json";
        link.click();
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const boxitem = useMemo(() => {
        if (report && report.length) {
            const latestData = report[report.length - 1];
            return [
                {
                    count1: latestData.date,
                    type: 'Date'
                },
                {
                    count2: latestData.iso_code,
                    type: 'iso_code'
                },
                {
                    count3: latestData.continent,
                    type: 'continent'
                },
                {
                    count4: latestData.location,
                    type: 'location'
                },

                {
                    count5: latestData.total_cases,
                    type: 'total_cases'
                },
                {
                    count6: latestData.total_deaths,
                    type: 'total_cases'
                },
                {
                    count7: latestData.new_deaths,
                    type: 'total_cases'
                },
                {
                    count8: latestData.total_tests,
                    type: 'total_tests'
                },
                {
                    count9: latestData.total_vaccinations,
                    type: 'total_vaccinations'
                },
                {
                    count10: latestData.people_vaccinated,
                    type: 'people_vaccinated'
                },

            ]
        }
        return [];
    }, [report])

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
                    Nhận thống kê lịch sử cho một quốc gia trên thế giới.
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{ padding: 1 }}>
                    <Box>
                        <Box className=' flex justify-between gap-16 phone:flex-col'>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px] text-xs opacity-75 '>
                                    Tập dữ liệu thống kê lịch sử từ trước đến nay về biến chủng COVID-19 cho một gia trên thế giới.
                                    <span className='text-[9px]'>
                                        ( Giá trị mặc định để tải xuống "VIỆT NAM" bạn của thể tải xuống các thành thành phố khác trong phần SEE MORE)
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px]  opacity-75 '>
                                    Đã cập nhật:
                                    <br />
                                    {
                                        boxitem.map((name) => {
                                            return (
                                                <span key={name}>
                                                    {name.count1}
                                                </span>
                                            )
                                        })
                                    }
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
                                                    {
                                                        boxitem.map((name) => {
                                                            return (
                                                                <span key={name}>
                                                                    {name.count1}
                                                                </span>
                                                            )
                                                        })
                                                    }
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
                                    Chọn quốc gia để xem dữ liệu
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 2 }}>

                                    <CountryDialog
                                        handleOnChange={handleOnChange}
                                        countries={countries}
                                        value={selectedCountryId}
                                    >

                                    </CountryDialog>
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
                                            <TableContainer component={Paper} sx={{ width: '100%', bgcolor: '#EFEDED', boxShadow: 0 }} >
                                                <Table sx={{ Width: '100%', Height: '500px', overflow: 'hidden' }} size="small" aria-label="a dense table">

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
                                                                date
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
                                                        <TableRow>
                                                            <TableCell >
                                                                aged_65_older
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                Tỷ lệ dân số từ 65 tuổi trở lên, khả dụng vào năm gần đây nhất
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                aged_70_older
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                Tỷ trọng dân số từ 70 tuổi trở lên vào năm 2015
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                cardiovasc_death_rate
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                Tỷ lệ tử vong do bệnh tim mạch năm 2017 (số người chết hàng năm trên 100.000 người)
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

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
                                                <Table sx={{ width: '100%', minHeight: '100%', overflow: 'hidden' }} size="small" aria-label="a dense table" >
                                                    <Box>

                                                        <TableBody >
                                                            <TableRow sx={{ width: '100%' }} >
                                                                <TableCell sx={{ width: '100%' }} > Tên cột </TableCell>
                                                                <TableCell sx={{ width: '100%' }} > Mô tả </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > iso_code</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count2}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > continent</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count3}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > location</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count4}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > last_updated_date</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count1}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > total_cases</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count5}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Tên cột </TableCell>
                                                                <TableCell> Mô tả </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > total_deaths</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count6}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > new_deaths</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count7}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell >total_tests </TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count8}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > total_vaccinations</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count9}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > people_vaccinated</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count10}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
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
