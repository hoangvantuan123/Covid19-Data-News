import React from 'react';
import NewsCoutry from './newsCountry';


export default function News() {

    return (
        <div className=''>
            <div className=' md:p-5 md:mb-0 lg:p-0 mt-20  lg:mb-6'>
                <h2 className='tablet:text-lg  font-inria font-semibold text-4xl text-[#3E3E3E]' >
                Các bài báo mới nhất
                </h2>
            </div>
            <NewsCoutry/>
          
        </div>
    )
}




