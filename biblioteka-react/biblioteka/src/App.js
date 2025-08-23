import "./App.css";
import KnjigaKartica from "./komponente/KnjigaKartica";
import Login from "./login";
import Navigacija from "./Navigacija";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PregledKnjiga from "./PregledKnjiga";
import PregledPozajmica from "./PregledPozajmica";
import AdminLogin from "./adminLogin";
import PregledClanova from "./PregledClanova";
import PregledPozajmicaAdmin from "./PregledPozajmicaAdmin";
import PregledRezervacija from "./PregledRezervacija";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");



  const handleLogin = (token) => {
    if (!token) {
      setLoginError("Greška prilikom prijave. Molimo pokušajte ponovo.");
      console.error("No token provided");
      return;
    }
    setLoggedIn(true);
    localStorage.setItem("token", token);
    setLoginError("");
  };

  return (
    <BrowserRouter>
      <Navigacija loggedIn={loggedIn}></Navigacija>
      <Routes>
        <Route
          path="/"
          element={
            <PregledKnjiga
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} loginError={loginError} />}
        />
        <Route path="/pozajmice" element={<PregledPozajmica />} />
        <Route path="/rezervacije" element={<PregledRezervacija />} />
        <Route
          path="/admin/login"
          element={
            <AdminLogin onAdminLogin={handleLogin} loginError={loginError} />
          }
        />
       <Route
          path="/admin/"
          element={
            <PregledKnjiga
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/admin/clanovi/" element={<PregledClanova  />}/>
        <Route path="/admin/clanovi/:id/pozajmice" element={<PregledPozajmicaAdmin/>} />
        <Route path="/admin/clanovi/:id/knjige" element={<PregledKnjiga 
              loggedIn={loggedIn}
             />} />
        <Route path="/admin/clanovi/:id/rezervacije" element={<PregledRezervacija 
              
             />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
