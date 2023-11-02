"use client"
import React,{useRef} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FlatIcon from '../flatIcon/flatIcon';
import premiumImg from "../../images/premium 2.svg"
import premiumImg1 from "../../images/premium 1.svg"
import premiumImg2 from "../../images/premium 2 (2).svg"
import premiumImg4 from "../../images/blue grp.svg"
import checkImg from "../../images/Vector 37.svg"
import blackCheck from "../../images/Vector 38.svg"
import Image from 'next/image'

const PromotedBusinessSlider = () => {
    const slider = useRef<any>(null);

    const data=[{text:"Neque porro quisquam est"},
    {text:"Excepteur sint occaecat cupidatat"},
    {text:"Voluptate velit esse quam nihil molestiae"},
    {text:"Qui dolorem ipsum quia dolor sit amet"},
    {text:"Ut enim ad minima veniam, quis nostrum"}]
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        //   dots: true,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        //   dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        //   dots: true,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        //   dots: true
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        //   dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  const arrowButtonClass =
  "absolute top-0 bottom-0 my-auto bg-[#fef8fb] w-7 h-7 block text-white cursor-pointer z-20";
  return (
    <div className=' md:hidden block'>
        <div className="flex justify-center items-center relative lg:mt-5   ">
              <div className="">
                <button
                  className={`${arrowButtonClass} -left-4  flex items-center justify-center `}
                  onClick={() => slider.current?.slickPrev()}
                >
                  <FlatIcon className="flaticon-down-right-2 text-secondary text-xl font-bold rotate-180"/>

                  {/* L */}
                </button>
              </div>

              <div className="back h-auto ">
              {/* <div className="w-[50%] h-auto border border-[red] "> */}

                <div className="w-[95vw] lg:w-[45vw]    h-auto">
                  <Slider
                    ref={slider}
                    {...settings}
                    className="h-fit"
                    dotsClass={`slick-dots `}
                    arrows={true}
                    nextArrow={<></>}
                    prevArrow={<></>}
                    draggable={true}
                  >
                    
{/* first slide start */}
<div className='w-[100%] rounded-tl-xl rounded-tr-xl '>
            <div className='w-full h-[18px] bg-[#A6D6BF] rounded-tl-xl rounded-tr-xl'></div>
            <div className='bg-[#fffdf3] py-5 px-5'>
            <div className='flex items-center justify-between'>
                <div><Image src={premiumImg2} alt=''/></div>
                <div><FlatIcon className="flaticon-help text-[#a1a099] text-2xl"/></div>
            </div>
            <h1 className='font-bold xl:text-lg text-sm my-3'>BASIC</h1>
            <div className='text-[#a1a099] xl:text-lg text-base  '><h2>Duis aute irure dolor in reprehenderit in <br />voluptate velit esse cillum dolore.</h2></div>
           <div className='flex flex-col gap-2 my-5'>
            {data.map((item:any,idx:number)=>{
                return  <div key={idx} className='flex items-center gap-2'>
                <div className='sm:h-[20px] h-[18px] sm:w-[20px] w-[18px] rounded-full flex items-center justify-center bg-[#A6D6BF]'><Image src={blackCheck} alt=''/></div>
                <p className='text-[#a1a099]  xl:text-base text-sm'>{item.text}</p>
            </div>
            })}
            </div>
            <div className='flex items-end'>
                <h2 className='xl:text-xl font-bold text-lg'>Rs. 999/</h2>
                <p className='text-[#a1a099] text-xs font-semibold'>year</p>
            </div>
           <div className='text-center bg-[#A6D6BF] py-3  mt-5 font-bold xl:text-base text-sm'><button>Get Started!</button></div>
           </div>
        </div>
{/* first slide end */}
        {/* second slide  start*/}
        <div className='w-[100%] rounded-tl-xl rounded-tr-xl '>
            <div className='w-full h-[18px] bg-[#4B647E] rounded-tl-xl rounded-tr-xl'></div>
            <div className='bg-[#fffdf3] py-5 px-5'>
            <div className='flex items-center justify-between'>
                <div><Image src={premiumImg} alt=''/></div>
                <div><FlatIcon className="flaticon-help text-[#a1a099] text-3xl"/></div>
            </div>
            <h1 className='font-bold xl:text-xl text-base my-3'>STANDARD</h1>
            <div className='text-[#a1a099] xl:text-lg text-base '><h2>Duis aute irure dolor in  reprehenderit in <br /> voluptate velit esse cillum dolore.</h2></div>
           <div className='flex flex-col gap-4 my-6'>
            {data.map((item:any,idx:number)=>{
                return  <div key={idx} className='flex items-center gap-2'>
                <div className='sm:h-[22px] h-[20px] sm:w-[22px] w-[20px] rounded-full flex items-center justify-center bg-[#4B647E]'><Image src={checkImg} alt='' className=''/></div>
                <p className='text-[#a1a099]  xl:text-base text-sm'>{item.text}</p>
            </div>
            })}
            </div>
            <div className='flex items-end'>
                <h2 className='xl:text-2xl text-xl font-bold'>Rs. 1,999/</h2>
                <p className='text-[#a1a099] text-xs font-semibold'>year</p>
            </div>
           <div className='text-center bg-[#4B647E] py-4 text-white font-bold xl:text-base text-sm mt-5'><button>Get Started!</button></div>
           </div>
        </div>
        {/* second slide end*/}

        {/* third slide start  */}

        <div className='w-[100%] rounded-tl-xl rounded-tr-xl '>
            <div className='w-full h-[18px] bg-[#9BC1F9] rounded-tl-xl rounded-tr-xl'></div>
            <div className='bg-[#fffdf3] py-5 px-5'>
            <div className='flex items-center justify-between'>
                <div><Image src={premiumImg4} alt=''/></div>
                <div><FlatIcon className="flaticon-help text-[#a1a099] text-2xl"/></div>
            </div>
            <h1 className='font-bold xl:text-lg text-sm my-3'>PREMIUM</h1>
            <div className='text-[#a1a099] xl:text-lg text-base  '><h2>Duis aute irure dolor in reprehenderit in <br />  voluptate velit esse cillum dolore.</h2></div>
           <div className='flex flex-col gap-2 my-5'>
            {data.map((item:any,idx:number)=>{
                return  <div key={idx} className='flex items-center gap-2'>
                <div className='sm:h-[20px] h-[18px] sm:w-[20px] w-[18px] rounded-full flex items-center justify-center bg-[#9BC1F9]'><Image src={blackCheck} alt=''/></div>
                <p className='text-[#a1a099]  xl:text-base text-sm'>{item.text}</p>
            </div>
            })}
            </div>
            <div className='flex items-end'>
                <h2 className='xl:text-xl font-bold text-lg'>Rs. 2,999/</h2>
                <p className='text-[#a1a099] text-xs font-semibold'>year</p>
            </div>
           <div className='text-center bg-[#9BC1F9] py-3  mt-5 font-bold xl:text-base text-sm'><button>Get Started!</button></div>
           </div>
        </div>
        {/* third slide end    */}
                     </Slider>
                </div>
              </div>

              <div className="">
                <button
                  className={`${arrowButtonClass} -right-4  text-center flex items-center justify-center`}
                  onClick={() => slider.current?.slickNext()}
                >
                  <FlatIcon className="flaticon-down-right-2  text-secondary text-xl font-bold"/>

                  {/* R */}
                  {/* <FlatIcon className="flaticon-left-arrow lg:text-xl text-lg" /> */}
                </button>
              </div>
            </div>
      </div>
  )
}

export default PromotedBusinessSlider