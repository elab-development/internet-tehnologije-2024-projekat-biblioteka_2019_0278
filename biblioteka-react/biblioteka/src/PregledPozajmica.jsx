import React, { useCallback, useEffect, useState } from "react";
import PozajmicaKartica from "./komponente/PozajmicaKartica";
import Ucitavanje from "./komponente/Ucitavanje";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function PregledPozajmica({}) {
  const [pozajmice, setPozajmice] = useState([]);
  const [loading, setLoading] = useState(true);

  const vratiPozajmice = useCallback(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/pozajmice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  },[]);

  useEffect(() => {
    vratiPozajmice();
  }, []);

  if (loading) {
    return <Ucitavanje />;
  }
  return pozajmice.length > 0 ? (
    <Container className="container-custom">
      <Row xs={1} md={1}>
        {pozajmice
          .sort((a, b) => {
            if (!a.datum_vracanja && b.datum_vracanja) return -1;
            if (a.datum_vracanja && !b.datum_vracanja) return 1;
            return 0;
          })
          .map((pozajmica) => (
            <Col>
              <PozajmicaKartica key={pozajmica.id} pozajmica={pozajmica} />{" "}
            </Col>
          ))}
      </Row>
    </Container>
  ) : (
    <p>Nema pozajmica za prikaz.</p>
  );
}

export default PregledPozajmica;
