import './App.css'
import Home from './page/Home'
import Login from './page/Login'
import Logout from './component/Logout'
import Header from './component/Header'
import Footer from './component/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './context/context'
import ProtectRoute from './utils/protectedRoute'

function App() {

  return (
    <>
     <BrowserRouter>
     <ContextProvider>  

     <Header/>
      <Routes>
        <Route path="/" element={<ProtectRoute><Home /></ProtectRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer/>
     </ContextProvider>
     </BrowserRouter>
    </>
  )
}

export default App
