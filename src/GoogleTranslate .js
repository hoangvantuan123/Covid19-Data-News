import React, { useEffect } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './GoogleTranslate.css';

function GTranslateFireEvent(a, b) {
    try {
        if (document.createEvent) {
            let c = document.createEvent("HTMLEvents");
            c.initEvent(b, true, true);
            a.dispatchEvent(c)
        }
        else {
            let c = document.createEventObject();
            a.fireEvent('on' + b, c)
        }
    }
    catch (e) {
    }
}
function doGTranslate(a) {
    if (a.value) a = a.value;
    if (a === '') return;
    let b = a.split('|')[1];
    let c;
    let d = document.getElementsByTagName('select');
    for (let i = 0;
        i < d.length;
        i++)if (d[i].className === 'goog-te-combo') c = d[i];
    if (document.getElementById('google_translate_element') === null || document.getElementById('google_translate_element').innerHTML.length === 0 || c.length === 0 || c.innerHTML.length === 0) {
        setTimeout(function () {
            doGTranslate(a)
        }
            , 500)
    }
    else {
        c.value = b;
        GTranslateFireEvent(c, 'change');
        GTranslateFireEvent(c, 'change')
    }
}

export default function GoogleTranslate() {

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
                pageLanguage: "vi",
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
        <div>
            <div id="google_translate_element" className=' hidden '></div>
            <div id="translate-text" className='bg-transparent'></div>
            <ToggleButtonGroup
                sx={{ bgcolor: '#FFFFFF', marginLeft: 1 }}
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="text alignment"
                className=' tablet:hidden'
            >
                <ToggleButton value="VI" sx={{ fontWeight: 600, width: 50, color: '#626D7B', border : 0 }} translate="no" onClick={() => doGTranslate('vi|vi')} >VI</ToggleButton>
                <ToggleButton value="EN" sx={{ fontWeight: 600, width: 50, color: '#626D7B',  border : 0 }} translate="no" onClick={() => doGTranslate('en|en')}>EN</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}
