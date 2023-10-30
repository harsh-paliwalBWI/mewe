import React from 'react'
import img1 from "../../../images/html-system-websites-concept.svg"
import img2 from "../../../images/html-css-collage-concept-with-person.svg"
import img3 from "../../../images/person-front-computer-working-html 1.svg"
import img4 from "../../../images/representation-user-experience-interface-design-computer.svg"
import img5 from "../../../images/businessman-hold-graph-arrow-positive-growth-icon-pointing-creative-business-chart-with-upward-arrows-financial-business-growth-concept-low-polygonal-increased-sales-increased-value 1.svg"
import img6 from "../../../images/businessman-showing-changes-report 1.svg"
import img7 from "../../../images/programming-background-collage 1.svg"
import img8 from "../../../images/turned-gray-laptop-computer 1.svg"
import img9 from "../../../images/html-css-collage-concept-with-person (1) 1.svg"
import Image from 'next/image'
import FlatIcon from '@/components/flatIcon/flatIcon'

const DummyData=[{imgSrc:img1},{imgSrc:img2},{imgSrc:img3},{imgSrc:img4},{imgSrc:img5},{imgSrc:img6},
    {imgSrc:img7},{imgSrc:img8},{imgSrc:img9}]
const Photos = () => {
  return (
    <div className=' w-full bg-[#F8FAFC] sm:px-8 px-4 sm:pt-14 pt-7'>
    <div className='grid sm:grid-cols-3  grid-cols-1 w-full gap-x-3 gap-y-6'>
        {
            DummyData.map((item:any,idx:number)=>{
                return <div key={idx} className=''><Image src={item.imgSrc} alt='' height={1000} width={1000} className='w-full object-fill'/></div>
            })
        }
    </div>
    <div className='flex justify-center sm:my-10 my-5'>
    <div className='text-center flex justify-center bg-primary w-fit text-white px-10 py-3 rounded-md'>
        <button className='flex items-center gap-3'><FlatIcon className="flaticon-reload"/><h3 className='text-sm tracking-widest font-semibold'>Load More</h3></button></div>
    </div>
    </div>
  )
}

export default Photos