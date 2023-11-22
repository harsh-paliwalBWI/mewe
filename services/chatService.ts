import { auth, db } from "@/config/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import avatarimg from "../images/avatar.png"

export const handleSearch = async (username: any) => {
  return new Promise(async (resolve) => {
    const q = query(collection(db, "startups"), where("name", "==", username));
    // console.log(q, "hhh");
    const querySnapshot = q;
    const res = await getDocs(querySnapshot);
    // console.log(res.docs.length);
    if (res.docs) {
      let arr = [];
      for (const startupn of res.docs) {
        const data: any = startupn.data();
        arr.push({ ...data, id: startupn?.id });
      }
      // console.log(arr);
      resolve({ status: true, arr });
    }

    return resolve({
      status: false,
    });
  });
};

export const getDataofstartup = async (selectedUser: any) => {
    if (selectedUser) {
      const docRef = doc(db, "startups", selectedUser);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return JSON.parse(JSON.stringify({ ...docSnap.data(), id: docSnap.id }));
      } else {
        return false;
      }
    } else {
      return null;
    }
  };

export const handleSelect = async (selectedUser: any) => {
  // console.log((selectedUser), "---------");
  const currentUser = auth.currentUser?.uid;
  try {
    const q = doc(db, `chat/ ${currentUser}/startups/${selectedUser}`);
    const res = await getDoc(q);

    if (!res.exists()) {
      const otherstartupdata = await getDataofstartup(selectedUser);
      console.log(otherstartupdata,"hhhhhhhhh")
      let chatstartup = {
        coverPic: (otherstartupdata?.basic?.coverPic?.url)? otherstartupdata?.basic?.coverPic?.url:avatarimg,
        lastMsgAt: Date(),
        name: otherstartupdata?.name,
        lastMsg: "",
        totalUnReads: 0,
      };
      let chatobj = {
        totalUnreads: 0,
      };

      // let msgarr: {
      //     lastMsgAt: Date(),
      //     type: 'text',
      //     msg: "",
      //     by: "",
      // }

      const mainDoc = await getDoc(doc(db, `chat/${currentUser}`));
      if (!mainDoc.exists()) {
        await setDoc(doc(db, `chat/${currentUser}`), chatobj, {
          merge: true,
        });
      }

      await setDoc(
        doc(db, `chat/${currentUser}/startups/${selectedUser}`),
        chatstartup,
        {
          merge: true,
        }
      );
    }
    
      // else {

      //   const otherstartupdata = await getDataofstartup(selectedUser);
      //   console.log(otherstartupdata)
      //   let chatstartup = {
      //     coverPic: (otherstartupdata?.basic?.coverPic?.url)? otherstartupdata?.basic?.coverPic?.url:avatarimg,
      //     lastMsgAt: Date(),
      //     name: otherstartupdata?.name,
      //     lastMsg: "",
      //     totalUnReads: 0,
      //   };
      //   let chatobj = {
      //     totalUnreads: 0,
      //   };
  
      //   // let msgarr: {
      //   //     lastMsgAt: Date(),
      //   //     type: 'text',
      //   //     msg: "",
      //   //     by: "",
      //   // }
  
      //   const mainDoc = await getDoc(doc(db, `chat/${currentUser}`));
      //   if (!mainDoc.exists()) {
      //     await setDoc(doc(db, `chat/${currentUser}`), chatobj, {
      //       merge: true,
      //     });
      //   }
  
      //   await setDoc(
      //     doc(db, `chat/${currentUser}/startups/${selectedUser}`),
      //     chatstartup,
      //     {
      //       merge: true,
      //     }
      //   );

      // }
  } catch (err) {
    // console.log(err,"yyyyyy")
  }

  //   setUser(null);
  // setUsername("");
};

export const NewCreation = async (selectedUser: any, currentUser: any) => {
  try {
    const q = doc(db, `chat/ ${selectedUser}/startups/${currentUser}`);
    const res = await getDoc(q);

    if (!res.exists()) {
      const otherstartupdata = await getDataofstartup(currentUser);

      let chatstartup = {
        coverPic: otherstartupdata?.basic?.coverPic?.url,
        lastMsgAt: Date(),
        name: otherstartupdata?.name,
        lastMsg: "",
        totalUnReads: 0,
      };
      let chatobj = {
        totalUnreads: 0,
      };

      const mainDoc = await getDoc(doc(db, `chat/${selectedUser}`));
      if (!mainDoc.exists()) {
        await setDoc(doc(db, `chat/${selectedUser}`), chatobj, {
          merge: true,
        });
      }

      await setDoc(
        doc(db, `chat/${selectedUser}/startups/${currentUser}`),
        chatstartup,
        {
          merge: true,
        }
      );
    }





  } catch (err) {}
};


export const getDisplayDate = (dateString: string) => {
  const messageDate = new Date(dateString);
  const currentDate = new Date();

  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Today";
  } else if (
    messageDate.getDate() === currentDate.getDate() - 1 &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Yesterday";
  } else {
    return `${
      messageDate.getMonth() + 1
    }/${messageDate.getDate()}/${messageDate.getFullYear()}`;
  }
};
