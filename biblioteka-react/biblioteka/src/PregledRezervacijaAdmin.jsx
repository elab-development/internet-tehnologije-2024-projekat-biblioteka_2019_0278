import React, { useEffect, useState } from "react";
import Ucitavanje from "./komponente/Ucitavanje";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RezervacijaKartica from "./komponente/RezervacijaKartica";
import { useParams } from "react-router";

function PregledRezervacija({clanId}) {
  const [rezervacije, setRezervacije] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
  const params = useParams();
  const id = clanId || params.id;

  const vratiRezervacije = () => {
    if (!id) {
      console.warn("No member id for fetching pozajmice");
      setRezervacije([]);
      setLoading(false);
      return;
    }

    const url = `http://localhost:8000/api/admin/clanovi/${id}/rezervacije`;
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
        setRezervacije(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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
        {rezervacije.map((rezervacija) => (
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
