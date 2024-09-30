import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import DoctorsPage from "./pages/DoctorsPage";
import InsurancePage from "./pages/InsurancePage";
import HomePage from "./pages/HomePage";
import ConsultationsPage from "./pages/ConsultationsPage";
import ImmunizationsPage from "./pages/ImmunizationsPage";
import MedicationsPage from "./pages/MedicationsPage";
import AccountSettings from "./pages/AccountSettings";
import Radiology from "./pages/Radiology";
import Doctorhomepage from "./pages/Doctorhomepage";
import InputMedical from "./pages/InputMedical";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Chat from "./pages/chatPage";
import RoleBasedRedirect from "./components/RoleBasedRedirect";

import "./App.css";

const Layout = () => (
  <div className="App">
    <Header />
    <div className="app-body">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  // return (
  //   <Routes>
  //     {/* Route for LandingPage without Layout */}
  //     <Route path="/" element={<LandingPage />} />

  //     <Route path="/register" element={<RegisterPage />} />
  //     <Route path="/login" element={<LoginPage />} />

  //     {/* Nested Routes within Layout for other pages */}
  //     <Route element={<Layout userName={mockData.userName} />}>
  //       <Route path="home" element={<HomePage {...mockData} />} />
  //       <Route path="doctors" element={<DoctorsPage />} />
  //       <Route path="insurance" element={<InsurancePage />} />
  //       <Route path="/immunizations" element={<ImmunizationsPage />} />
  //       <Route path="/medications" element={<MedicationsPage />} />
  //       <Route path="/consultations" element={<ConsultationsPage />} />
  //       <Route path="/account-settings" element={<AccountSettings />} />
  //       <Route path="/radiology" element={<Radiology />} />{" "}
  //       <Route path="/Doctorhomepage" element={<Doctorhomepage />} />{" "}
  //       <Route path="/InputMedical" element={<InputMedical />} />{" "}
  //       {/* ... more nested routes */}
  //     </Route>
  //   </Routes>
  // );

  return (
    <>
      <RoleBasedRedirect /> {/* to handle role-based redirection */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="insurance" element={<InsurancePage />} />
          <Route path="immunizations" element={<ImmunizationsPage />} />
          <Route path="medications" element={<MedicationsPage />} />
          <Route path="consultations" element={<ConsultationsPage />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="radiology" element={<Radiology />} />
          <Route path="Doctorhomepage" element={<Doctorhomepage />} />
          <Route path="InputMedical" element={<InputMedical />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
