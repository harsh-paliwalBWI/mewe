import { db } from "@/config/firebase-config";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getCookie } from "cookies-next";

export const fetchAllStartUps = async () => {
    const querySnapshot = await getDocs(collection(db, "startups"));
    const arr: any = []
    querySnapshot.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data(), docId: doc.id }))
        //   console.log(data,"------------");
        arr.push(data)
    });
    return arr
}

export const fetchAllWebinars = async () => {
    const querySnapshot = await getDocs(collection(db, "webinars"));
    const arr: any = []
    querySnapshot.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data(), docId: doc.id }))
        //   console.log(data,"------------");
        arr.push(data)
    });
    return arr
}

export const fetchStartUpsabout = async () => {
    const querySnapshot = await getDocs(collection(db, "startups"));
    const arr: any = []
    querySnapshot.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data(), docId: doc.id }))
        //   console.log(data,"------------");
        arr.push(data)
    });
    return arr
}

export const fetchAllMatchedCategoriesStartups = async (params:any) => {
    console.log(params?.params?.params?.slug,"from fetchAllMatchedCategoriesStartups--------------");
    
const category=params?.params?.params?.slug
    const querySnapshot = query(collection(db, `startups`), where('basic.category.name', '==', category));

    const res = await getDocs(querySnapshot);
    // const querySnapshot = await getDocs(collection(db, "startups"));
    console.log(res,"res");
    
    const arr: any = []
    res.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data(),id:doc.id }))
        //   console.log(data,"------------");
        arr.push(data)
    });
    return arr
}

