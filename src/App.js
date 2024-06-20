import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import EmailVerification from "./Components/EmailVerification";
import VerifyOtp from "./Components/VerifyOtp";
import ChangePassword from "./Components/ChangePassword";
import Home from "./Components/Home";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route
      path="/"
      element={
        <Header />
      }
       />
      <Route 
      path="/register"
      element={
        <Register />
      }
      />
      <Route 
      path="/verification"
      element={
        <EmailVerification />
      }
      />
      <Route 
      path="/verifyOtp"
      element={
        <VerifyOtp />
      }
      />
      <Route 
      path="/password"
      element={
        <ChangePassword />
      }
      />
      <Route 
      path="/home"
      element={
        <Home />
      }
      />
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
