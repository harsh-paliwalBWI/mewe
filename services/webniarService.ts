import { auth, db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const fetchWebniars = async () => {
  const querySnapShot = await getDocs(collection(db, "webinars"));
  let arr: any = [];
  querySnapShot.forEach((doc) => {
//  console.log(doc.data,"iiii")
    arr.push(doc.data());
  });
  return arr;


//   return await getDocs(collection(db, 'webinars')).then((val) => {
//     if (val.docs.length === 0) return null;
//     let arr = [];
//     for (const webniar of val.docs) {
//         arr.push({ ...webniar.data(), id: webniar.id })
//     }

//     return arr;
// });


};
