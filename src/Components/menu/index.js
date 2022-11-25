import * as React from 'react'
import { Link } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';
import MenuResponsiveUI from './responsive';
import GoogleTranslate from '../../GoogleTranslate ';
export default function MenuPages() {
    const [menu, setMenu] = React.useState([])

    const handonChangeMenu = (e, newMenu) => {
        if (newMenu !== null) {
            setMenu(newMenu);
        }
    };
    return (
        <Box className='max-w-[1250px]  m-auto justify-center items-center  lg:p-0' >
            <Box className=" flex justify-between phone:p-2 phone:pb-0 lg:p-0 md:p-2 lg:py-4 max-w-full phone:gap-2 md:gap-2 " >
                <Box className='w-full phone:w-[230px] ipad:w-[300px]' >
                    <Link to='/'>
                        <ToggleButtonGroup
                            value={menu}
                            exclusive
                            onChange={handonChangeMenu}
                        >
                            <ToggleButton
                                value=""
                                sx={{ border: 0, alignContent: 'center', bgcolor: '#FFFFFF', fontWeight: 'bold', color: '#626D7B', justifyContent: 'space-between' }}
                                className="  h-[46.5px] phone:max-w-[230px]  lg:min-w-[375px] ipad:w-[300px] justify-between gap-10 phone:gap-2  "
                                translate="no"
                            >
                                <span>
                                    data-covid-19
                                </span>
                                <span className=' uppercase text-[8px] phone:text-[6px] text-right'>
                                    data
                                    <br />
                                    medical
                                </span>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Link>
                </Box>
                <Box className='block ipad:w-full phone:w-full'>
                    <MenuResponsiveUI className="phone:block"></MenuResponsiveUI>
                </Box>
                <Box className=' phone:hidden  ipad:hidden flex' >
                    <ToggleButtonGroup

                        sx={{ bgcolor: '#FFFFFF' }}
                        value={menu}
                        exclusive
                        onChange={handonChangeMenu}
                        aria-label="text alignment">
                        <Link to="/" translate="no">
                            <ToggleButton value="Home" sx={{ bgcolor: '#FFFFFF', fontWeight: 'bold', color: '#626D7B', width: 150, border: 0 }}>
                                Home
                            </ToggleButton>
                        </Link>
                        <Link to="/Maps" translate="no">
                            <ToggleButton value="PageMaps" sx={{ bgcolor: '#FFFFFF', fontWeight: 'bold', color: '#626D7B', width: 150, border: 0 }}>
                                <Link to="/Maps" translate="no">Maps</Link>
                            </ToggleButton>
                        </Link>
                        <Link to="/CoronaVirus" translate="no">
                            <ToggleButton value="CoronaVirus" sx={{ bgcolor: '#FFFFFF', fontWeight: 'bold', color: '#626D7B', width: 150, border: 0 }}>
                                <Link to="/CoronaVirus" translate="no">CoronaVirus</Link>
                            </ToggleButton>
                        </Link>
                        <Link to="/Vaccines" translate="no" >
                            <ToggleButton value="Vaccines" sx={{ bgcolor: '#FFFFFF', fontWeight: 'bold', color: '#626D7B', width: 150, border: 0 }}>
                                <Link to="/Vaccines" translate="no" >Vaccines</Link>
                            </ToggleButton>
                        </Link>
                        <Link to="/DataExplorer" translate="no" >
                            <ToggleButton value="DataExplorer" sx={{ bgcolor: '#FFFFFF', fontWeight: 'bold', color: '#626D7B', width: 150, border: 0 }}>
                                <Link to="/DataExplorer" translate="no" >Data Explorer</Link>
                            </ToggleButton>
                        </Link>
                    </ToggleButtonGroup>
                    <GoogleTranslate></GoogleTranslate>
                </Box>
            </Box>
        </Box >
    )
}
