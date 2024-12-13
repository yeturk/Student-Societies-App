import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SocietyPage from "./pages/SocietyPage";
import AllSocietiesPage from "./pages/AllSocietiesPage";
import Homepage from "./pages/Homepage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/homepage" replace />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/societies" element={<AllSocietiesPage />} />
                    <Route path="/societies/:id" element={<SocietyPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/login" element={<LoginRegisterPage />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
