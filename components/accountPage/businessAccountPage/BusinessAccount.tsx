"use client"
import React, { useState, Fragment, useEffect } from 'react'
import { Listbox, Transition } from "@headlessui/react";
import FlatIcon from '@/components/flatIcon/flatIcon';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify"
import {  fetchBusinessAccountDetails, getStartUpData, isBusinessAccountExistOrNot } from '@/services/startupService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '@/components/loader/Loader';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { getCookie } from "cookies-next";


const dummyCategory = [
  { id: "2", name: 'Category1', unavailable: false },
  { id: "3", name: 'Category2', unavailable: false },
  { id: "4", name: 'Category3', unavailable: true },
  { id: "5", name: 'Category4', unavailable: false },]

const dummyCompanySize = [
  { id: 2, name: 10, unavailable: false },
  { id: 3, name: 20, unavailable: false },
  { id: 4, name: 39, unavailable: true },
  { id: 5, name: 67, unavailable: false },]

const dummyCities = [
  { id: 2, name: 'city1', unavailable: false },
  { id: 3, name: 'city2', unavailable: false },
  { id: 4, name: 'city3', unavailable: true },
  { id: 5, name: 'city4', unavailable: false },]

const dummyIndustry = [
  { id: 2, name: 'Industry1', unavailable: false },
  { id: 3, name: 'Industry2', unavailable: false },
  { id: 4, name: 'Industry3', unavailable: true },
  { id: 5, name: 'Industry4', unavailable: false },]

const dummyYearOfFormation = [
  { id: 2, name: '1999', unavailable: false },
  { id: 3, name: '1998', unavailable: false },
  { id: 4, name: '1997', unavailable: true },
  { id: 5, name: '1996', unavailable: false },]


const dummyTypeOfInvestment = [
  { id: 2, name: 'Investment type1', unavailable: false },
  { id: 3, name: 'Investment type2', unavailable: false },
  { id: 4, name: 'Investment type3', unavailable: true },
  { id: 5, name: 'Investment type4', unavailable: false },]

const borderStyle = "border border-[#C8C8C8] rounded-md relative"
const labelStyle = " text-sm   text-[#868E97] font-medium  px-1  bg-white absolute top-[-10px] left-[10px]"
const inputStyle = "rounded-lg px-3 py-3 w-full outline-0 text-sm"

const BusinessAccount = () => {
  const cookies = { value: getCookie("uid") };
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const [industry, setIndustry] = useState(dummyIndustry[0])
  const pathName = usePathname()
  const router = useRouter()

 
  const {data:existOrNot}=useQuery({
    queryKey:["businessAccountExistOrNot"],
    queryFn:()=>isBusinessAccountExistOrNot(cookies)
  })
  // console.log(existOrNot,"on not");
  
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
    keepPreviousData: true

  });

  // console.log("startUpData", startUpData?.name);
  const { data: businessAccountData } = useQuery({
    queryKey: ["businessAccountData"],
    queryFn: () => fetchBusinessAccountDetails(cookies),
    keepPreviousData: true
  });
  // console.log(businessAccountData, "account data");

  const [companySize, setCompanySize] = useState(businessAccountData ? {name: businessAccountData.companySize} : {name:""})
  const [city, setCity] = useState(businessAccountData ? {name: businessAccountData.city} :{name:""} )
  const [yearOfFormation, setYearOfFormation] = useState(businessAccountData ? {name: businessAccountData.yearOfFormation} : {name:""})
  const [typeOfInvestement, setTypeOfInvestment] = useState(businessAccountData ? {name: businessAccountData.typeOfInvestement} : {name:""})
  const [category, setCategory] = useState(businessAccountData ? { id: businessAccountData.category.id, name: businessAccountData.category.name } : { id:"", name:"" })

