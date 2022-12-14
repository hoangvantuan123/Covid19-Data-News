import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Box, CardContent, } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};


BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


function DialogBox() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const exportDataJson = () => {
        fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                    JSON.stringify(json)
                )}`;
                const link = document.createElement("a");
                link.href = jsonString;
                link.download = "vaccinations.json";

                link.click();
            })

    };
    var url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv';
    const exportDataCsv = async (url, vaccinations) => {
        const response = await fetch(url);
        const data = await response.text();
        const blob = new Blob([data], { type: "vaccinations:vaccinations/csv;charset=utf-8," });
        const blobURL = window.URL.createObjectURL(blob);

        // T???o th??? m???i cho t???p t???i xu???ng
        const anchor = document.createElement("a");
        anchor.download = vaccinations;
        anchor.href = blobURL;
        anchor.dataset.downloadurl = ["vaccinations/csv", anchor.download, anchor.href].join(
            ":"
        );
        anchor.click();
        // X??a URL.createObjectURL. Tr??nh duy???t kh??ng n??n l??u tham chi???u v??o t???p.
        setTimeout(() => {
            //?????i v???i Firefox, c???n tr?? ho??n vi???c thu h???i ObjectURL
            URL.revokeObjectURL(blobURL);
        }, 100);
    };

    return (
        <Box className='phone:mt-2'>
            <Button variant="outlined" onClick={handleClickOpen}>
                Download <DownloadRoundedIcon />
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Download
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {/*  <Typography>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Chart
                            <Button sx={{ textTransform: 'none', display: 'flex' }} variant="outlined" >
                                <CardContent>
                                    <CardMedia component="img"
                                        sx={{ width: 151 }}
                                        image="/static/images/cards/live-from-space.jpg"
                                        alt="Live from space album cover"></CardMedia>
                                </CardContent>
                                <CardContent sx={{ textAlign: 'left' }}>
                                    <Typography gutterBottom>
                                        Image (PNG)
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} >
                                        Th??ch h???p cho h???u h???t c??c m???c ????ch s??? d???ng, t????ng th??ch r???ng r??i.
                                    </Typography>
                                </CardContent>
                                <CardContent sx={{ opacity: 0.6 }}>
                                    <DownloadRoundedIcon sx={{ fontSize: 35 }}></DownloadRoundedIcon>
                                </CardContent>
                            </Button>
                            <Button sx={{ textTransform: 'none', marginTop: 1 }} variant="outlined">
                                <CardContent>
                                    <CardMedia component="img"
                                        sx={{ width: 151 }}
                                        image="/static/images/cards/live-from-space.jpg"
                                        alt="Live from space album cover"></CardMedia>
                                </CardContent>
                                <CardContent sx={{ textAlign: 'left' }}>
                                    <Typography gutterBottom>
                                        Vector Graphic (SVG)
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }}>
                                        ????? c?? b???n in ch???t l?????ng cao ho???c ch???nh s???a th??m bi???u ????? trong ph???n m???m ????? h???a.
                                    </Typography>
                                </CardContent>
                                <CardContent sx={{ opacity: 0.6 }}>
                                    <DownloadRoundedIcon sx={{ fontSize: 35 }}></DownloadRoundedIcon>
                                </CardContent>
                            </Button>

                        </BootstrapDialogTitle>
                    </Typography> */}
                    <Box>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Data
                            <Box sx={{ display: "flex", gap: 1 }} className="phone:flex-col" >
                                <Button sx={{ textTransform: 'none', display: 'flex' }} variant="outlined" onClick={exportDataJson}>
                                    <CardContent sx={{ textAlign: 'left' }}>
                                        <Typography gutterBottom>
                                            Full Data <span className='text-[9px]'>(JSON)</span>
                                        </Typography>
                                        <Typography sx={{ fontSize: 8 }}>
                                            T???p tin ?????y ????? ???????c s??? d???ng trong d??? li???u n??y.
                                        </Typography>
                                    </CardContent>
                                    <CardContent sx={{ opacity: 0.6 }}>
                                        <DownloadRoundedIcon sx={{ fontSize: 35 }}></DownloadRoundedIcon>
                                    </CardContent>
                                </Button>
                                <Button sx={{ textTransform: 'none', display: 'flex' }} variant="outlined" onClick={() => exportDataCsv(url, "full_data.csv")}>
                                    <CardContent sx={{ textAlign: 'left' }}>
                                        <Typography gutterBottom>
                                            Full Data <span className='text-[9px]'>(CSV)</span>
                                        </Typography>
                                        <Typography sx={{ fontSize: 8 }}>
                                            T???p tin ?????y ????? ???????c s??? d???ng trong d??? li???u n??y.
                                        </Typography>
                                    </CardContent>
                                    <CardContent sx={{ opacity: 0.6 }}>
                                        <DownloadRoundedIcon sx={{ fontSize: 35 }}></DownloadRoundedIcon>
                                    </CardContent>
                                </Button>
                            </Box>
                        </BootstrapDialogTitle>
                    </Box>
                </DialogContent>

            </Dialog>
        </Box>
    )
}

export default DialogBox