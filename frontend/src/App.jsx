import React from 'react'
import MovieCard from './components/MovieCard'
import SearchBar from './components/SearchBar'
import Navbar from './components/Navbar'
import Home from './components/Home'
import useAuth from './store/authStore'
import { Routes,Route ,useNavigate} from 'react-router-dom'
import SignUp from './components/SignUp'
import { useEffect } from 'react'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'

function App() {
const navigate = useNavigate();
  
  const {checkAuth,isCheckingAuth,authUser}=useAuth()

  useEffect(() => {
    checkAuth();
   
  
   
  }, [])
  
  {
    if(isCheckingAuth && !authUser){
      <p>loading..</p>
    }
  }
  return (
   <>
  <Routes>
    <Route path='/' element={!authUser?<SignUp/>:<Home/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes>
   <Toaster position="top-center" reverseOrder={false} />
   </>
  )
}

export default App