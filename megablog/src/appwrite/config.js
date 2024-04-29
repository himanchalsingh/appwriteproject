// database 

import conf from "../conf/conf.js";
import {Client,ID,Databases,Storage,Query} from "appwrite";
// code improvement

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
       this.client
       .setEndpoint(conf.appwriteUrl)
       .setProject(conf.appwriteProjactId); 
       this.databases=new Databases(this.client);
       this.bucket =new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.log("appwrite::createPost::error",error)
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){//slug had taken seperatly because to get value uquine 
             
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }

            )

        } catch (error) {
            console.log("appwrite::updatePost::error",error);
        }
    }

    async deletePost(slug,{title,content,featuredImage,status}){//slug had taken seperatly because to get value uquine 
             
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("appwrite::deletePost::error",error);
               return false; 
        }
    }
    
    async  getPost(slug){
        try {
         return    await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,)
            
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async  getPosts(queries=[Query.equal("status","active")]){
        try {

           return    await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,//we can also give value here als
            )
            
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    // file upload

    async uploadFiles(file){
        try {
            return    await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique,
                file,)
        } catch (error) {
           
           console.log(error)
            return false
        }
    }

    async deleteFiles(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log(error)
            return false;
        }

    }

    async getFilePreview(fileId){
        await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId)
    }

}

const service = new Service();
export default  service;