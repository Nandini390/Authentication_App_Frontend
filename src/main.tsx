import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import './index.css'
import RootLayout from './pages/RootLayout.tsx'
import App from './App.tsx'
import Login from './pages/login.tsx'
import Signup from './pages/signup.tsx'
import Userlayout from './pages/users/userlayout.tsx'
import Userhome from './pages/users/Userhome.tsx'
import UserProfile from './pages/users/userProfile.tsx'
import OAuthSuccess from './pages/OAuthSuccess.tsx'
import OAuthFailure from './pages/OAuthFailure.tsx'



createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
   <Routes>
     <Route path='/' element={<RootLayout />} >
        <Route index element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Userlayout/>}>
          <Route index element={<Userhome/>} />
          <Route path="profile" element={<UserProfile/>} />
          {/*......*/}
        </Route>
        <Route path='oauth/success' element={<OAuthSuccess/>} />
        <Route path='oauth/failure' element={<OAuthFailure/>} />
      </Route>
   </Routes>
 </BrowserRouter>
)
