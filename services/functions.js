import { ID } from "react-native-appwrite";
import { account,database,client,envs } from "./config";



export  const getData = async ()=> {

    try {
        const result = await database.listDocuments(envs.DATABASE_ID,envs.COLLECTION_ID,[])
      //  console.log(result.documents)
        return result.documents
    } catch (error) {
        console.error(error)
    }
}

export const createTask = async (data)=> {
    try {
          await database.createDocument(envs.DATABASE_ID, envs.COLLECTION_ID, ID.unique(),data)
    }
    catch(error) {
        console.error(error)
    }
}

