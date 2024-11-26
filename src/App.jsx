import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SocietyPage from "./pages/SocietyPage";
import AllSocietiesPage from "./pages/AllSocietiesPage";
import Homepage from "./pages/Homepage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/all-societies" element={<AllSocietiesPage />}>
					{/* <Route path="1" element={<SocietyPage societyIndex={}/>}></Route> */}
				</Route>
				<Route path="/society-page" element={<SocietyPage societyIndex={0} />}></Route>
				<Route path="/schedule" element={<SchedulePage />}></Route>
				<Route path="/login" element={<LoginRegisterPage />}></Route>
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
