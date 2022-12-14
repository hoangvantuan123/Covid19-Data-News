import React, { useEffect} from 'react';
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
import API_KEY from '../../../../../KEY';
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

    useEffect(() => {
        async function loadCountry() {
            const REALM_APP_ID = API_KEY
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const countries = await user.functions.getLocationTableVaccines();
                setCountries(countries);
                //console.log('vaccinesMongoDb', countries);
            } catch (err) {
                console.error("Failed to log in", err);
            }
        };
        loadCountry();
    }, [])


    let getDataWorld = [];
    for (let i = 0; i < countries.length; i++) {

        if (countries[i].location === "Vietnam") {

            getDataWorld.push(countries[i]);

        }

    }

    //console.log('da', getDataWorld);
    const lastItem = getDataWorld[getDataWorld.length - 1];
   // console.log('r', lastItem);





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
            JSON.stringify(countries)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "Vaccines-Location.json";
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
                    Nh???n ngu???n th??ng tin v??? c??c lo???i vaccines c???a to??n th??? gi???i.
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{ padding: 1 }}>
                    <Box>
                        <Box className=' flex justify-between gap-16 phone:flex-col'>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px] text-xs opacity-75 '>
                                    T???p d??? li???u n??y l?? th??ng tin v??? c??c lo???i vaccines c?? ??? t???ng qu???c gia tr??n th??? gi???i.
                                </Typography>
                            </Grid>
                            <Grid sx={{ boxShadow: 0 }}>
                                <Typography className='max-w-[300px]  opacity-75 '>
                                    ???? c???p nh???t:
                                    <br />
                                    {lastItem?.last_observation_date}

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
                                                    {lastItem?.last_observation_date}

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
                                                                location
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T??n qu???c gia (ho???c khu v???c trong m???t qu???c gia).
                                                            </TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell >
                                                                last_observation_date
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                Ng??y quan s??t
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                vaccines
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                Danh s??ch c??c v???c xin ???????c qu???n l?? trong n?????c t??nh ?????n th???i ??i???m hi???n t???i.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                source_name
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                T??n ngu???n ????? thu th???p d??? li???u.
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >
                                                                source_website
                                                            </TableCell>
                                                            <TableCell sx={{ color: '#286DA8', maxWidth: 500 }}>
                                                                V??? tr?? web c???a ngu???n. N?? c?? th??? l?? m???t URL chu???n n???u c??c con s??? ???????c b??o c??o nh???t qu??n tr??n m???t trang nh???t ?????nh; n???u kh??ng n?? s??? l?? ngu???n cho ??i???m d??? li???u cu???i c??ng.
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
                                                                <TableCell sx={{ minWidth: '100%' }} > M?? t??? </TableCell>
                                                            </TableRow>
                                                            <TableRow >
                                                                <TableCell > location</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                    {lastItem?.location}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > iso_code</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                {lastItem?.iso_code}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > vaccines</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                {lastItem?.vaccines}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > last_observation_date</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                {lastItem?.last_observation_date}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell > source_name</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                {lastItem?.source_name}
                                                                </TableCell>
                                                            </TableRow>


                                                            <TableRow>
                                                                <TableCell > source_website</TableCell>
                                                                <TableCell sx={{ color: '#286DA8' }}>
                                                                {lastItem?.source_website}
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
