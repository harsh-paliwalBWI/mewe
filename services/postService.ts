import { auth, db } from "../config/firebase-config";
import { collection, getDocs,query,where,orderBy } from "firebase/firestore";

export const fetchPosts = async () => {
  const id=auth.currentUser?.uid
  const querySnapshot = query(collection(db, `posts`), where('createdBy.id', '==', id), orderBy('createdAt', 'desc'));

  const res = await getDocs(querySnapshot);
  let arr: any = [];
  res.forEach((doc) => {
//  console.log(doc.data,"iiii")
    arr.push(doc.data());
  });
  return arr;


};


