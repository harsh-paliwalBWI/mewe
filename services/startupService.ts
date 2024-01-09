// import { log } from "console";
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
    // console.log("uid from getStartUpData",uid);

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
    // console.log("uid fetchBusinessAccountDetails",uid);

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

export const fetchSingleStartup = async (slug: any) => {

    const product = await getDocs(query(collection(db, "startups"), where('slug.name', '==', slug))).then((val: QuerySnapshot) => {
        if (val.docs.length != 0) {
            return { ...val?.docs[0].data(), id: val.docs[0].id };
        } else {
            return null;
        }
    })

    return JSON.parse(JSON.stringify(product));
}

export const fetchSingleStartupAdvanceDetails = async (sinlgeId: any) => {
    // console.log(sinlgeId,"----------");


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

export const fetchSavedStartUps = async (cookieData: any) => {
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


    if (uid) {
        const docRef = doc(db, "startups", uid);
        const docSnap = await getDoc(docRef);
        let savedStartupsArray: any
        if (docSnap.exists()) {
            //   console.log("Document data:", docSnap.data());
            let data = docSnap.data()
            //   console.log("data",data);
            savedStartupsArray = data.savedStartups.map(async (item: any, idx: number) => {
                // console.log(item?.id,"item");

                const docRef1 = doc(db, `startups/${item?.id}`);
                const docSnap1 = await getDoc(docRef1);

                if (docSnap1.exists()) {
                    //   console.log("Document data from docSnap1:", docSnap1.data());
                    return await JSON.parse(JSON.stringify({ ...docSnap1.data(), id: docSnap1.id }));
                    //   return docSnap1.data()
                } else {
                    console.log("No such document!");

                    return null
                    // docSnap.data() will be undefined in this case
                }
            })

            //  console.log("savedStartupsArray",savedStartupsArray);
            return await Promise.all(savedStartupsArray)
        } else {
            // docSnap.data() will be undefined in this case
            //   console.log("No such document!");
        }
        const savedStartupsData = await Promise.all(savedStartupsArray)
        return savedStartupsData
    } else {
        return null
    }
}

export const fetchAllFollowingsData = async (cookieData: any) => {
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
    if (uid) {
        const querySnapshot = await getDocs(collection(db, `startups/${uid}/following`));
        let arr: any = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots\
            let data = JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
            arr.push(data)
            //   console.log(doc.id, " => ", doc.data());
        });
        return arr;
    } else {
        return null;
    }
};
export const fetchPendingFollowRequests = async (cookieData: any) => {
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
    // let docId=id
    if (uid) {
        const querySnapshot1 = query(collection(db, `startups/${uid}/followers`), where('status', '==',"pending"));
        const querySnapshot = await getDocs(querySnapshot1);
        let arr: any = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots\
            let data = JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
            arr.push(data)
            //   console.log(doc.id, " => ", doc.data());
        });
        return arr;
    } else {
        return null;
    }
};
export const fetchAcceptedFollowRequests = async (cookieData: any) => {
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
    // let docId=i
    if (uid) {
        const querySnapshot1 = query(collection(db, `startups/${uid}/followers`), where('status', '==',"accepted"));
        const querySnapshot = await getDocs(querySnapshot1);
        let arr: any = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots\
            let data = JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
            arr.push(data)
            //   console.log(doc.id, " => ", doc.data());
        });
        return arr;
    } else {
        return null;
    }
};

export const fetchAcceptedFollowings = async (cookieData: any) => {
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
    // let docId=id
    if (uid) {
        const querySnapshot1 = query(collection(db, `startups/${uid}/following`), where('status', '==',"accepted"));
        const querySnapshot = await getDocs(querySnapshot1);
        let arr: any = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots\
            let data = JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
            arr.push(data)
            //   console.log(doc.id, " => ", doc.data());
        });
        return arr;
    } else {
        return null;
    }
};

export const fetchPendingFollowings = async (cookieData: any) => {
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
    // let docId=id
    if (uid) {
        const querySnapshot1 = query(collection(db, `startups/${uid}/following`), where('status', '==',"pending"));
        const querySnapshot = await getDocs(querySnapshot1);
        let arr: any = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots\
            let data = JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
            arr.push(data)
            //   console.log(doc.id, " => ", doc.data());
        });
        return arr;
    } else {
        return null;
    }
};

// export const getTaggedStartupsData=async(cookieData: any)=>{
//     let cookie;
//     if (cookieData) {
//         cookie = cookieData;
//     } else {
//         cookie = { value: getCookie('uid') }
//     }
//     let uid;
//     if (cookie?.value) {
//         uid = cookie?.value;
//     }
//     // let docId=id
//     if (uid) {
//         const querySnapshot1 = query(collection(db, `startups/${uid}/following`), where('status', '==',"accepted"));
//         const querySnapshot = await getDocs(querySnapshot1);
//         let arr: any = []
//         querySnapshot.forEach(async(docs) => {
//             console.log("id",docs.id);
            
           
//             // let data = JSON.parse(JSON.stringify({ ...docs.data(), id: docs.id }))
//             // arr.push(data)

//             const docRef = doc(db, "startups", `${docs.id}`);
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//     let taggedStartupData = JSON.parse(JSON.stringify({ ...docSnap.data(), id: docSnap.id }))
//   console.log("Document data inside if:", docSnap.data());
//   arr.push(taggedStartupData)

// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
           
//         });
//         console.log(arr,"arr");
        
//         return arr;
//     } else {
//         return null;
//     }

// }

export const getTaggedStartupsData = async (cookieData: any) => {
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

    if (uid) {
        const querySnapshot1 = query(collection(db, `startups/${uid}/following`), where('status', '==', "accepted"));
        const querySnapshot = await getDocs(querySnapshot1);

        // Use Promise.all to wait for all promises to resolve
        const arr = await Promise.all(querySnapshot.docs.map(async (docs) => {
            const docRef = doc(db, "startups", docs.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let taggedStartupData = JSON.parse(JSON.stringify({ ...docSnap.data(), id: docSnap.id }))
                // console.log("Document data inside if:", docSnap.data());
                return taggedStartupData;
            } else {
                // console.log("No such document!");
                return null;
            }
        }));

        // console.log(arr, "arr");
        return arr.filter(Boolean); // Remove null values from the array
    } else {
        return null;
    }
}
