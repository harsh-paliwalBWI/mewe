import { doc, getDoc } from "firebase/firestore";
import { db, firebaseConfig } from "./firebase-config";

export function typesense_initClient() {
  return new Promise(async (resolve, reject) => {
    try {
      const obj = (await getDoc(doc(db, "settings", "typesense"))).data();
      const env=obj?.credential;
    //   console.log(env, "ttt")
      const Typesense = require("typesense");
      let typesenseClient = new Typesense.Client({
        nodes: [
          {
            host: env?.host,
            port: env?.port,
            protocol: env?.protocol,
          },
        ],
        apiKey: env?.searchOnlyKey,
        connectionTimeoutSeconds: 2,
      });
      resolve(typesenseClient);
    } catch (error) {
      console.log("error in initialising typesense client");
      resolve(null);
    }
  });
}

export async function handleTypesenseSearch(query: string) {
  const client: any = await typesense_initClient();
  if (client) {
    const searchParameters = {
      q: query,
      query_by: "name, basic.category.name, basic.city",
    };
    let projectId = firebaseConfig?.projectId;

    try {
      const data = await client
        .collections(`${projectId}-startups`)
        .documents()
        .search(searchParameters);


        console.log(data, "fff")
      if (data && data?.hits) {
        let arr = [];
        for (const singlestartup of data?.hits) {
            // if (singlestartup?.document?.active) {
            //     // if (singlestartup?.document?.isPriceList) {
            //     //     let priceList = JSON.parse(singlestartup?.document?.priceList);
            //     //     arr.push({ ...singlestartup?.document, priceList })
            //     // } else {
            //         arr.push(singlestartup?.document)
            //     // }
            // }

            // if (!('blockedByAdmin' in singlestartup?.document) || singlestartup?.document?.blockedByAdmin) {
            //     // Push document data to array
            //     arr.push(singlestartup?.document);
            //   }
            
              if (!singlestartup?.document?.blockedByAdmin) {
                // Push document data to array
                arr.push(singlestartup?.document);
              }
              
        }
        return arr;
      }
      return data;
    } catch (error) {
      console.log(error, "error INSIDE CATCH");
      return [];
    }
  }
}


