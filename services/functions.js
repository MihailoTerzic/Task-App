import { ID, Query } from "react-native-appwrite";
import { account,database,client,envs } from "./config";



export  const getData = async ()=> {

    try {
        const result = await database.listDocuments(envs.DATABASE_ID,envs.COLLECTION_ID,[ Query.orderAsc('date')])
      //  console.log(result.documents)
        return result.documents
    } catch (error) {
        console.error(error)
    }
}

export const createTask = async (data)=> {
    
    try {
          await database.createDocument(envs.DATABASE_ID, envs.COLLECTION_ID,ID.unique(),data)
    }
    catch(error) {
        console.error(error)
    }
}

export const editTask = async(data,id)=> {
    try {
        await database.updateDocument(envs.DATABASE_ID,envs.COLLECTION_ID,id,data)
    } catch (error) {
        console.error(error)
    }
}

export const deleteTask = async(id)=> {
    
    try {
        await database.deleteDocument(envs.DATABASE_ID,envs.COLLECTION_ID,id)
    } catch (error) {
        console.error(error)
    }
}

export const perDateTask = async (date)=> {
   // console.log('Date that is passed',date)
   const startOfDay = `${date}T00:00:00.000+00:00`; // Start of the day
   const endOfDay = `${new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString().split('T')[0]}T00:00:00.000+00:00`; // End of the day
    try {


      //  const result = await database.listDocuments(envs.DATABASE_ID,envs.COLLECTION_ID,[Query.startsWith('date', '2025-04-01')])
     //   const result = await database.listDocuments(envs.DATABASE_ID,envs.COLLECTION_ID,[Query.startsWith('date', '2025-04-01T22:03:00.000+00:00')]) 
     const result = await database.listDocuments(
        envs.DATABASE_ID,
        envs.COLLECTION_ID,
        [
          Query.greaterThan('date', startOfDay),
          Query.lessThan('date', endOfDay),
          Query.orderAsc('date')
        ])  
   //  console.log('Fetched data', result.documents)
        return result.documents
    } catch (error) {
        console.error(error)
    }
}

