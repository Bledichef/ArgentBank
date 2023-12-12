import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Header from './components/Header';
import Footer from "./components/Footer";
import SignIn from "./pages/Signin";

import User from "./pages/User";

// Router
function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<User />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;