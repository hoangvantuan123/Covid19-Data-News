import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Rules() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
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
                width: 200, fontWeight: 'bold', color: "#3C4E66", borderColor: '#3C4E66', ':hover': {
                    color: '#3C4E66',
                    borderColor: '#3C4E66'
                },
            }}>Điều khoản </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogTitle>
                        Điều khoản để bạn có thể sử dụng nguồn dữ liệu này.
                    </DialogTitle>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        Tất cả các nguồn dữ liệu được tổng hợp từ rất nhiều nguồn khác nhau. Bạn có thể tự do sử dụng cũng như phân phối tạo ra các dự án dự trên các nguồn dữ liệu này, miễn là hãy ghi nguồn và công của người tạo ra nó.
                    </DialogContentText>
                    <br />
                    <DialogContentText>
                        1.Nguồn dữ liệu từ our world in data

                        <br />
                        - Mathieu, E., Ritchie, H., Ortiz-Ospina, E. et al. Cơ sở dữ liệu toàn cầu về tiêm chủng COVID-19. Nat Hum Behav (năm 2021). https://doi.org/10.1038/s41562-021-01122-8
                        <br />
                        - Hasell, J., Mathieu, E., Beltekian, D. et al. Cơ sở dữ liệu xuyên quốc gia về thử nghiệm COVID-19. Dữ liệu khoa học 7 , 345 (2020). https://doi.org/10.1038/s41597-020-00688-8
                    </DialogContentText>
                    <br />
                    <DialogContentText>
                        Mục đích chính tạo ra trang web là có thể đưa ra các thông báo tốt nhất về cách thức hoạt động của các dòng dữ liệu về dịch bệnh nhất là dòng dữ liệu COVID-19.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                   
                </DialogActions>
            </Dialog>
        </div>
    )
}
