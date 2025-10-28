import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import RegisterProvider from "./pages/RegisterProvider";
import UserDashboard from "./pages/UserDashboard";
import UserDashboard2 from "./pages/UserDashboard2";
import ProviderDashboard from "./pages/ProviderDashboard";
import UserProfile from "./pages/UserProfile";
import ProviderProfile from "./pages/ProviderProfile";
import AvailabilityManagement from "./pages/AvailabilityManagement";
import BookAppointment from "./pages/BookAppointment";
import DoctorServices from "./pages/DoctorServices";
import SalonServices from "./pages/SalonServices";
import LawyerServices from "./pages/LawyerServices";
import TherapistServices from "./pages/TherapistServices";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Header />
      <main className="container my-4">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/provider" element={<RegisterProvider />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* User Routes - CORRECTED PATHS */}
          <Route path="/user-dashboard" element={<UserDashboard />} /> {/* ✅ Changed from /dashboard/user */}
          <Route path="/user-dashboard2" element={<UserDashboard2 />} />
          <Route path="/user-dashboard2/settings" element={<UserDashboard2 />} />
          <Route path="/user-profile" element={<UserProfile />} />

          {/* Service Routes */}
          <Route path="/doctor-services" element={<DoctorServices />} />
          <Route path="/salon-services" element={<SalonServices />} />
          <Route path="/lawyer-services" element={<LawyerServices />} />
          <Route path="/therapist-services" element={<TherapistServices />} />

          {/* Provider Routes */}
          <Route path="/dashboard/provider" element={<ProviderDashboard />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
          <Route path="/availability-management" element={<AvailabilityManagement />} />

          {/* Common */}
          <Route path="/book-appointment" element={<BookAppointment />} />

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;