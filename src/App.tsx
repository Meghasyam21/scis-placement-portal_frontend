import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import StudentDashboard from './pages/student/StudentDashboard'
import StreamDashboard from './pages/StreamDashboard'
import OfficerDashboard from './pages/OfficerDashboard'
import Layout from './components/Layout'
import StudentProfile from './pages/student/StudentProfile'
import MyApplications from './pages/student/MyApplications'
import Applicants from './pages/stream/Applicants'
import StreamHome from './pages/stream/StreamHome'
import StreamLayout from './pages/stream/StreamLayout'
import CoordinatorLayout from './pages/pc/CoordinatorLayout'
import ApplicationsReview from './pages/pc/ApplicationsReview'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/stream" element={<StreamDashboard />} />
      <Route path="/officer" element={<OfficerDashboard />} />

      <Route
  path="/student"
  element={
    <Layout>
      <StudentDashboard />
    </Layout>
  }
/>

<Route
  path="/student/profile"
  element={
    <Layout>
      <StudentProfile />
    </Layout>
  }
/>
 
<Route
  path="/student/applications"
  element={
    <Layout>
      <MyApplications />
    </Layout>
  }
/>
    <Route path="/stream" element={<StreamLayout />}>
     <Route index element={<StreamHome />} />
    <Route path="applicants" element={<Applicants />} />
    </Route>

<Route path="/coordinator" element={<CoordinatorLayout />}>
  <Route index element={<ApplicationsReview />} />
</Route>
    </Routes>
  )
}

export default App
