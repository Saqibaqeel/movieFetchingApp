import {create} from 'zustand'
import axios from 'axios'

const  moveStore=create((set)=>({
    movies:[],
    usrerSearchHistory:[],
    ismoviesLoading:false,

    setMovies:async()=>{
        try {
            set({ismoviesLoading:true})
            const res=await axios.get('https://api.imdbapi.dev/titles')
            set({movies:res.data})
            
            
        } catch (error) {
            
        }finally{
            set({ismoviesLoading:false})

        }
    },
    getMobieByName:async(name)=>{
        try {
            set({ismoviesLoading:true})
            const res=await axios.get(`https://api.imdbapi.dev/search/titles?query=${name}`)
            set({movies:res.data})
           

            set((state)=>({
                usrerSearchHistory:[name,...state.usrerSearchHistory.filter(item=>item!==name)].slice(0,5)
            }))
            
            
        } catch (error) {
            
        }finally{
            set({ismoviesLoading:false})

        }
    }

  

}))
export default moveStore;