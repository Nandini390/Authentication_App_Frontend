import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import './index.css'
import RootLayout from './pages/RootLayout.tsx'
import App from './App.tsx'
import Login from './pages/login.tsx'
import Signup from './pages/signup.tsx'
import Userlayout from './pages/users/userlayout.tsx'



createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
   <Routes>
     <Route path='/' element={<RootLayout />} >
        <Route index element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Userlayout/>} />
      </Route>
   </Routes>
 </BrowserRouter>
)
