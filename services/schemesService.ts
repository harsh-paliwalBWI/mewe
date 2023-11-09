// import { log } from "console";
import {auth,db} from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const fetchSchemes=async()=>{
    const querySnapShot=await getDocs(collection(db,"schemes"))
    let arr:any=[]
    querySnapShot.forEach((doc)=>{
        // console.log(doc.id,"id------");
        // console.log(doc.data(),"------");
        const serializedData=JSON.parse(JSON.stringify(doc.data()))
        // console.log("serializedData",serializedData);
        
        arr.push(serializedData)
    })
    return arr
}