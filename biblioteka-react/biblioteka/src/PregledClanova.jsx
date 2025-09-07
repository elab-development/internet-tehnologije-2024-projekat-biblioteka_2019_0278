import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ClanKartica from "./komponente/ClanKartica";
import Ucitavanje from "./komponente/Ucitavanje";
import DodajClanaModal from "./komponente/DodajClanaModal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PregledPozajmicaAdmin from "./PregledPozajmicaAdmin";
import PregledKnjiga from "./PregledKnjiga";
import PregledRezervacijaAdmin from "./PregledRezervacijaAdmin";
import ModalPregled from "./komponente/ModalPregled";
import useToggle from "./hooks/useToggle";

function PregledClanova() {
  const [clanovi, setClanovi] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
  const [selectedClanId, setSelectedClanId] = useState(null);

  const pozajmiceModal = useToggle();
  const knjigeModal = useToggle();
  const rezervacijeModal = useToggle();
  const dodajClanaModal = useToggle();

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
    pozajmiceModal.setTrue();
  };

  const closeModal = () => {
    pozajmiceModal.setFalse();
    setSelectedClanId(null);
  };

  const openKnjigeModal = (clanId) => {
    setSelectedClanId(clanId);
    knjigeModal.setTrue();
  };

  const closeKnjigeModal = () => {
    knjigeModal.setFalse();
    setSelectedClanId(null);
  };

  const openRezervacijeModal = (clanId) => {
    setSelectedClanId(clanId);
    rezervacijeModal.setTrue();
  };

  const closeRezervacijeModal = () => {
    rezervacijeModal.setFalse();
    setSelectedClanId(null);
  };

  return (
    <>
      <Container className="container-custom">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Pregled članova</h2>
          <Button
            variant="success"
            onClick={() => dodajClanaModal.setTrue()}
          >
            Dodaj Člana
          </Button>
        </div>
        {loading ? (
          Ucitavanje()
        ) : clanovi.length > 0 ? (
          <Row xs={1}>
            {clanovi.map((clan) => (
              <Col key={clan.id}>
                <ClanKartica
                  clan={clan}
                  onOpenPozajmice={openPozajmiceModal}
                  onOpenKnjige={openKnjigeModal}
                  onOpenRezervacije={openRezervacijeModal}
                  onDelete={vratiClanove}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p>Nema članova za prikaz.</p>
        )}
      </Container>

      <ModalPregled
        show={pozajmiceModal.value}
        onHide={closeModal}
        title={"Pozajmice člana"}
      >
        {selectedClanId ? (
          <PregledPozajmicaAdmin clanId={selectedClanId} />
        ) : (
          <p>Učitavanje...</p>
        )}
      </ModalPregled>

      <ModalPregled
        show={knjigeModal.value}
        onHide={closeKnjigeModal}
        title={"Napravi novu pozajmicu"}
      >
        {selectedClanId ? (
          <PregledKnjiga clanId={selectedClanId} />
        ) : (
          <p>Učitavanje...</p>
        )}
      </ModalPregled>

      <ModalPregled
        show={rezervacijeModal.value}
        onHide={closeRezervacijeModal}
        title={"Pregled rezervacija"}
      >
        {selectedClanId ? (
          <PregledRezervacijaAdmin clanId={selectedClanId} />
        ) : (
          <p>Učitavanje...</p>
        )}
      </ModalPregled>
      <DodajClanaModal
        show={dodajClanaModal.value}
        onHide={() => dodajClanaModal.setFalse()}
        onClanAdded={vratiClanove}
      />
    </>
  );
}

export default PregledClanova;
