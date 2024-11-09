import './App.css';
import Footer from './Home/Footer';
import HomeMain from './Home/HomeMain';
import Navbar from './Home/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoutes from './Routes/AdminRoutes';
import AdminDashboard from './admin/AdminDashboard';
import CreateCar from './admin/CreateCar';
import UpdateCar from './admin/UpdateCar';
import Cars from './admin/Cars';
import TaskManagement from './admin/TaskManagement';
import Pipeline from './admin/Pipeline';
import Brands from './Home/Brands';
import AnalyseChart from './admin/AnalyseChart';
import Customer from './Home/Customer';
import About from './Home/About';
import PrivateRoute from './Routes/PrivateRoute';
import UserDashboard from './common/UserDashboard';
// import UserOrder from './common/UserOrder';
import UserProfile from './common/UserProfile';
import NotFound from './pages/NotFound';
// import CarsFilterpage from './Home/CarsFilterpage';
import CarView from './pages/CarView';
import { Toaster } from 'react-hot-toast';
import Allcars from './common/AllCars';
import Incident from './common/Incident';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<HomeMain />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/brands' element={<Brands />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/cars' element={<CarsFilterpage />} /> */}
          <Route path='/car/:id' element={<CarView />} />
          <Route path='/*' element={<NotFound />} />

          {/* Admin Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path='/dashboard/admin/cars' element={<Cars />} />
            <Route path='/dashboard/admin/createCar' element={<CreateCar />} />
            <Route path='/dashboard/admin/car/:id' element={<UpdateCar />} />
            <Route path='/dashboard/admin/TaskManagement' element={<TaskManagement />} />
            <Route path='/dashboard/admin/Pipeline' element={<Pipeline />} />
            <Route path='/dashboard/admin/AnalyseChart' element={<AnalyseChart />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard/user' element={<UserDashboard />} />
            {/* <Route path='/dashboard/user/order' element={<UserOrder />} /> */}
            <Route path='/dashboard/user/profile' element={<UserProfile />} />
            <Route path='/dashboard/user/allcars' element={<Allcars />} /> {/* Latest Cars */}
            <Route path='/dashboard/user/incident' element={<Incident/>}/>
          </Route>
        </Routes>
        <Toaster containerStyle={{ zIndex: '9999999' }} reverseOrder={true} />
        <Footer id="footer" />
      </div>
    </Router>
  );
}

export default App;
