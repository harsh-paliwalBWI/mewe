import React from 'react'
// import PieChart from '../pieChart/PieChart'

const About = () => {
  const data = [
    { label: 'Category A', value: 30 },
    { label: 'Category B', value: 50 },
    { label: 'Category C', value: 20 },
  ];
  const DummyData=[{name:"Name",heading:"Code Fusion"},{name:"Founder",heading:"Wade Warren"},{name:"Category",heading:"Education"}
,{name:"Year of Formation",heading:"1967"},{name:"Current Valuation",heading:"$928.41"}]

const DummyData2=[{name:"Current Financial Income",heading:"$565.7"},{name:"Previous Investment",heading:"$28.41"},{name:"Investor Name",heading:"Jane Cooper"}
,{name:"Type of Investment",heading:"FD"},{name:"Amount",heading:"$464.9"}]
  return (
  <>
  <div className='w-[100%] border border-primary bg-[#F8FAFC]'>
    <div className='flex flex-col gap-2'>
    {
      DummyData.map((item:any,idx:number)=>{
        return <div className='flex items-center justify-between w-full text-sm font-medium tracking-wider'>
        <div><h2 className='text-[#949597] '>{item.name}</h2></div>
        <div><h2 className='font-semibold'>{item.heading}</h2></div>
      </div>
      })
    }
    </div>
    <div className='flex flex-col gap-2'>
    {
      DummyData2.map((item:any,idx:number)=>{
        return <div className='flex items-center justify-between w-full text-sm font-medium tracking-wider'>
        <div><h2 className='text-[#949597] '>{item.name}</h2></div>
        <div><h2 className='font-semibold'>{item.heading}</h2></div>
      </div>
      })
    }
    </div>
    {/* <PieChart data={data} width={400} height={400} /> */}

  </div>
  </>
  )
}

export default About