import React from 'react';
import { Link } from 'react-router-dom';


export default function FooterPage() {
    return (
        <div className=' w-full min-h-[386px] bg-[#23232C]  p-3'>
            <div className='max-w-[1250px]  m-auto justify-center items-center' >
                <div className=" uppercase pt-4 font-inter font-bold text-tahiti-200 phone:text-5xl md:text-7xl  lg:text-9xl ">
                    <div className=''>
                        discoveries
                    </div>
                    <div className="phone:ml-[100px] ml-[400px]">
                        Covid-19
                    </div>
                </div>
                <div className=' phone:flex-col md:flex-col  lg:flex justify-between phone:mt-auto md:mt-[-140px] lg:mt-[-200px]'>
                    <div>
                        <ul className='phone:flex-col phone:mb-5 phone:text-xs uppercase font-inter text-base  text-[#FFFFFF]  opacity-70 flex gap-5 '>
                            <li>
                                <Link to='/'>
                                    Discoveries
                                </Link>
                            </li>
                            <li>
                                <Link to='/CoronaVirus'>
                                    CoronaVirus
                                </Link>
                            </li>
                            <li>
                                <Link to='/Vaccines'>
                                    Vaccines
                                </Link>
                            </li>
                            <li>
                                <Link to='/DataExplorer'>
                                    Data Explorer
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className=' font-inria  text-xs text-[#FFFFFF]  font-light opacity-70 max-w-[640px] '>
                        <h4 className=' font-inter text-base uppercase  mb-6'>Trích nguồn:</h4>
                        <ul className=' phone:flex-col flex  mb-6 gap-5'>
                            <li className=' max-w-xs'>
                                Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino, Esteban Ortiz-Ospina, Joe Hasell, Bobbie Macdonald, Diana Beltekian và Max Roser (2020) - "Đại dịch Coronavirus (COVID-19)". Được xuất bản trực tuyến tại OurWorldInData.org. Lấy ra từ: <a href="https://ourworldindata.org/coronavirus">  'https://ourworldindata.org/coronavirus' [Online Resource]</a>
                            </li>
                            <li className='max-w-xs'>
                                Trích dẫn đề xuất: Bảng điều khiển COVID-19 của WHO. Geneva: Tổ chức Y tế Thế giới, 2020. Có sẵn trực tuyến:  <a href=" https://covid19.who.int/"> https://covid19.who.int/</a>
                            </li>
                        </ul>
                       
                    </div>
                </div>
            </div>

        </div>
    )
}
