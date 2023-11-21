"use client"
import React, { FC, useState, Fragment, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import FlatIcon from '@/components/flatIcon/flatIcon';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from "@headlessui/react";
import { useQuery } from '@tanstack/react-query';
import { fetchBusinessAccountDetails, getStartUpData } from '@/services/startupService';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { log } from 'console';
import { toast } from 'react-toastify';
import Loader from '@/components/loader/Loader';
import { getCookie } from "cookies-next";


const dummyCategory = [
    { id: "2", name: 'Category1', unavailable: false },
    { id: "3", name: 'Category2', unavailable: false },
    { id: "4", name: 'Category3', unavailable: true },
    { id: "5", name: 'Category4', unavailable: false },]

const labelStyle = "sm:text-sm text-sm text-[#868E97] font-medium "
const inputStyle = "border border-[#C8C8C8] rounded-md px-3 sm:py-3 py-3 outline-0 text-sm"
const divStyle = "flex flex-col sm:gap-3 gap-2"
const mainDivStyle = "grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3  w-full "

const MyProfile = () => {
    const cookies = { value: getCookie("uid") };
    console.log(cookies,"my profile page");
    
    const [client, setClient] = useState(false)
    const router = useRouter()
    const pathName = usePathname()
    const [loading, setLoading] = useState(false)
    const { data: startUpData } = useQuery({
        queryKey: ["startUpData"],
        queryFn: () => getStartUpData(cookies),
    });
    console.log("startUpData", startUpData);

    const { data: businessAccountData } = useQuery({
        queryKey: ["businessAccountData"],
        queryFn: () => fetchBusinessAccountDetails(cookies),
    });

    // console.log("advacne", businessAccountData);

    

    const [profileInfo, setProfileInfo] = useState({
        name: startUpData?.name,
        linkedInUrl: businessAccountData && businessAccountData?.social?.linkedin,
        email: startUpData?.email,
        description: businessAccountData && businessAccountData?.description
    })

    const [category, setCategory] = useState(startUpData?.basic?.category ?
        { id: startUpData.basic.category.id, name: startUpData.basic.category.name }
        :
        { id:"", name:"" })


    const onSaveChangesHandler = async () => {
        setLoading(true)
        try {
            const refDoc = doc(db, `startups/${startUpData.id}`);
            const advanceDetailsRef = doc(db, `startups/${startUpData.id}/details/advance`);
            const details = {
                name: profileInfo.name,
                email: profileInfo.email,
                basic: {
                    name: profileInfo.name,
                    category: { id: category.id, name: category.name },
                    followers: 0,
                    following: 0
                }
            }
            await setDoc(refDoc, details, { merge: true });
            const advanceDetailsObj = {
                name: profileInfo.name,
                social: { linkedin: profileInfo.linkedInUrl },
                description: profileInfo.description,
                category: { id: category.id, name: category.name }
            }
            await setDoc(advanceDetailsRef, advanceDetailsObj, { merge: true });
            toast.success("Changes saved successfully.")
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error("An error occurred while saving changes.");
        }
    }


    useEffect(() => {
        console.log("inside use effect");
        if (startUpData) {
        // setIsCilent(true)

            console.log("inside if");
            
            setProfileInfo({
                name: startUpData?.name,
                linkedInUrl: businessAccountData && businessAccountData?.social?.linkedin,
                email: startUpData?.email,
                description: businessAccountData && businessAccountData?.description
            });

            const startupCategory = startUpData?.basic?.category;
            setCategory(startupCategory ? { id: startupCategory.id, name: startupCategory.name } : { id:"", name:"" });
        }else{
            console.log("inside else");
        }
    }, [startUpData, businessAccountData]);

    useEffect(() => {
        console.log("inside use effect");
        
        // if (typeof window !== 'undefined') {
          setClient(true)
        // }
    }, []);
    return (
        <>
            <div className={` h-fit py-2  ${pathName.includes("my-profile-page") ? "block  w-[100%] sm:mt-5 md:mt-5 md:mb-24 mb-5" : "sm:block hidden lg:w-[58%] md:w-[68%]  w-full"}`}>
                {
                    pathName.includes("my-profile-page") && <div
                        onClick={() => {
                            router.replace("/account?tab=my-profile")
                        }}
                        className='mb-2'><FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" /></div>
                }
                {
                    pathName.includes("my-profile-page") && 
                    // <div className=''>
                        <h2 className='text-primary font-bold sm:text-xl text-lg  sm:mb-6 mb-3'>My Profile</h2>
                        // </div>
                }
                <div className="w-full flex flex-col sm:gap-7 gap-4">
                    <div className={`${mainDivStyle}`}>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Business Name*
                            </label>
                            <input value={ client&&profileInfo.name} onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })} className={`${inputStyle}`}
                            />
                        </div>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Category*
                            </label>
                            <div className='border border-[#C8C8C8]  relative flex items-center rounded-md '>
                                <div className='  relative w-full  px-4 rounded-md   '>
                                    <Listbox value={category} onChange={setCategory}>
                                        <div className=' '>
                                            <Listbox.Button className={` w-full flex justify-between items-center text-start  py-3 text-sm`}><span>{(client&&category.name && category.name) || "Select"}</span><span><FlatIcon className="flaticon-down-arrow text-[#9bb7d3] text-lg" /></span></Listbox.Button>
                                            <Listbox.Options className={`absolute top-[50px] px-3  rounded-md shadow-xl  bg-[#F8FAFC] text-sm flex flex-col gap-1 left-0 z-30 w-full`} >
                                                {dummyCategory.map((category) => (
                                                    <Listbox.Option key={category.id} value={category} as={Fragment} >
                                                        {({ active, selected }) => (
                                                            <li
                                                                className={`${active ? 'bg-blue-500 text-white cursor-pointer' : ' text-black cursor-pointer'
                                                                    }  flex justify-between`}
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
                        </div>
                    </div>
                    <div className={`${mainDivStyle}`}>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                LinkedIn URL*
                            </label>
                            <input value={profileInfo.linkedInUrl} onChange={(e) => setProfileInfo({ ...profileInfo, linkedInUrl: e.target.value })} className={`${inputStyle}`}
                            />
                        </div>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Email*
                            </label>
                            <input value={client&&profileInfo.email} onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })} className={`${inputStyle}`}
                            />
                        </div>
                    </div>
                    <div className={`w-full profile-desc ${divStyle}`}>
                        <label htmlFor="" className={`${labelStyle}`}>
                            Description
                        </label>
                        <textarea
                            value={client&&profileInfo.description} onChange={(e) => setProfileInfo({ ...profileInfo, description: e.target.value })}
                            name=""
                            id=""
                            className={`text-black ${inputStyle} `}
                            rows={5}
                        ></textarea>
                    </div>
                    {/* <div className={`${mainDivStyle}`}>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Current Password
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                New Password
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                    </div> */}

                    <div
                        onClick={async () => {
                            await onSaveChangesHandler()
                        }}
                        className="md:w-[100%] sm:mt-4 mt-2 w-full rounded-full font-semibold  bg-primary text-white text-center  py-4  text-sm font-medium cursor-pointer "
                    >
                        <button style={{height: "100%",position: "relative", }}>
                            {loading && (
                                <div style={{position: "absolute",top: "50%", left: "50%",transform: "translate(-50%, -50%)",}}>
                                    <Loader />
                                </div>
                            )}
                            {!loading && "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile