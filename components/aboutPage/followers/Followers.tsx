"use client"
import React, { FC, useState } from 'react'
import { getCookie } from "cookies-next";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAcceptedFollowRequests, fetchPendingFollowRequests, getStartUpData } from '@/services/startupService';
import Image from 'next/image';
import avatarimg from "../../../images/avatar.png";
import Modal from '@/components/Modal/modal';
import { CircularProgress } from '@mui/material';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { toast } from "react-toastify"
interface Props {
    aboutInfo: any,
    params: any
}

const Followers: FC<Props> = ({ aboutInfo, params }) => {
    // console.log("aboutInfo", aboutInfo);
    const cookies = { value: getCookie("uid") };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient()
    const [showAllRequests, setShowAllRequests] = useState(false);

    const { data: startUpData } = useQuery({
        queryKey: ["startUpData"],
        queryFn: () => getStartUpData(cookies),
    });

    const { data: pendingRequestsData } = useQuery({
        queryKey: ["pendingRequestsData"],
        queryFn: () => fetchPendingFollowRequests(cookies),
    });
    // console.log("followersData", pendingRequestsData);

    const { data: acceptedRequestsData } = useQuery({
        queryKey: ["acceptedRequestsData"],
        queryFn: () => fetchAcceptedFollowRequests(cookies),
    });
    // console.log("AcceptedRequestsData", acceptedRequestsData);

    const onRemoveHandler = async (data: any) => {
        // console.log("from remove", data);
        setIsModalOpen(true)
        try {
            const docid = data?.id;
            if (docid) {
                const refDoc = doc(db, "startups", docid, "following", aboutInfo?.id);
                await deleteDoc(refDoc)
            }
            const followersId = aboutInfo?.id;
            if (followersId) {
                const refDoc = doc(db, "startups", followersId, "followers", data?.id);
                await deleteDoc(refDoc)
            }
            await queryClient.invalidateQueries({ queryKey: ['acceptedRequestsData'] })
            await queryClient.refetchQueries({ queryKey: ['acceptedRequestsData'] })
            setIsModalOpen(false)
            toast.success("Removed.");
        } catch (err) {
            setIsModalOpen(false)
            toast.error("Something went wrong!")
        }
    };

    const onAcceptHandler = async (data: any) => {
        // console.log("onAcceptHandler", data);
        setIsModalOpen(true)
        try {
            const docid = aboutInfo?.id;
            if (docid) {
                const docRef = doc(db, `startups/${aboutInfo?.id}/followers/${data?.id}`);
                await setDoc(docRef, { status: "accepted" }, { merge: true });
            }
            const followersId = data?.id;
            if (followersId) {
                const followersDocRef = doc(db, `startups/${data?.id}/following/${aboutInfo?.id}`);
                await setDoc(followersDocRef, { status: "accepted" }, { merge: true });
            }
            await queryClient.invalidateQueries({ queryKey: ['pendingRequestsData'] })
            await queryClient.refetchQueries({ queryKey: ['pendingRequestsData'] })
            await queryClient.invalidateQueries({ queryKey: ['acceptedRequestsData'] })
            await queryClient.refetchQueries({ queryKey: ['acceptedRequestsData'] })
            setIsModalOpen(false)
            toast.success("Accepted.");
        } catch (err) {
            setIsModalOpen(false)
            toast.error("Something went wrong!")
        }
    }

    const onRejectHandler = async (data: any) => {
        // console.log("onAcceptHandler", data);
        setIsModalOpen(true)
        try {
            const docid = aboutInfo?.id;
            if (docid) {
                // console.log("inside first  if");

                const docRef = doc(db, `startups/${aboutInfo?.id}/followers/${data?.id}`);
                await setDoc(docRef, { status: "declined" }, { merge: true });
            }
            const followersId = data?.id;
            if (followersId) {
                // console.log("inside second if");

                const followersDocRef = doc(db, `startups/${data?.id}/following/${aboutInfo?.id}`);
                await setDoc(followersDocRef, { status: "declined" }, { merge: true });
            }
            await queryClient.invalidateQueries({ queryKey: ['pendingRequestsData'] })
            await queryClient.refetchQueries({ queryKey: ['pendingRequestsData'] })
            setIsModalOpen(false)
            toast.success("Declined.");
        } catch (err) {
            setIsModalOpen(false)
            toast.error("Something went wrong!")
        }
    }
    return (
        <div className=' w-full bg-[#F8FAFC] xl:px-8 px-4  sm:py-7 py-4 flex flex-col gap-8'>
            {pendingRequestsData && pendingRequestsData.length > 0 && (
                <div>
                    <div className='flex flex-col gap-6'>
                        <div className=' flex justify-between'>
                            <h1 className='text-primary text-base font-semibold'>
                                {/* {`Pending Requests (${showAllRequests ? pendingRequestsData.length : 2})`} */}
                                {`Pending Requests (${pendingRequestsData.length})`}
                            </h1>
                            {pendingRequestsData.length > 2 && (
                                <button
                                    onClick={() => setShowAllRequests(!showAllRequests)}
                                    className={`underline ${showAllRequests ? "text-black" : 'text-primary'}`}
                                >
                                    {showAllRequests ? 'Show Less' : 'View All'}
                                </button>
                            )}
                        </div>
                        <div className='flex flex-col gap-6'>
                            {pendingRequestsData && pendingRequestsData.length > 0 &&
                                pendingRequestsData.slice(0, showAllRequests ? pendingRequestsData.length : 2).map((follower: any, idx: number) => (
                                    <div key={idx}>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-x-4'>
                                                <div className='sm:h-16 sm:w-16 h-12 w-12 rounded-full '>
                                                    <Image src={follower?.coverPic?.url ? follower?.coverPic?.url : avatarimg} alt="" width={1000} height={1000} className='w-[100%] h-[100%] object-fill rounded-full ' />
                                                </div>
                                                <h3 className='sm:text-base text-sm'>{follower.name}</h3>
                                            </div>
                                            <div className='flex sm:gap-4 gap-2'>
                                                <button
                                                    onClick={async () => await onAcceptHandler(follower)}
                                                    className='bg-primary text-white h-fit sm:py-2 py-1 sm:px-4 px-3 rounded-md sm:text-sm text-xs'>Accept</button>
                                                <button
                                                    onClick={async () => await onRejectHandler(follower)}
                                                    className='bg-black text-white h-fit sm:py-2 py-1 sm:px-4 px-3 rounded-md sm:text-sm text-xs'>Reject</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
            <div className=' flex flex-col gap-6'>
                <h1 className='w-full  text-primary text-base font-semibold'>Followers</h1>
                {
                    acceptedRequestsData && acceptedRequestsData.length > 0 ?
                        (
                            <div className='flex flex-col gap-6'>
                                {
                                    acceptedRequestsData && acceptedRequestsData.length > 0 && acceptedRequestsData.map((follower: any, idx: number) => {
                                        return <div key={idx}>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center gap-x-4'>
                                                    <div className='sm:h-16 sm:w-16 h-12 w-12 rounded-full '>
                                                        <Image src={follower?.coverPic?.url ? follower?.coverPic?.url : avatarimg} alt="" width={1000} height={1000} className='w-[100%] h-[100%] object-fill rounded-full ' />
                                                    </div>
                                                    <h3 className='sm:text-base text-sm'>{follower.name}</h3>
                                                </div>
                                                <div className='flex gap-4'>
                                                    <button
                                                        onClick={async () => await onRemoveHandler(follower)}
                                                        className='bg-black text-white h-fit sm:py-2 py-1 sm:px-4 px-3 rounded-md text-sm'>Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        )
                        :
                        (
                            <div className='w-full flex justify-center  h-[10vh] items-center text-primary text-base'>
                                <h2>No followers yet !</h2>
                            </div>
                        )
                }
            </div>
            <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <CircularProgress className="!text-white"></CircularProgress>
                    <p className="text-white font-medium text-lg">
                        Processing..
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default Followers