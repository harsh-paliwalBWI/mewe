import { db } from "@/config/firebase-config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getCookie } from "cookies-next";

export const fetchAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const arr: any = []
    querySnapshot.forEach((doc) => {
        const data = JSON.parse(JSON.stringify({ ...doc.data()}))
        //   console.log(data,"------------");
        arr.push(data)
    });
    return arr
}