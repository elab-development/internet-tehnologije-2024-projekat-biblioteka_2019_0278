import React, { useEffect, useState } from "react";
import Ucitavanje from "./komponente/Ucitavanje";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RezervacijaKartica from "./komponente/RezervacijaKartica";

function PregledRezervacija({}) {
  const [rezervacije, setRezervacije] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const vratiRezervacije = () => {
    fetch("http://127.0.0.1:8000/api/rezervacije", {
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
        setRezervacije(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    vratiRezervacije();
  }, []);

  if (loading) {
    return <Ucitavanje />;
  }
  return rezervacije.length > 0 ? (
    <Container className="container-custom">
      <Row xs={1} md={1}>
        {rezervacije
          .map((rezervacija) => (
            <Col key={rezervacija.id}>
              <RezervacijaKartica
                key={rezervacija.id}
                rezervacija={rezervacija}
                osveziStranicu={vratiRezervacije}
              />
            </Col>
          ))}
      </Row>
    </Container>
  ) : (
    <p>Nema rezervacija za prikaz.</p>
  );
}

export default PregledRezervacija;
