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
import AccountSettings from "./components/AccountSettings/UserSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import EventCreationForm from "./pages/EventCreationForm";
import SocietyCreationForm from "./pages/SocietyCreationForm";

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/homepage" replace />} />
                        <Route path="/homepage" element={<Homepage />} />
                        <Route path="/societies" element={<AllSocietiesPage />} />
                        <Route path="/societies/:id" element={<SocietyPage />} />
                        <Route path="/schedule" element={<SchedulePage />} />
                        <Route path="/login" element={<LoginRegisterPage />} />
                        <Route path="/create-event" element={<EventCreationForm />} />
                        <Route path="/create-society" element={<SocietyCreationForm />} />
                        <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute>
                                    <AccountSettings />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/settings" 
                            element={
                                <ProtectedRoute>
                                    <AccountSettings />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;