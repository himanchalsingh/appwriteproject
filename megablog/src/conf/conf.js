// 

const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),//for always get a string value 
    appwriteProjactId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABSE_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)



    

}

export default conf;
