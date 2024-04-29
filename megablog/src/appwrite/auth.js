// this is for accout creation and logout and other 

import conf from "../conf/conf.js";
import {Client,Account,ID} from "appwrite";
// code improvement

export class AuthService{

     client =new Client();
     account;// we are not creating Account object here ass this only need when we have create object 
     
     //that why 

     constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjactId);
            this.account=new Account(this.client);
            
     }

     async createAccont({email,password,name}){
        try{
           const userAccount= await this.account.create(ID.unique(),email,password,name)// id user giving user uqineid 
        if(userAccount){// if exited then login 
            // call another method
          return   this.login({email,password}); 
        }
        else{
            return userAccount;
        }
        
        }
        catch(error){
            throw error;
        }
     }

     async login({email,password}){
        try {
           
        return     await this.account.create.createEmailSession(email,password);
            
        } catch (error) {
            throw error;
        }
     }

     async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appservice::getCurentUser::Error",error)
        }

        return null;
     }

     async logout(){
        try {
          await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite ::logout error",error)
        }
     }
}

const authService =new AuthService();



export default authService

// if we have to use this class we have creat object of this class why nite to export the class  