<div className=' font-inter'>
                {/*  <img src={Map} alt="WorldMap" className='m-auto float-right ' /> */}
                <Box className=' tablet:p-0 tablet:pt-[20pt] tablet:min-h-[500px] lg:min-w-[100%] lg:min-h-[750px] bg-hero-pattern bg-cover bg-no-repeat  pt-28'>
                    <div className=' tablet:flex-col flex justify-around items-center m-auto'>
                        <div className=' bg-[#E9E8EE] tablet:max-w-full tablet:max-h-[100px] w-[310px] h-[130px] relative rounded-[20px]'>
                            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[260px] text-center tablet:text-[12px]'>
                                Tổng số ca nhiễm trùng
                                <h5>
                                    {
                                        world.map(item => {
                                            return <span key={item} className='text-[#286DA8] tablet:text-2xl text-4xl'>
                                                {item.TotalCases}
                                            </span>
                                        })
                                    }
                                </h5>
                            </div>
                        </div>
                        <div className=' bg-[#E9E8EE]  tablet:max-w-full tablet:max-h-[100px] w-[310px] h-[130px] relative rounded-[20px] mt-10'>
                            <div className=' tablet:text-[12px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[260px] text-center'>
                                Số người chết
                                <h5>
                                    {
                                        world.map(item => {
                                            return <span key={item} className='text-[#D75F24] tablet:text-2xl  text-4xl'>
                                                {item.TotalDeaths}
                                            </span>
                                        })
                                    }
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className=' bg-[#E9E8EE]  tablet:max-w-full tablet:max-h-[100px] w-[310px] h-[130px] relative rounded-[20px]  tablet:mt-10 md:mt-20 lg:mt-28 justify-around items-center m-auto '>
                        <div className='  tablet:text-[12px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[260px] text-center'>
                            Tổng số lần khôi phục
                            <h5>
                                {
                                    world.map(item => {
                                        return <span key={item} className='text-[#7BB224] tablet:text-2xl text-4xl'>
                                            {item.TotalRecovered}
                                        </span>
                                    })
                                }
                            </h5>
                        </div>
                    </div>
                </Box>

            </div>