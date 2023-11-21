import { auth, db } from "../config/firebase-config";
import { getCookie } from "cookies-next";
import { collection, getDocs, doc, getDoc, addDoc, setDoc } from "firebase/firestore";

export const getStartUpData = async (cookieData: any) => {
    let cookie;
    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie('uid') }
    }


    let uid;
    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
    }
    if (cookie?.value) {
        uid = cookie?.value;
    }
    // console.log(uid,"uid");

    if (uid) {
        const docRef = doc(db, "startups", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return await JSON.parse(
                JSON.stringify({ ...docSnap.data(), id: docSnap.id })
            );
        } else {
            console.log("No such document!");
            return false;
        }
    } else {
        return null;
    }
};

// export const addAdvanceDetails = async (advanceDetails: any,email:any) => {
//     console.log(advanceDetails,email);

//     const refDoc = doc(db, `startups/${auth.currentUser?.uid}/details/advance`);
//     const refDoc2 = doc(db, `startups/${auth.currentUser?.uid}`);
//     const details = {
//         name: advanceDetails.name,
//         email:email,
//         basic: {
//             name: advanceDetails.name,
//             category: {
//                 id: advanceDetails.category.id,
//                 name: advanceDetails.category.name,
//             },
//         },
//     };
//     await setDoc(refDoc2, details, { merge: true });
//     // await setDoc(refDoc, advanceDetails, { merge: true });
// };

export const isBusinessAccountExistOrNot = async (cookieData: any) => {
    let cookie;
    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie("uid") };
    }
    let uid;
    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
    }
    if (cookie) {
        uid = cookie;
    }
    if (cookie?.value) {
        uid = cookie?.value;
    }
    if (uid) {
        const docRef = doc(db, `startups/${uid}/details/advance`);
        const data = await getDoc(docRef).then((docs) => {
            if (docs.exists()) {
                return true;
            } else {
                return false;
            }
        });
        return data;
    } else {
        return false
    }

};

export const fetchBusinessAccountDetails = async (cookieData: any) => {
    let cookie;
    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie("uid") };
    }
    let uid;
    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
    }
    if (cookie) {
        uid = cookie;
    }
    if (cookie?.value) {
        uid = cookie?.value;
    }
    const docRef = doc(db, `startups/${uid}/details/advance`);
    const data = await getDoc(docRef).then(async (docs) => {
        if (docs.exists()) {
            return await JSON.parse(JSON.stringify({ ...docs.data() }));
        } else {
            return null;
        }
    });
    return data;
};
