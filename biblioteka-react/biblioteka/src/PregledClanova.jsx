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
import PregledKnjiga from "./PregledKnjiga";
import PregledRezervacijaAdmin from "./PregledRezervacijaAdmin";

function PregledClanova() {
  const [clanovi, setClanovi] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  const [selectedClanId, setSelectedClanId] = useState(null);
  const [showPozajmiceModal, setshowPozajmiceModal] = useState(false);
  const [showKnjigeModal, setshowKnjigeModal] = useState(false);
  const [showRezervacijeModal, setshowRezervacijeModal] = useState(false);

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
    setshowPozajmiceModal(true);
  };

  const closeModal = () => {
    setshowPozajmiceModal(false);
    setSelectedClanId(null);
  };
  const openKnjigeModal = (clanId) => {
    setSelectedClanId(clanId);
    setshowKnjigeModal(true);
  };

  const closeKnjigeModal = () => {
    setshowKnjigeModal(false);
    setSelectedClanId(null);
  };
  const openRezervacijeModal = (clanId) => {
    setSelectedClanId(clanId);
    setshowRezervacijeModal(true);
  };

  const closeRezervacijeModal = () => {
    setshowRezervacijeModal(false);
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
                onOpenKnjige={openKnjigeModal}
                onOpenRezervacije={openRezervacijeModal}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showPozajmiceModal} onHide={closeModal} size="lg" centered>
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
      
      <Modal show={showKnjigeModal} onHide={closeKnjigeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Napravi novu pozajmicu</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "300px" }}>
          {selectedClanId ? (
            <PregledKnjiga clanId={selectedClanId}  />
          ) : (
            <p>Učitavanje...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeKnjigeModal}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRezervacijeModal} onHide={closeRezervacijeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Pregled rezervacija</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "300px" }}>
          {selectedClanId ? (
            <PregledRezervacijaAdmin clanId={selectedClanId}  />
          ) : (
            <p>Učitavanje...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRezervacijeModal}>
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