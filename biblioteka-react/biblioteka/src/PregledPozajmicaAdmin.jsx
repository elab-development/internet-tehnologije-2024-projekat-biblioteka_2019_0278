import React, { useEffect, useState } from "react";
import PozajmicaKartica from "./komponente/PozajmicaKartica";
import Ucitavanje from "./komponente/Ucitavanje";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";

function PregledPozajmicaAdmin({ clanId }) {
  const [pozajmice, setPozajmice] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
  const params = useParams();
  const id = clanId || params.id;

  const vratiPozajmice = () => {
    if (!id) {
      console.warn("No member id for fetching pozajmice");
      setPozajmice([]);
      setLoading(false);
      return;
    }

    const url = `http://localhost:8000/api/admin/clanovi/${id}/pozajmice`;
    fetch(url, {
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
        setLoading(false);
      });
  };

  useEffect(() => {
    vratiPozajmice();
  }, [id]);

  if (loading) {
    return <Ucitavanje />;
  }
  return pozajmice.length > 0 ? (
    <Container>
      <Row xs={1} md={1}>
        {pozajmice.map((pozajmica) => (
          <Col key={pozajmica.id}>
            <PozajmicaKartica key={pozajmica.id} pozajmica={pozajmica} osveziStranicu={vratiPozajmice}/>{" "}
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <p>Nema pozajmica za prikaz.</p>
  );
}

export default PregledPozajmicaAdmin;
