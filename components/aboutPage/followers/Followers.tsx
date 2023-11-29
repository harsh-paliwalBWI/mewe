"use client"
import React, { useState } from 'react'
import { getCookie } from "cookies-next";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStartUpData } from '@/services/startupService';
import Image from 'next/image';
import avatarimg from "../../../images/avatar.png";
import Modal from '@/components/Modal/modal';
import { CircularProgress } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { toast } from "react-toastify"


const Followers = () => {
    const cookies = { value: getCookie("uid") };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient()

    const { data: startUpData } = useQuery({
        queryKey: ["startUpData"],
        queryFn: () => getStartUpData(cookies),
    });

    const onRemoveHandler = async (data: any) => {
        // console.log("from remove", data);
        setIsModalOpen(true)
        try {
            const docid = startUpData?.id;
            // from following start 
            if (docid) {
                const docRef = doc(db, `startups/${docid}`);
                const docSnap = await getDoc(docRef);
                const existingFollowers = docSnap.data()?.followers || [];
                const updatedFollowers = existingFollowers.filter(
                    (item: any) => item.docId !== data.docId
                );
                await setDoc(docRef, { followers: updatedFollowers }, { merge: true });
            }
            // from following end
            // from followers start
            const followersId = data?.docId;
            if (followersId) {
                const followersDocRef = doc(db, `startups/${followersId}`);
                const docSnap = await getDoc(followersDocRef);
                const existingFollowings = docSnap.data()?.following || [];
                const updatedFollowings = existingFollowings.filter(
                    (item: any) => item.docId !== startUpData?.id
                );
                await setDoc(followersDocRef, { following: updatedFollowings }, { merge: true });
            }
            // from followers end
            await queryClient.invalidateQueries({ queryKey: ['startUpData'] })
            await queryClient.refetchQueries({ queryKey: ['startUpData'] })
            setIsModalOpen(false)
            toast.success("Removed.");
        } catch (err) {
            setIsModalOpen(false)
            toast.error("Something went wrong!")
        }
    };
    return (
        <div className=' w-full bg-[#F8FAFC] xl:px-8 px-4  sm:py-7 py-4'>
            {
                startUpData && startUpData?.followers.length > 0 ?

                    (
                        <div className='flex flex-col gap-6'>
                            {
                                startUpData && startUpData?.followers.length > 0 && startUpData?.followers.map((follower: any, idx: number) => {
                                    return <div key={idx}>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-x-4'>
                                                <div className='sm:h-16 sm:w-16 h-12 w-12 rounded-full '>
                                                    <Image src={follower?.coverPic?.url ? follower?.coverPic?.url : avatarimg} alt="" width={1000} height={1000} className='w-[100%] h-[100%] object-fill rounded-full ' />
                                                </div>
                                                <h3 className='sm:text-base text-sm'>{follower.name}</h3>
                                            </div>
                                            <button
                                                onClick={async () => onRemoveHandler(follower)}
                                                className='bg-primary text-white h-fit sm:py-2 py-1 sm:px-4 px-3 rounded-md text-sm'>Remove</button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    )
                    :
                    (
                        <div className='w-full flex justify-center md:h-[50vh] h-[25vh] items-center text-primary text-base'>
                            <h2>No followers yet !</h2>
                        </div>
                    )
            }
            <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <CircularProgress className="!text-white"></CircularProgress>
                    <p className="text-white font-medium text-lg">
                        Removing..
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default Followers