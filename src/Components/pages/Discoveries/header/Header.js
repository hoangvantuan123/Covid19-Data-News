import React from 'react'

export default function Title() {
    return (
        <section className=' phone:h-full'>

            <div className="phone:mb-1 lg:mb-5 ">
                <div className=' phone:rounded-xl rounded-3xl  absolute  justify-center max-w-full phone:relative md:relative'>
                    <img className='phone:rounded-xl phone:w-[100%] phone:min-h-[650px] md:w-[100%] md:h-[100%] lg:w-[1250px] lg:h-[646px] rounded-3xl object-cover' src="https://images.unsplash.com/photo-1597440658768-f3ffdf64223c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                    <div className='  phone:w-full  absolute z-20  top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] m-auto justify-center items-center font-inter font-bold' >
                        <div className="phone:w-full  phone:text-2xl md:text-5xl lg:text-7xl text-[#3E3E3E] md:w-[700px] lg:w-[1000px] " >
                            <div className="phone:p-4 phone:pt-0 phone:text-center uppercase pt-4 font-inter font-bold text-tahiti-100  phone:text-5xl md:text-7xl lg:text-9xl ">
                                <div translate="no">
                                    discoveries
                                </div>
                                <div translate="no">
                                    Covid-19
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='phone:absolute phone:mt-4 phone:text-[8px] phone:opacity-95 phone:left-[50%] phone:translate-x-[-50%] phone:translate-y-[-50%] phone:text-center   '>

                            <p className='  ipad:text-[11px]  phone:text-center phone:leading-4  phone:m-0 phone:max-w-[265px] md:max-w-[500px]   lg:mr-0 relative w-[400px] text-right text-base text-[#3C4E66] float-right '>
                                Website này cập nhật liên tục tình hình dịch bệnh do coronavirus (COVID-19) gây ra
                                với tổng quan về các trường hợp và tử vong COVID-19 trên toàn cầu, cáp khu vực và quốc gia, làm nổi bật các dữ liệu và xu hướng quan trọng.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}
