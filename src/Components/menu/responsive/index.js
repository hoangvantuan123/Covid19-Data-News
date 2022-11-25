import React, { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';
import ToggleButton from '@mui/material/ToggleButton';
import { Link } from 'react-router-dom';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';



function GTranslateFireEvent(a, b) {
    try {
        if (document.createEvent) {
            var c = document.createEvent("HTMLEvents");
            c.initEvent(b, true, true);
            a.dispatchEvent(c)
        }
        else {
            var c = document.createEventObject();
            a.fireEvent('on' + b, c)
        }
    }
    catch (e) {
    }
}
function doGTranslate(a) {
    if (a.value) a = a.value;
    if (a === '') return;
    var b = a.split('|')[1];
    var c;
    var d = document.getElementsByTagName('select');
    for (var i = 0;
        i < d.length;
        i++)if (d[i].className === 'goog-te-combo') c = d[i];
    if (document.getElementById('google_translate_element') === null || document.getElementById('google_translate_element').innerHTML.length === 0 || c.length === 0 || c.innerHTML.length === 0) {
        setTimeout(function () {
            doGTranslate(a)
        }
            , 200)
    }
    else {
        c.value = b;
        GTranslateFireEvent(c, 'change');
        GTranslateFireEvent(c, 'change')
    }
}

export default function MenuResponsiveUI() {
    const [alignment, setAlignment] = React.useState([]);

    const handleChange = (event, newAlignment) => {
        // Tránh loại bỏ nút đã chọn 
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                autoDisplay: false
            },
            "google_translate_element"

        );
    };
    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);


    return (
        <Box className=' lg:hidden w-full ' >
            <PopupState variant="popover" popupId="demo-popup-menu" >
                {(popupState) => (
                    <React.Fragment >
                        <ToggleButton variant="contained" {...bindTrigger(popupState)}

                            sx={{ fontWeight: 'bold',  border: 0 ,bgcolor: '#FFFFFF', color: '#626D7B', boxShadow: 0, justifyContent: 'space-between', width: '100%' }}
                            translate="no"
                        >
                            Menu
                            <LinearScaleRoundedIcon />
                        </ToggleButton>
                        <Menu {...bindMenu(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',

                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                        >
                            <MenuItem onClick={popupState.close} >
                                <Link to="/" translate="no">Home</Link>
                            </MenuItem>
                            <MenuItem onClick={popupState.close} >
                                <Link to="/Maps" translate="no">Maps</Link>
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                                <Link to="/CoronaVirus" translate="no">
                                    CoronaVirus</Link>
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                                <Link to="/Vaccines" translate="no" >Vaccines</Link>
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                                <Link to="/DataExplorer" translate="no" >
                                    Data Explorer</Link>
                            </MenuItem>
                            <MenuItem>
                                <ToggleButtonGroup
                                    sx={{ bgcolor: '#FFFFFF', padding: 0, width: '100%'}}
                                    value={alignment}
                                    exclusive
                                    onChange={handleChange}
                                    aria-label="text alignment"
                                >
                                    <ToggleButton value="VI" sx={{ fontWeight: 600, width: '100%', color: '#626D7B' , margin: 0}} translate="no" onClick={() => { doGTranslate('en|vi'); popupState.close() }} >VI</ToggleButton>
                                    <ToggleButton value="EN" sx={{ fontWeight: 600, width: '100%', color: '#626D7B' , margin: 0 }} translate="no" onClick={() => { doGTranslate('vi|en'); popupState.close() }}>EN</ToggleButton>
                                </ToggleButtonGroup>
                            </MenuItem>
                        </Menu>

                    </React.Fragment>
                )}
            </PopupState>
        </Box >
    )
}
