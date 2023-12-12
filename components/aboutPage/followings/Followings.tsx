"use client"
import { fetchAcceptedFollowings, fetchPendingFollowings, getStartUpData } from '@/services/startupService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, FC } from 'react'
import { getCookie } from "cookies-next";
import Image from 'next/image';
import avatarimg from "../../../images/avatar.png";
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { toast } from "react-toastify"
import Modal from '@/components/Modal/modal';
import { CircularProgress } from '@mui/material';
interface Props {
    aboutInfo: any,
    params: any
}

const Followings: FC<Props> = ({ aboutInfo, params }) => {
    const cookies = { value: getCookie("uid") };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient()

    const { data: startUpData } = useQuery({
        queryKey: ["startUpData"],
        queryFn: () => getStartUpData(cookies),
    });

    const { data: AcceptedfollowingsData } = useQuery({
        queryKey: ["AcceptedfollowingsData"],
        queryFn: () => fetchAcceptedFollowings(cookies),
    });

    // console.log("from AcceptedfollowingsData", AcceptedfollowingsData);

    const { data: pendingfollowingsData } = useQuery({
        queryKey: ["pendingfollowingsData"],
        queryFn: () => fetchPendingFollowings(cookies),
    });
    // console.log("from pendingfollowingsData", pendingfollowingsData);


    const onUnfollowHandler = async (data: any) => {
        // console.log(data, "from unfollow");
        setIsModalOpen(true)
        try {
            const docid = aboutInfo?.id;
            if (docid) {
                const refDoc = doc(db, "startups", docid, "following", data.id);
                await deleteDoc(refDoc)
            }
            const followersId = data?.id;
            if (followersId) {
                const refDoc = doc(db, "startups", followersId, "followers", docid);
                await deleteDoc(refDoc)
            }
            await queryClient.invalidateQueries({ queryKey: ['pendingfollowingsData'] })
            await queryClient.refetchQueries({ queryKey: ['pendingfollowingsData'] })
            await queryClient.invalidateQueries({ queryKey: ['AcceptedfollowingsData'] })
            await queryClient.refetchQueries({ queryKey: ['AcceptedfollowingsData'] })
            setIsModalOpen(false)
            toast.success("Unfollowed.");
        } catch (err) {
            setIsModalOpen(false)
            toast.error("Something went wrong!")
        }
    };

    return (
        <div className=' w-full bg-[#F8FAFC] xl:px-8 px-4  sm:py-7 py-4 flex flex-col gap-8'>
            {/* { pendingfollowingsData && pendingfollowingsData?.length > 0&&
            <div className=''>
            {
                pendingfollowingsData && pendingfollowingsData?.length > 0 &&
                    (
                        <div className='flex flex-col gap-6'>
                            <h2 className=' text-primary text-base font-semibold'>Pending requests</h2>
                            <div className='flex flex-col gap-6'>
                                {
                                    pendingfollowingsData && pendingfollowingsData?.length > 0 && pendingfollowingsData.map((following: any, idx: number) => {
                                        return <div key={idx}>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center gap-x-4'>
                                                    <div className='sm:h-16 sm:w-16 h-12 w-12 rounded-full '>
                                                        <Image src={following?.coverPic?.url ? following?.coverPic?.url : avatarimg} alt="" width={1000} height={1000} className='w-[100%] h-[100%] object-fill rounded-full ' />
                                                    </div>
                                                    <h3 className='sm:text-base text-sm'>{following.name}</h3>
                                                </div>
                                                <div className='flex gap-4'>
                                                    <button onClick={async () => await onUnfollowHandler(following)} className='bg-primary text-white h-fit sm:py-2 py-1 sm:px-4 px-3 rounded-md text-sm'>Requesting</button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    )
                    // :
                    // (
                    //     <div className='w-full flex justify-center md:h-[50vh] h-[25vh] items-center text-primary text-base'>
                    //         <h2>No following yet !</h2>
                    //     </div>
                    // )
            }
            </div>
} */}
            {
                    AcceptedfollowingsData && AcceptedfollowingsData?.length > 0 ?
                        (
                            <div className='flex flex-col gap-6'>
                                {
                                    AcceptedfollowingsData && AcceptedfollowingsData?.length > 0 && AcceptedfollowingsData.map((following: any, idx: number) => {
                                        return <div key={idx}>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center gap-x-4'>
                                                    <div className='sm:h-16 sm:w-16 h-12 w-12 rounded-full '>
                                                        <Image src={following?.coverPic?.url ? following?.coverPic?.url : avatarimg} alt="" width={1000} height={1000} className='w-[100%] h-[100%] object-fill rounded-full ' />
                                                    </div>
                                                    <h3 className='sm:text-base text-sm'>{following.name}</h3>
                                                </div>
                                                <button onClick={async () => await onUnfollowHandler(following)} className='bg-black text-white h-fit sm:py-2 py-1 sm:px-4 px-3 rounded-md text-sm'>Following</button>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        
                        )
                        :
                        (
                            <div className='w-full flex justify-center  md:h-[50vh] h-[25vh]  items-center text-primary text-base'>
                                <h2>No following yet !</h2>
                            </div>
                        )
                }
            <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <CircularProgress className="!text-white"></CircularProgress>
                    <p className="text-white font-medium text-lg">
                        Processing...
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default Followings