const [phoneNumber,setPhoneNumber]=useState(startUpData?.phoneNo)
const [email,setEmail]=useState(startUpData?.email)
const [name,setName]=useState(startUpData?.name)
  const [state, setState] = useState({
    // name: startUpData?.name,
    founderName: businessAccountData?businessAccountData?.founderName:"",
    coFounderName: businessAccountData ? businessAccountData?.coFounderName : "",
    linkedInUrl: businessAccountData ? businessAccountData?.social?.linkedin : "",
    description: businessAccountData ? businessAccountData?.description : "",
    address: businessAccountData ? businessAccountData?.address?.line1 : "",
    currentFinancialIncome: businessAccountData ? businessAccountData?.currentFinancialIncome : "",
    currentValuation: businessAccountData ? businessAccountData?.currentValuation : "",
    amount: businessAccountData ? businessAccountData?.amount : "",
    typeOfInvestement: businessAccountData ? businessAccountData?.typeOfInvestement : "",
    panNo: businessAccountData ? businessAccountData?.panNo : ""
  })

 const  addAdvanceDetails = async (advanceDetails: any,email:any) => {
    // console.log(advanceDetails,email);
    const refDoc = doc(db, `startups/${startUpData?.id}/details/advance`);
    const refDoc2 = doc(db, `startups/${startUpData?.id}`);
    const details = {
        name: advanceDetails.name,
        email:email,
        basic: {
            name: advanceDetails.name,
            category: {
                id: advanceDetails.category.id,
                name: advanceDetails.category.name,
            },
        },
    };
    await setDoc(refDoc2, details, { merge: true });
    await setDoc(refDoc, advanceDetails, { merge: true });
};
  const onSubmitHandler = async () => {
    setLoading(true)
    try {
      const accountInfo = {
        name: name,
        founderName: state.founderName,
        coFounderName: state.coFounderName,
        social: {
          linkedin: state.linkedInUrl,
        },
        category: {
          id: category.id,
          name: category.name
        },
        address: {
          line1: state.address,
        },
        city: city.name,
        companySize: +companySize.name,
        yearOfFormation: +yearOfFormation.name,
        description: state.description,
        panNo: state.panNo,
        currentFinancialIncome: +state.currentFinancialIncome,
        currentValuation: +state.currentValuation,
        typeOfInvestement: typeOfInvestement.name,
        amount: +state.amount,
      }
      // validation start 

      // if(!state.name&&!state.founderName&&state.coFounderName&&state.linkedInUrl&&category.name&&state.address&&city.name&&companySize.name&&yearOfFormation.name
      //   &&state.description&&state.panNo&&state.currentFinancialIncome&&state.currentValuation&&state.amount&&email)
      // validation end 
      await addAdvanceDetails(accountInfo,email)
      await queryClient.invalidateQueries({ queryKey: ['businessAccountData'] })
      await queryClient.refetchQueries({ queryKey: ['businessAccountData'] })
      if(existOrNot){
        toast.success("Changes saved successfully.")
      }else{
        toast.success("Business account created.")

      }
      setLoading(false)
    } catch (error) {
      toast.error("Some error occured")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (businessAccountData) {
        setState({
          // name: startUpData?.name,
          founderName:businessAccountData? businessAccountData?.founderName:"",
          coFounderName:businessAccountData?.coFounderName ,
          linkedInUrl: businessAccountData?.social?.linkedin ,
          description:  businessAccountData?.description ,
          address: businessAccountData?.address?.line1 ,
          currentFinancialIncome: businessAccountData?.currentFinancialIncome,
          currentValuation:  businessAccountData?.currentValuation ,
          amount: businessAccountData?.amount ,
          typeOfInvestement:businessAccountData?.typeOfInvestement ,
          panNo:businessAccountData?.panNo 
        });
      setCity(businessAccountData ? {name: businessAccountData.city} :{name:""})
    setYearOfFormation(businessAccountData ? {name: businessAccountData.yearOfFormation} :{name:""})
    setTypeOfInvestment(businessAccountData ? {name: businessAccountData.typeOfInvestement} : {name:""})
  setCompanySize(businessAccountData ? {name: businessAccountData.companySize} :{name:""})
setCategory(businessAccountData ? { id: businessAccountData.category.id, name: businessAccountData.category.name } : { id:"", name:"" })
    }
    if(startUpData){
setPhoneNumber(startUpData?.phoneNo)
setEmail(startUpData.email)
setName(startUpData?.name)
    }
}, [businessAccountData,existOrNot,startUpData]);

