import React, { useEffect, useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import * as Realm from "realm-web";
import { sortBy } from 'lodash';
import { getVaccineData } from '../../../../../API';
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
    const [vaccines, setVaccine] = React.useState([]);
    const [selectedCountryId, setSelectedCountryId] = React.useState('');
    useEffect(() => {
        getVaccineData().then((res) => {
            const { data } = res;
            const vaccines = sortBy(data, 'country');
            setVaccine(vaccines);
            setSelectedCountryId('Vietnam');
        })
    }, []);
    console.log('hehe', vaccines.selectedCountryId)


    let getDataWorld = [];
    for (let i = 0; i < vaccines.length; i++) {

        if (vaccines[i].country === "Vietnam") {

            getDataWorld.push(vaccines[i].data);

        }

    }

    // console.log('da', getDataWorld);
    const lastItem = getDataWorld[getDataWorld.length - 1];
    console.log('r', lastItem);

    const boxitem = useMemo(() => {
        if (lastItem && lastItem.length) {
            const latestData = lastItem[lastItem.length - 1];
            return [
                {
                    count: latestData.date,
                    type: 'date'
                },
                {
                    count2: latestData.daily_people_vaccinated,
                    type: 'daily_people_vaccinated'
                },
                {
                    count3: latestData.daily_people_vaccinated_per_hundred,
                    type: 'daily_people_vaccinated_per_hundred'
                },
                {
                    count4: latestData.daily_vaccinations,
                    type: 'daily_vaccinations'
                },
                {
                    count5: latestData.daily_vaccinations_per_million,
                    type: 'daily_vaccinations_per_million'
                },
                {
                    count6: latestData.people_fully_vaccinated,
                    type: 'people_fully_vaccinated'
                },
                {
                    count7: latestData.people_vaccinated,
                    type: 'people_vaccinated'
                },
                {
                    count8: latestData.people_vaccinated_per_hundred,
                    type: 'people_vaccinated_per_hundred'
                },
                {
                    count9: latestData.total_vaccinations,
                    type: 'total_vaccinations'
                },
                {
                    count10: latestData.total_vaccinations_per_hundred,
                    type: 'total_vaccinations_per_hundred'
                },


            ];
        }
        return [];
    }, [lastItem]);

    const handleOnChange = React.useCallback((e) => {
        setSelectedCountryId(e.target.value);
    }, []);

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


    const exportDataJson = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(vaccines)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "Vaccines.json";
        link.click();
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
                    Nh???n th???ng k?? v??? c??c ca t??? vong m???i nh???t tr??n to??n th??? gi???i.
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{ padding: 1 }}>
                    <Box>
                        <Box className=' flex justify-between gap-16 phone:flex-col'>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px] text-xs opacity-75 '>
                                    T???p d??? li???u th???ng k?? s??? l?????ng c??c ca t??? vong c???a to??n qu???c gia.

                                </Typography>
                            </Grid>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px]  opacity-75 '>
                                    ???? c???p nh???t:
                                    <br />
                                    {
                                        boxitem.map((item, res) => {
                                            return <span key={res} >
                                                {item.count}
                                            </span>
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
                                                    {/*  {latestData?.date} */}
                                                    {
                                                        boxitem.map((item, res) => {
                                                            return <span key={res} >
                                                                {item.count}
                                                            </span>
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
                                                        Covid-19, S???c kh???e c???ng ?????ng, th??nh ph???, vaccines,......
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
                                    C?? g?? trong t???p d??? li???u
                                </Typography>
                                <Card sx={{ bgcolor: '#EFEDED', boxShadow: 0, padding: 1 }}>
                                    <Grid container spacing={1}>
                                        <Grid xs={12}>
                                            <TableContainer component={Paper} sx={{ width: '100%', bgcolor: '#EFEDED', boxShadow: 0 }} >
                                                <Table sx={{ width: '100%', height: '500px', overflow: 'hidden' }} size="small" aria-label="a dense table">
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
                                                                Country
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T??n qu???c gia (ho???c khu v???c trong m???t qu???c gia).
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                location
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                V??? tr?? ?????a l??. V??? tr?? 'Qu???c t???' xem x??t c??c khu v???c ?????c bi???t.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                date
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                Ng??y quan s??t
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                total_vaccinations
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T???ng s??? li???u ???? d??ng. ????y ???????c t??nh l?? m???t li???u duy nh???t, v?? c?? th??? kh??ng b???ng t???ng s??? ng?????i ???????c ti??m ch???ng, t??y thu???c v??o ch??? ????? li???u l?????ng c??? th??? (v?? d???: nh???ng ng?????i ???????c ti??m nhi???u li???u)
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                total_vaccinations_per_hundred
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                total_vaccinationstr??n 100 ng?????i trong t???ng d??n s???.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                daily_people_vaccinated
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                S??? ng?????i h??ng ng??y nh???n ???????c li???u v???c xin COVID-19 ?????u ti??n (7 ng??y l??m m???n).
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                daily_people_vaccinated_per_hundred
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                daily_people_vaccinatedtr??n 100 ng?????i trong t???ng d??n s??? c??? n?????c.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                daily_vaccinations
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                li???u m???i d??ng m???i ng??y (7 ng??y l??m m???n). ?????i v???i c??c qu???c gia kh??ng b??o c??o d??? li???u h??ng ng??y, ch??ng t??i gi??? ?????nh r???ng li???u l?????ng thay ?????i nh?? nhau tr??n c?? s??? h??ng ng??y trong b???t k??? kho???ng th???i gian n??o m?? kh??ng c?? d??? li???u n??o ???????c b??o c??o.
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
                                            <TableContainer component={Paper} sx={{ width: '100%', bgcolor: '#EFEDED', boxShadow: 0 }} >
                                                <Table sx={{ width: '100%', minHeight: '100%', overflow: 'hidden' }} size="small" aria-label="a dense table" >
                                                    <Box>

                                                        <TableBody >
                                                            <TableRow sx={{ width: '100%' }} >
                                                                <TableCell sx={{ width: '100%' }} > T??n c???t </TableCell>
                                                                <TableCell sx={{ width: '100%' }} > M?? t??? </TableCell>
                                                            </TableRow>
                                                            <TableRow >
                                                                <TableCell > daily_people_vaccinated</TableCell>
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
                                                                <TableCell > daily_people_vaccinated_per_hundred</TableCell>
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
                                                                <TableCell > daily_vaccinations</TableCell>
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
                                                                <TableCell > daily_vaccinations_per_million</TableCell>
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
                                                                <TableCell > people_fully_vaccinated</TableCell>
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
                                                                <TableCell > date</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {
                                                                        boxitem.map((name) => {
                                                                            return (
                                                                                <span key={name}>
                                                                                    {name.count}
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
                                                                                    {name.count7}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > people_vaccinated_per_hundred</TableCell>
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
                                                            <TableRow  >
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
                                                                <TableCell > total_vaccinations_per_hundred</TableCell>
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
