import { db } from "@/config/firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const fetchAllPlans = async () => {

    const querySnapshot = query(collection(db, `paymentPlans`));
  
    const res = await getDocs(querySnapshot);
    let arr: any = [];
    res.forEach((doc) => {
  //  console.log(doc.data(),doc.id,"iiii")
   let obj={...doc.data(),id:doc.id}
  //  console.log(obj,"obj");
      arr.push(obj);
    });
    return arr;
  
  
  };