useEffect(() => {
  setIsClient(true)
}, [])

  return (
    <div className={` h-fit py-2  relative z-0 mb-10 ${pathName.includes("business-account") ? "block  w-[100%] sm:mt-5" : "sm:block hidden md:w-[63%] w-[100%]"} `}>
      {
        pathName.includes("business-account") && <div
          onClick={() => {
            router.replace("/account?tab=my-profile")
          }}
          className='mb-2'><FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" /></div>
      }
      <div className='text-primary font-bold xl:text-xl sm:text-xl text-lg '><h1>Create Business Account</h1></div>
      <div className='text-[#868E97] xl:text-sm text-sm font-medium  sm:mb-6 mb-4 mt-4'><p>Fill in all the details to get started.</p></div>
      <div className='text-primary font-bold  text-base  '><h2>Basic</h2></div>
      <div className="w-full flex flex-col sm:gap-9 gap-7 sm:my-8 my-5">
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full  ">
          <div className={`${borderStyle} md:w-[50%] w-full`}>
            <label className={`${labelStyle}`} htmlFor="input">Name of the Startup</label>
            <input 
            value={isClient&&name} 
            onChange={(e) => setName(e.target.value)} 
            className={`${inputStyle}`} type="text" id="input" />
          </div>
          <div className={`${borderStyle} md:w-[50%] w-full`}>
            <label className={`${labelStyle}`} htmlFor="input">Founder Name</label>
            <input value={isClient&&state.founderName} onChange={(e) => setState({ ...state, founderName: e.target.value })} className={`${inputStyle}`} type="text" id="input" />
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full ">
          <div className={`${borderStyle} sm:w-[50%] w-full`}>
            <label className={`${labelStyle}`} htmlFor="input">Co- Founder Name</label>
            <input value={isClient&&state.coFounderName} onChange={(e) => setState({ ...state, coFounderName: e.target.value })} className={`${inputStyle}`} type="text" id="input" />
          </div>
          <div className={`flex ${borderStyle} justify-between  items-center gap-4 w-full sm:w-[50%] w-full `}>
            <div className={`w-[100%]`}>
              <label className={`${labelStyle}`} htmlFor="input">LinkedIN URL</label>
              <input value={isClient&&state.linkedInUrl} onChange={(e) => setState({ ...state, linkedInUrl: e.target.value })} className={`${inputStyle}  w-[100%]`} type="text" id="input" />
            </div>
            <div className='  px-4'>
              <FlatIcon className="flaticon-help-1 text-[#9bb7d3] text-xl" />
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full relative ">
          <div className='border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md '>
            <p className={`${labelStyle}`}>Category</p>
            <div className='  relative w-full py-3 px-4 rounded-md '>
              <Listbox value={category} onChange={setCategory}>
                <div className=' '>
                  <Listbox.Button className={` w-full flex justify-between items-center text-start text-sm`}><span>{(category?.name&&isClient && category.name) || "Select"}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                  <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl   bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`} >
                    {dummyCategory.map((category) => (
                      <Listbox.Option key={category.id} value={category} as={Fragment} >
                        {({ active, selected }) => (
                          <li
                            className={`${active ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white text-black cursor-pointer'
                              }  flex justify-between px-2 py-1 shadow rounded-md `}
                          >
                            {/* {selected && <CheckIcon />} */}
                            <span>
                              {category.name}
                            </span>
                            {selected && <span>check</span>}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
          <div className='border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md '>
            <p className={`${labelStyle}`}>Company Size</p>
            <div className='  relative w-full py-3 px-4 rounded-md '>
              <Listbox value={companySize} onChange={setCompanySize}>
                <div className=' '>
                  <Listbox.Button className={` w-full flex justify-between items-center text-start text-sm`}><span> {(isClient&&companySize?.name && companySize.name) || "Select"}</span><span>
                    <FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                  <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`} >
                    {dummyCompanySize.map((company) => (
                      <Listbox.Option key={company.id} value={company} as={Fragment} >
                        {({ active, selected }) => (
                          <li
                          className={`${active ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white text-black cursor-pointer'
                        }  flex justify-between px-2 py-1 shadow rounded-md `}
                          >
                            {/* {selected && <CheckIcon />} */}

                            <span>
                              {company.name}
                            </span>
                            {selected && <span>check</span>}

                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-9 gap-5  w-full ">

          <div className={`${borderStyle} w-[100%]`}>
            <label className={`${labelStyle}`} htmlFor="input">Address</label>
            <input value={isClient&&state.address} onChange={(e) => setState({ ...state, address: e.target.value })} className={`${inputStyle}`} type="text" id="input" />
          </div>
        </div>
        <div className="flex sm:flex-row flex-col md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full relative ">
          <div className='border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md '>
            <p className={`${labelStyle}`}>City</p>
            <div className='  relative w-full py-3 px-4 rounded-md '>
              <Listbox value={city} onChange={setCity}>
                <div className=' '>
                  <Listbox.Button className={` w-full flex justify-between items-center text-start text-sm `}><span>{(isClient&&city?.name && city.name) || "Select"}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                  <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`} >
                    {dummyCities.map((city) => (
                      <Listbox.Option key={city.id} value={city} as={Fragment} >
                        {({ active, selected }) => (
                          <li
                          className={`${active ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white text-black cursor-pointer'
                        }  flex justify-between px-2 py-1 shadow rounded-md `}
                          >
                     

                            <span>
                              {city.name}
                            </span>
                            {selected && <span>check</span>}

                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
          {/* <div className='border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md '>
            <p className={`${labelStyle}`}>Industry</p>
            <div className='  relative w-full py-3 px-4 rounded-md '>
              <Listbox value={industry} onChange={setIndustry}>
                <div className=' '>
                  <Listbox.Button className={` w-full flex justify-between items-center text-start`}><span>{industry.name}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                  <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-1 left-0 z-30 w-full`} >
                    {dummyIndustry.map((industry) => (
                      <Listbox.Option key={industry.id} value={industry} as={Fragment} >
                        {({ active, selected }) => (
                          <li
                            className={`${active ? 'bg-blue-500 text-white cursor-pointer' : ' text-black cursor-pointer'
                              }  flex justify-between`}
                          >
                           

                            <span>
                              {industry.name}
                            </span>
                            {selected && <span>check</span>}

                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div> */}
        </div>
        <div className="flex md:flex-row flex-col md:gap-9 gap-5 gap-9  w-full ">
          <div className={`${borderStyle} w-[100%] business-account-desc`}>
            <label htmlFor="" className={`${labelStyle}`}>
              Description
            </label>
            <textarea
              value={isClient&&state.description} onChange={(e) => setState({ ...state, description: e.target.value })}
              name=""
              id=""
              className={`${inputStyle}`}
              rows={2}
            ></textarea>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-9 gap-5  w-full  relative ">
          <div className='border border-[#C8C8C8] md:w-[50%] w-full relative flex items-center rounded-md '>
            <p className={`${labelStyle}`}>Year of Formation</p>
            <div className='  relative w-full py-3 px-4 rounded-md '>
              <Listbox value={yearOfFormation} onChange={setYearOfFormation}>
                <div className=' '>
                  <Listbox.Button className={` w-full flex justify-between items-center text-start text-sm`}><span>{(isClient&&yearOfFormation?.name && yearOfFormation.name) || "Select"}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                  <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`} >
                    {dummyYearOfFormation.map((year) => (
                      <Listbox.Option key={year.id} value={year} as={Fragment} >
                        {({ active, selected }) => (
                          <li
                          className={`${active ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white text-black cursor-pointer'
                        }  flex justify-between px-2 py-1 shadow rounded-md `}
                          >
                            {/* {selected && <CheckIcon />} */}

                            <span>
                              {year.name}
                            </span>
                            {selected && <span>check</span>}

                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='text-primary font-bold  text-base  '><h2>Financials</h2></div>
        <div className='w-full  sm:my-8 my-5'>
          <div className="grid sm:grid-cols-2  grid-cols-1 md:gap-x-9 gap-x-5 sm:gap-y-9 gap-y-7 w-full  ">
            <div className='flex flex-col gap-5  '>
              <div className='flex flex-col sm:gap-9 gap-7'>
                <div className={`flex ${borderStyle} justify-between  items-center gap-4 w-full  `}>
                  <div className={`w-[100%]`}>
                    <label className={`${labelStyle}`} htmlFor="input">Current Financial Income</label>
                    <input value={isClient&&state.currentFinancialIncome} onChange={(e) => setState({ ...state, currentFinancialIncome: e.target.value })} className={`${inputStyle}  w-[100%]`} type="text" id="input" />
                  </div>
                  <div className='px-4 text-xl text-[#9bb7d3]'>
                    &#8377;
                  </div>
                </div>
                {/* <div className='border border-[#C8C8C8]  relative flex items-center rounded-md '>
                  <p className={`${labelStyle}`}>Year</p>
                  <div className='  relative w-full py-3 px-4 rounded-md '>
                    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                      <div className=' '>
                        <Listbox.Button className={` w-full flex items-center justify-between text-start`}><span>{selectedPerson.name}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                        <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-1 left-0 z-30 w-full`} >
                          {people.map((person) => (
                            <Listbox.Option key={person.id} value={person} as={Fragment} >
                              {({ active, selected }) => (
                                <li
                                  className={`${active ? 'bg-blue-500 text-white cursor-pointer' : ' text-black cursor-pointer'
                                    }  flex justify-between`}
                                >
                                 

                                  <span>
                                    {person.name}
                                  </span>
                                  {selected && <span>check</span>}

                                </li>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                </div> */}
              </div>
              <div>
                {/* <div className='flex justify-between items-center text-sm text-[#868E97] font-medium mb-4'><div className='flex items-center gap-2'><h2>Quarterly</h2>v</div><h2>Amount</h2></div> */}
                {/* <div className='flex flex-col sm:gap-3 gap-2  '>
                  <div className='flex justify-between items-center '>
                    <div className='text-sm text-[#868E97] font-medium w-[85%] '>Quarter 1 (Jan- Mar)</div>
                    
                    <div className='sm:px-6 px-4 sm:py-3 py-2 border border-[#C8C8C8] rounded-md sm:text-xl text-base text-[#9bb7d3]'>&#8377;</div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-[#868E97] font-medium '>Quarter 2 (Apr- Jun)</div>
                    <div className='sm:px-6 px-4 sm:py-3 py-2  border border-[#C8C8C8] rounded-md text-xl text-[#9bb7d3] '>&#8377;</div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-[#868E97] font-medium '>Quarter 3 (Jul- Sep)</div>
                    <div className='sm:px-6 px-4 sm:py-3 py-2  border border-[#C8C8C8] rounded-md text-xl text-[#9bb7d3] '>&#8377;</div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-[#868E97] font-medium '>Quarter 4 (Oct-Dec)</div>
                    <div className='sm:px-6 px-4 sm:py-3 py-2  border border-[#C8C8C8] rounded-md text-xl text-[#9bb7d3]'>&#8377;</div>
                  </div>
                </div> */}
              </div>
              {/* <div className='text-center text-[#868e97] flex justify-center text-sm border border-primary rounded-md py-3 cursor-pointer'><button className='flex items-center justify-center gap-1'><FlatIcon className="flaticon-plus text-[10px]" /> <span>Add Another year</span></button></div> */}
            </div>
            <div>
              <div className='flex flex-col sm:gap-9 gap-5  '>
                <div className={`flex ${borderStyle} justify-between  items-center gap-4 w-full  `}>
                  <div className={`w-[100%]`}>
                    <label className={`${labelStyle}`} htmlFor="input">Current Valuation</label>
                    <input value={isClient&&state.currentValuation} onChange={(e) => setState({ ...state, currentValuation: e.target.value })} className={`${inputStyle}  w-[100%]`} type="text" id="input" />
                  </div>
                  <div className='px-4 text-xl text-[#9bb7d3]'>
                    &#8377;
                  </div>
                </div>
                {/* <div className={`text-sm text-[#868E97] font-medium `}>Profit</div> */}
                {/* <div className='flex md:gap-8 sm:gap-4 gap-2 w-full '>
                  <div className={`${borderStyle} w-[85%] `}>
                    <label className={`${labelStyle}`} htmlFor="input">Enter product name</label>
                    <input className={`${inputStyle}`} type="text" id="input" />
                  </div>
                  <div className=' w-[15%]  '>
                    <div className='percentage-placeholder flex justify-center'>
                      <input type="text" className='py-3 sm:px-5 px-3 outline-0 w-[100%] border border-[#C8C8C8] rounded-md' placeholder='%' />
                    </div>
                  </div>
                </div> */}
              </div>
              {/* <div className='text-center cursor-pointer text-[#868e97] flex justify-center text-sm border border-primary rounded-md py-3 sm:mt-4 mt-6'><button className='flex items-center justify-center gap-1'><FlatIcon className="flaticon-plus text-[10px]" /> <span>Add product</span></button></div> */}
            </div>
          </div>
          <div className='grid lg:grid-cols-2 grid-cols-1 sm:grid-cols-2  md:gap-9 gap-7  w-full  sm:mt-7 mt-7 '>
            <div className='flex flex-col sm:gap-9 gap-7 '>
              <div className='border border-[#C8C8C8]  relative flex items-center rounded-md '>
                <p className={`${labelStyle}`}>Type of Investment Required</p>
                <div className='  relative w-full py-3 px-4 rounded-md '>
                  <Listbox value={typeOfInvestement} onChange={setTypeOfInvestment}>
                    <div className=' '>
                      <Listbox.Button className={` w-full flex items-center justify-between text-start text-sm`}><span>{(isClient&&typeOfInvestement?.name && typeOfInvestement.name) || "Select"}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                      <Listbox.Options className={`absolute top-[50px] px-3 py-3 rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-2 left-0 z-30 w-full`} >
                        {dummyTypeOfInvestment.map((investment) => (
                          <Listbox.Option key={investment.id} value={investment} as={Fragment} >
                            {({ active, selected }) => (
                              <li
                              className={`${active ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white text-black cursor-pointer'
                            }  flex justify-between px-2 py-1 shadow rounded-md `}
                              >
                                {/* {selected && <CheckIcon />} */}

                                <span>
                                  {investment.name}
                                </span>
                                {selected && <span>check</span>}

                              </li>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              </div>
              <div className={`${borderStyle} `}>
                <label className={`${labelStyle}`} htmlFor="input">Pan Number</label>
                <input value={isClient&&state.panNo} onChange={(e) => setState({ ...state, panNo: e.target.value })} className={`${inputStyle}`} type="text" id="input" />
              </div>
            </div>
            <div>
              <div className={`flex ${borderStyle} justify-between  items-center gap-4 w-full  `}>
                <div className={`w-[100%]`}>
                  <label className={`${labelStyle}`} htmlFor="input">Amount</label>
                  <input value={isClient&&state.amount} onChange={(e) => setState({ ...state, amount: e.target.value })} className={`${inputStyle}  w-[100%]`} type="text" id="input" />
                </div>
                <div className='px-4 text-xl text-[#9bb7d3]'>
                  &#8377;
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='text-primary font-bold  text-base  '><h2>Photos and Videos</h2></div>
        <div className='flex items-center gap-8 sm:my-8 my-5'>
          <div className='sm:h-[150px] h-[100px] sm:w-[150px] w-[100px] rounded-lg bg-primary text-white text-7xl flex items-center justify-center font-bold'>+</div>
          <div className='sm:h-[150px] h-[100px] sm:w-[150px] w-[100px] rounded-lg border border-primary border-dashed text-primary text-6xl flex items-center justify-center font-bold'>+</div>
        </div> */}
        <div className='flex flex-col sm:gap-10 gap-6'>
          {/* <div className='text-primary font-bold  text-base  '><h2>Contact</h2></div> */}
          <div className='grid sm:grid-cols-2 grid-cols-1  md:gap-9 gap-7'>
            <div className={`${borderStyle} `}>
              <label className={`${labelStyle}`} htmlFor="input">Email</label>
              <input value={isClient&&email} onChange={(e)=>setEmail(e.target.value)} className={`${inputStyle}`} type="text" id="input" />
            </div>
            <div className={`${borderStyle}  `}>
              <label className={`${labelStyle}`} htmlFor="input">Phone Number</label>
              <input  value={isClient&&phoneNumber} disabled={true} className={`${inputStyle} `} type="text" id="input" />
            </div>
          </div>
          <div
            onClick={async () => {
              await onSubmitHandler()
            }}
            className='bg-primary text-white text-sm font-medium  text-center rounded-full py-4 cursor-pointer'
          >
            <button style={{ height: "100%", position: "relative", }}>
              {loading && (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }}>
                  <Loader />
                </div>
              )}
              {!loading && (existOrNot?"Save changes": "Submit")}
            </button>
          </div>

          {/* <div onClick={async()=>{
            await onSubmitHandler()
          }} className='bg-primary text-white text-sm font-medium  text-center rounded-full py-4 cursor-pointer'><button>Submit</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BusinessAccount