import { Route, Routes } from 'react-router-dom'
import Home from "../pages/Home"
import Services from "../pages/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../pages/Contact"
import Doctors from "../pages/Doctors/Doctors"
import DoctorDetails from "../pages/Doctors/DoctorDetails"
import MyAccount from '../dashboard/user-account/MyAccount'
import AccountDashboard from '../dashboard/doctor-account/AccountDashboard'
import ProtectedRoute from './ProtectedRoute'
import CheckoutSuccess from '../pages/Doctors/CheckoutSuccess'


const Routers = () => {
  return <Routes>

    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/doctors' element={<Doctors />} />
    <Route path='/doctors/:id' element={<DoctorDetails />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Signup />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/services' element={<Services />} />
    <Route path='/checkout-success' element={<CheckoutSuccess />} />
    <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />
    <Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><AccountDashboard /></ProtectedRoute>} />

  </Routes>
}

export default Routers