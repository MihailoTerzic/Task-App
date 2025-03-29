import { Account, Client, Databases } from "react-native-appwrite";



const envs = {
     PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
     ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
     DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
     COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID
}

const client = new Client()
.setEndpoint(envs.ENDPOINT)
.setProject(envs.PROJECT_ID)
    .setPlatform('terminiandroid');

    const database = new Databases(client)

    const account = new Account(client)

    export {database,account,client,envs}
    

