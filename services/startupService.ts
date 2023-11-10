
import { log } from "console";
import {auth,db} from "../config/firebase-config";
import { collection, getDocs,doc,getDoc, addDoc, setDoc } from "firebase/firestore";

export const getStartUpData = async () => {
    // console.log(cookieData,"ghdhfdh-------");

    // let cookie;

    // if (cookieData) {
    //     cookie = cookieData;
    // } else {
    //     cookie = { value: getCookie('uid') }
    // }
    // console.log(cookie,"cookie");

    let uid;
    // console.log(auth,"auth");

    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
    }
    // console.log(uid,"uid ----------")
    // if (cookie?.value) {
    //     uid = cookie?.value;
    // }

    if (uid) {
        const docRef = doc(db, "startups", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log({ ...docSnap.data(), id: docSnap.id },"from function");
            
            return JSON.parse(JSON.stringify({ ...docSnap.data(), id: docSnap.id }));
        } else {
            return false;
        }
    } else {
        return null;
    }
   
};

export const addAdvanceDetails=async(advanceDetails:any)=>{
    const refDoc = doc(db, `startups/${auth.currentUser?.uid}/details/advance`);
   return await setDoc(refDoc, advanceDetails, { merge: true });  
}
 
export const fetchBusinessAccountDetails=async()=>{
    // console.log("hii");
    const docRef = doc(db,`startups/${auth.currentUser?.uid}/details/advance`);
 const data=await getDoc(docRef).then((docs)=>{
        if (docs.exists()) {
        return  {...docs.data()}
      } else {
        return null
      }
})
return  JSON.parse(JSON.stringify(data));
}