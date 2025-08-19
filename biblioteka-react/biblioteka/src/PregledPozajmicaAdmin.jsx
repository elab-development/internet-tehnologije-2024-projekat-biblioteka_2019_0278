import React, { useEffect, useState } from "react";
import PozajmicaKartica from "./komponente/PozajmicaKartica";
import Ucitavanje from "./komponente/Ucitavanje";
import { useParams } from "react-router";

function PregledPozajmicaAdmin({}) {
  const [pozajmice, setPozajmice] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
    const {id} = useParams();
  const vratiPozajmice = () => {
    fetch(`http://localhost:8000/api/admin/clanovi/${id}/pozajmice`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
        }
        return response.json();
      })
      .then((response) => {
        console.log("Pozajmice data:", response.data);
        setPozajmice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    vratiPozajmice();
  }, []);

  if (loading) {
    return <Ucitavanje />;
  }
  return pozajmice.length > 0 ? (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "normal" }}
    >
      {pozajmice.map((pozajmica) => (
        <PozajmicaKartica key={pozajmica.id} pozajmica={pozajmica}/>
      ))}
    </div>
  ) : (
    <p>Nema pozajmica za prikaz.</p>
  );
}

export default PregledPozajmicaAdmin;
