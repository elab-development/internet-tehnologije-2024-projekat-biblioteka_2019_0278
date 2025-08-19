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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [knjige, setKnjige] = useState([]);

  const vratiKnjige = () => {
    fetch("http://127.0.0.1:8000/api/knjige")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((knjigeJson) => {
        console.log(knjigeJson.data);
        setKnjige(knjigeJson.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    vratiKnjige();
  }, []);

  const handleLogin = (token) => {
    if (!token) {
      setLoginError("Greška prilikom prijave. Molimo pokušajte ponovo.");
      console.error("No token provided");
      return;
    }
    setLoggedIn(true);
    setToken(token);
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
              osveziStranicu={vratiKnjige}
              knjige={knjige}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} loginError={loginError} />}
        />
        <Route path="/pozajmice" element={<PregledPozajmica />} />
        <Route
          path="/admin/login"
          element={
            <AdminLogin onAdminLogin={handleLogin} loginError={loginError} />
          }
        />
        <Route path="/admin/clanovi/" element={<PregledClanova />}>
          <Route path=":id/pozajmice" element={<PregledPozajmicaAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
