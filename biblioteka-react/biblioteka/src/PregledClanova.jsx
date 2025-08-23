import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ClanKartica from "./komponente/ClanKartica";
import Ucitavanje from "./komponente/Ucitavanje";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PregledPozajmicaAdmin from "./PregledPozajmicaAdmin";

function PregledClanova() {
  const [clanovi, setClanovi] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  const [selectedClanId, setSelectedClanId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const vratiClanove = () => {
    fetch("http://127.0.0.1:8000/api/admin/clanovi", {
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
        console.log("Clanovi data:", response.data);
        setClanovi(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching clanovi:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    vratiClanove();
  }, []);

  const openPozajmiceModal = (clanId) => {
    setSelectedClanId(clanId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClanId(null);
  };

  if (loading) {
    return <Ucitavanje />;
  }

  return clanovi.length > 0 ? (
    <>
      <Container>
        <Row xs={1}>
          {clanovi.map((clan) => (
            <Col key={clan.id}>
              <ClanKartica
                clan={clan}
                onOpenPozajmice={openPozajmiceModal}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Pozajmice člana</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "300px" }}>
          {selectedClanId ? (
            <PregledPozajmicaAdmin clanId={selectedClanId}  />
          ) : (
            <p>Učitavanje...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <p>Nema članova za prikaz.</p>
  );
}

export default PregledClanova;