import { db } from "@/config/firebase-config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
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

