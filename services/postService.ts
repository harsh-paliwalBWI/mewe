import { auth, db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const fetchPosts = async () => {
  const querySnapShot = await getDocs(collection(db, "posts"));
  let arr: any = [];
  querySnapShot.forEach((doc) => {
//  console.log(doc.data,"iiii")
    arr.push(doc.data());
  });
  return arr;


};
