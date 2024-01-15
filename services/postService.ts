import { auth, db } from "../config/firebase-config";
import { collection, getDocs,query,where,orderBy } from "firebase/firestore";

export const fetchPosts = async (startupId:any) => {
  const id=auth.currentUser?.uid
  console.log(startupId, "bb")
  const querySnapshot = query(collection(db, `posts`), where('createdBy.id', '==', startupId), 
  // orderBy('createdAt', 'desc')
  );

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

const fetchSpecificPostComments=async(docId:any)=>{
  const querySnapshot = await getDocs(collection(db, `posts/${docId}/comments`));
  const arr:any=[]
querySnapshot.forEach((doc) => {
  const dataObj=doc.data()
  arr.push(dataObj)
});
// console.log(arr,"commeyn arr");
}

export const fetchAllPosts = async () => {

  const querySnapshot = query(collection(db, `posts`), orderBy('createdAt', 'desc'));

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


// main.js


export const fetchPostsByCategory = async (categoryName:any) => {
  try {
    console.log(categoryName, "zzzzzzzzz");

    const postsRef = collection(db, 'posts');
    const postsQuery = query(
      postsRef,
      where('category.name', '==', categoryName),
      // orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(postsQuery);

    console.log('Raw querySnapshot:', querySnapshot);

    const arr = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    console.log('Fetched posts:', arr);

    return arr;
  } catch (error) {
    console.error('Error fetching documents:', error);

    throw error;
  }
};








