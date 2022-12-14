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
                    Nh???n th???ng k?? l???ch s??? cho m???t qu???c gia tr??n th??? gi???i.
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{ padding: 1 }}>
                    <Box>
                        <Box className=' flex justify-between gap-16 phone:flex-col'>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px] text-xs opacity-75 '>
                                    T???p d??? li???u th???ng k?? l???ch s??? t??? tr?????c ?????n nay v??? bi???n ch???ng COVID-19 cho m???t gia tr??n th??? gi???i.
                                    <span className='text-[9px]'>
                                        ( Gi?? tr??? m???c ?????nh ????? t???i xu???ng "VI???T NAM" b???n c???a th??? t???i xu???ng c??c th??nh th??nh ph??? kh??c trong ph???n SEE MORE)
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px]  opacity-75 '>
                                    ???? c???p nh???t:
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
                                    D??? li???u cung c???p b???i:
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
                                    Gi???i thi???u v??? t???p d??? li???u
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 2 }}>
                                    <Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12 }} sx={{ padding: 2 }}>
                                        <Grid xs={6}>
                                            <Grid>
                                                <Typography>
                                                    ???? c???p nh???t:
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
                                                    D??? li???u cung c???p b???i
                                                    <br />
                                                    <span>
                                                        <a href="https://ourworldindata.org/">ourworldindata.org</a>
                                                    </span>
                                                </Typography>
                                                <Typography>
                                                    Ch??? s??? h???u t???p d???  li???u
                                                    <br />
                                                    <span>
                                                        <a href="https://github.com/owid/covid-19-data">Our World in Data</a>
                                                    </span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={6}>
                                            <Typography>
                                                Ch??? ?????
                                            </Typography>
                                            <Table sx={{}} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell> Lo???i</TableCell>
                                                        <TableCell> Covid-19</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    <TableCell >
                                                        Th???
                                                    </TableCell>
                                                    <TableCell sx={{ color: '#286DA8' }}>
                                                        Covid-19 , S???c kh???e c???ng ?????ng, th??nh ph??? , t??? l??? nhi???m.
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
                                    Ch???n qu???c gia ????? xem d??? li???u
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
                                    C?? g?? trong t???p d??? li???u
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 2 }}>
                                    <Grid container spacing={1}>
                                        <Grid xs={12}>
                                            <TableContainer component={Paper} sx={{ width: '100%', bgcolor: '#EFEDED', boxShadow: 0 }} >
                                                <Table sx={{ Width: '100%', Height: '500px', overflow: 'hidden' }} size="small" aria-label="a dense table">

                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell> T??n c???t </TableCell>
                                                            <TableCell> M?? t??? </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        <TableRow>
                                                            <TableCell >
                                                                iso_code
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                ISO 3166-1 alpha-3 - m?? qu???c gia g???m ba ch??? c??i. L??u ?? r???ng c??c v??ng do OWID x??c ?????nh (v?? d???: c??c l???c ?????a nh?? 'Ch??u ??u') c?? ch???a ti???n t??? 'OWID_'.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                continent
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8' }}>
                                                                L???c ?????a c???a v??? tr?? ?????a l??.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                location
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8' }}>
                                                                V??? tr?? ?????a l??. V??? tr?? 'Qu???c t???' xem x??t c??c khu v???c ?????c bi???t.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                date
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8' }}>
                                                                Ng??y quan s??t
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                population
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8' }}>
                                                                D??n s??? (c??c gi?? tr??? hi???n c?? m???i nh???t).
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                total_cases
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T???ng s??? tr?????ng h???p ???????c x??c nh???n v??? COVID-19. S??? l?????ng c?? th??? bao g???m c??c tr?????ng h???p c?? th??? x???y ra, n???u ???????c b??o c??o.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                new_cases
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                C??c tr?????ng h???p COVID-19 m???i ???????c x??c nh???n. S??? l?????ng c?? th??? bao g???m c??c tr?????ng h???p c?? th??? x???y ra, n???u ???????c b??o c??o. Trong m???t s??? tr?????ng h???p hi???m hoi m?? ngu???n c???a ch??ng t??i b??o c??o s??? thay ?????i ti??u c???c h??ng ng??y do ch???nh s???a d??? li???u
                                                            </TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell >
                                                                total_deaths
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T???ng s??? ca t??? vong do COVID-19. S??? l?????ng c?? th??? bao g???m c??c tr?????ng h???p t??? vong c?? th??? x???y ra, n???u ???????c b??o c??o.   </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                new_deaths
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                Nh???ng tr?????ng h???p t??? vong m???i ???????c cho l?? do COVID-19. S??? l?????ng c?? th??? bao g???m c??c tr?????ng h???p t??? vong c?? th??? x???y ra, n???u ???????c b??o c??o. Trong m???t s??? tr?????ng h???p hi???m hoi m?? ngu???n c???a ch??ng t??i b??o c??o s??? thay ?????i ti??u c???c h??ng ng??y do ch???nh s???a d??? li???u, ch??ng t??i ?????t s??? li???u n??y th??nh NA.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                total_tests
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T???ng s??? ki???m tra COVID-19
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                new_tests
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                C??c th??? nghi???m m???i cho COVID-19 (ch??? ???????c t??nh cho nh???ng ng??y li??n ti???p)
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                aged_65_older
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T??? l??? d??n s??? t??? 65 tu???i tr??? l??n, kh??? d???ng v??o n??m g???n ????y nh???t
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                aged_70_older
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T??? tr???ng d??n s??? t??? 70 tu???i tr??? l??n v??o n??m 2015
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                cardiovasc_death_rate
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T??? l??? t??? vong do b???nh tim m???ch n??m 2017 (s??? ng?????i ch???t h??ng n??m tr??n 100.000 ng?????i)
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
                                    Xem tr?????c b???ng(1 ph???n d??? li???u)
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 2 }}>
                                    <Grid container spacing={1}>
                                        <Grid xs={12}>
                                            <TableContainer component={Paper} sx={{ width: '100%', bgcolor: '#EFEDED', boxShadow: 0 }} translate="no">
                                                <Table sx={{ width: '100%', minHeight: '100%', overflow: 'hidden' }} size="small" aria-label="a dense table" >
                                                    <Box>

                                                        <TableBody >
                                                            <TableRow sx={{ width: '100%' }} >
                                                                <TableCell sx={{ width: '100%' }} > T??n c???t </TableCell>
                                                                <TableCell sx={{ width: '100%' }} > M?? t??? </TableCell>
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
                                                                <TableCell> T??n c???t </TableCell>
                                                                <TableCell> M?? t??? </TableCell>
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
