import { auth, db } from "../config/firebase-config";
import { collection, getDocs,query,where,orderBy } from "firebase/firestore";

export const fetchPosts = async () => {
  const id=auth.currentUser?.uid
  const querySnapshot = query(collection(db, `posts`), where('createdBy.id', '==', id), orderBy('createdAt', 'desc'));

  const res = await getDocs(querySnapshot);
  let arr: any = [];
//  get comment start 

// const querySnapshot2 = await getDocs(collection(db, `posts/${docId}/comments`));

// ebd 
  res.forEach((doc) => {
//  console.log(doc.data(),doc.id,"iiii")
 let obj={...doc.data(),id:doc.id}
//  console.log(obj,"obj");
    arr.push(obj);
  });
  return arr;


};

const fetchSpecificPostComments=async(docId:any)=>{
  const querySnapshot = await getDocs(collection(db, `posts/${docId}/comments`));
  const arr:any=[]
querySnapshot.forEach((doc) => {
  const dataObj=doc.data()
  arr.push(dataObj)
});
// console.log(arr,"commeyn arr");
}

