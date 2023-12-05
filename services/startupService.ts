import { log } from "console";
import { auth, db } from "../config/firebase-config";
import { getCookie } from "cookies-next";
import { collection, getDocs, doc, getDoc, addDoc, setDoc, query, where, QuerySnapshot } from "firebase/firestore";

export const getStartUpData = async (cookieData: any) => {
    let cookie;
    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie('uid') }
    }
    let uid;
    // if (auth.currentUser?.uid) {
    //     uid = auth.currentUser?.uid;
    // }
    if (cookie?.value) {
        uid = cookie?.value;
    }
    console.log("uid from getStartUpData",uid);

    if (uid) {
        const docRef = doc(db, "startups", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return await JSON.parse(JSON.stringify({ ...docSnap.data(), id: docSnap.id }));
        } else {
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
        cookie = { value: getCookie('uid') }
    }
    let uid;
    if (cookie?.value) {
        uid = cookie?.value;
    }
    // console.log("uid isBusinessAccountExistOrNot",uid);
    
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
        cookie = { value: getCookie('uid') }
    }
    let uid;
    if (cookie?.value) {
        uid = cookie?.value;
    }
    console.log("uid fetchBusinessAccountDetails",uid);

    if (uid) {
        const docRef = doc(db, `startups/${uid}/details/advance`);
        const data = await getDoc(docRef).then(async (docs) => {
            if (docs.exists()) {
                // console.log("logged data", JSON.parse(JSON.stringify({ ...docs.data() })));
                return await JSON.parse(JSON.stringify({ ...docs.data() }));
            } else {
                return null;
            }
        });
        return data;
    } else {
        return null;
    }

};

export const fetchSingleStartup = async (slug:any) => {

    const product = await getDocs(query(collection(db, "startups"), where('slug.name', '==', slug))).then((val: QuerySnapshot) => {
        if (val.docs.length != 0) {
            return { ...val?.docs[0].data(), id: val.docs[0].id };
        } else {
            return null;
        }
    })

    return JSON.parse(JSON.stringify(product));
}

export const fetchSingleStartupAdvanceDetails = async (sinlgeId:any) => {
    console.log(sinlgeId,"----------");
    

    if (sinlgeId) {
        const docRef = doc(db, `startups/${sinlgeId}/details/advance`);
        const data = await getDoc(docRef).then(async (docs) => {
            if (docs.exists()) {
                // console.log("logged data", JSON.parse(JSON.stringify({ ...docs.data() })));
                return await JSON.parse(JSON.stringify({ ...docs.data() }));
            } else {
                return null;
            }
        });
        return data;
    } else {
        return null;
    }
}
