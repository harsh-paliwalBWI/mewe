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
import avatarimg from "../images/avatar.png";
import { getCookie } from "cookies-next";

const currUser = auth.currentUser;

export const handleSearch = async (username: any, cookieData: any) => {
  let cookie;
  if (cookieData) {
    cookie = cookieData;
  } else {
    cookie = { value: getCookie("uid") };
  }
  let uid: any;
  if (cookie?.value) {
    uid = cookie?.value;
  }

  return new Promise(async (resolve) => {
    // console.log(uid, "curr");

    if (uid) {
      const userDocRef = doc(db, "startups", uid);
      const followingCollectionRef = collection(userDocRef, "following");
      const followingQuery = query(
        followingCollectionRef,
        where("status", "==", "accepted")
      );

      const followingDocs = await getDocs(followingQuery);

      if (!followingDocs.empty) {
        const filteredStartups = followingDocs.docs
          .filter((doc) => doc.data().name.includes(username))
          .map((doc) => {
            const f = doc.data();
            return { ...f, id: doc.id };
          });

        resolve({ status: true, arr: filteredStartups });
      } else {
        resolve({ status: false, arr: [] });
      }
    } else {
      resolve({ status: false });
    }
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

export const NewCreation = async (selectedUser: any, currentUser: any) => {
  // console.log(selectedUser, "selectedUser");
  // console.log(currentUser, "currentUser");
  try {
    const q = doc(db, `chat/${selectedUser}/startups/${currentUser}`);
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
