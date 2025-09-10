import {create} from 'zustand'
import axios from 'axios'

import toast from 'react-hot-toast'
const  useAuth=create((set)=>({
    authUser:null,
    isLogout:false,
    isLogin:false,
    isSignUp:false,
    isUpdateProfile:false,
    isCheckingAuth:true,
   
    checkAuth:async()=>{
       try {
        const res=await axios.get('http://localhost:3000/api/auth/check', {withCredentials:true})
        console.log(res)
        set({authUser:res.data})
        
       } catch (error) {
        console.log('error',error)
        set({authUser:null})
        
       }
       finally{
        set({isCheckingAuth:false})
       }

    },

    Signup:async(data)=>{
        try {
            set({isSignUp:true})
            const response=await axios.post('http://localhost:3000/api/auth/signUp',data, { withCredentials: true })
            console.log(response)
            set({authUser:response.data})
            toast.success("account created")
            
        } catch (error) {
            toast.error("somthing went wrong")

            
        }
        finally{
            set({isSignUp:false})

        }
    },
    logout:async()=>{
        try {
            set({isLogout:true});
            const res= await axios.get('http://localhost:3000/api/auth/logout')
            toast.success("logout success")
            
        } catch (error) {
            toast.error('somthing went wrong')
            
        }
        finally{
            set({isLogout:false});
        }
       
    },
    login:async(data)=>{
        try {
            set({isLogin:true});
            const res= await axios.post('http://localhost:3000/api/auth/login',data ,{ withCredentials: true });
            set({authUser:res.data});
            toast.success('login succes')
            
        } catch (error) {

            toast.error("somthin went wrong")
            
        }
        finally{
            set({isLogin:false});

        }
    }

}))
export default useAuth