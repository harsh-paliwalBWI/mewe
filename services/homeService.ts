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

export const fetchCategoryStartUps = async (categoryname: any) => {
    
//    console.log(categoryname,"kkkk")
    const startupsQuery = query(collection(db, "startups"), where("basic.category.name", "==", categoryname));
    const querySnapshot = await getDocs(startupsQuery);

    const filteredStartups: any[] = [];

    querySnapshot.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data(), docId: doc.id }));
        filteredStartups.push(data);
    });

    return filteredStartups;
    console.log(filteredStartups,"nnnnnnnnn")
};

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

export const fetchAllNewsletters = async () => {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const arr: any = []
    querySnapshot.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data(), docId: doc.id }))
        //   console.log(data,"------------");
        arr.push(data)
    });
    return arr
}

export const fetchAllMatchedCategoriesStartups = async (params:any) => {
    // console.log(params?.params?.params?.slug,"from fetchAllMatchedCategoriesStartups--------------");
const category=params?.params?.params?.slug.split("-").join(" ")
// console.log(category,"-----");
    const querySnapshot = query(collection(db, `startups`), where('basic.category.name', '==', category));
    const res = await getDocs(querySnapshot);
    const arr: any = []
    res.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data(),id:doc.id }))
        //   console.log(data,"------------");
        arr.push(data)
    });
    return arr
}


// export const fetchAllMatchedCategory = async (params:any) => {

// const category=params?.params?.params?.slug.split("-").join(" ")
// // console.log(category,"-----");
//     const querySnapshot = query(collection(db, `categories`), where('name', '==', category));
//     const res = await getDocs(querySnapshot);
//     const arr: any = []
//     res.forEach((doc) => {
//         const data = JSON.parse(JSON.stringify({ ...doc.data(),id:doc.id }))
//         //   console.log(data,"------------");
//         arr.push(data)
//     });
//     return arr
// }

