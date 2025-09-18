import "./App.css";
import Login from "./login";
import Navigacija from "./Navigacija";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PregledKnjiga from "./PregledKnjiga";
import PregledPozajmica from "./PregledPozajmica";
import AdminLogin from "./adminLogin";
import PregledClanova from "./PregledClanova";
import PregledPozajmicaAdmin from "./PregledPozajmicaAdmin";
import PregledRezervacija from "./PregledRezervacija";
import PocetnaStranica from "./PocetnaStranica";
import Breadcrumbs from "./komponente/Breadcrumbs";

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
      <Navigacija loggedIn={loggedIn} />

      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<PocetnaStranica />}></Route>
        <Route path="/knjige" element={<PregledKnjiga loggedIn={loggedIn} />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} loginError={loginError} />}
        />
        <Route path="/pozajmice" element={<PregledPozajmica />} />
        <Route path="/rezervacije" element={<PregledRezervacija />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/" element={<PocetnaStranica />}></Route>

        <Route
          path="/admin/knjige"
          element={<PregledKnjiga loggedIn={loggedIn} />}
        />
        <Route path="/admin/clanovi/" element={<PregledClanova />} />
        <Route
          path="/admin/clanovi/:id/pozajmice"
          element={<PregledPozajmicaAdmin />}
        />
        <Route
          path="/admin/clanovi/:id/knjige"
          element={<PregledKnjiga loggedIn={loggedIn} />}
        />
        <Route
          path="/admin/clanovi/:id/rezervacije"
          element={<PregledRezervacija />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
