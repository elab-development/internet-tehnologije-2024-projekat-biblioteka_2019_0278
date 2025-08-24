import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ModalPoruka from "./ModalPoruka";

function KnjigaKartica({ knjiga, osveziStranicu, clanId }) {
  const token = localStorage.getItem("token");
  const loggedIn = localStorage.getItem("token") !== null;
  const loggedInAdmin = localStorage.getItem("adminToken") !== null;

  const [showModal, setShowModal] = useState(false);
  const [modalPoruka, setModalPoruka] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    naslov: "",
    pisac: "",
    kolicina: "",
  });

  const kreirajPozajmicu = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/pozajmice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_knjige: knjiga.id,
            id_clana: clanId,
          }),
        }
      );

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(
          responseBody.message || "Greška prilikom izbora knjige."
        );
      }

      setModalPoruka("Knjiga je uspešno izabrana.");
      setShowModal(true);
      const data = await response.json();
      return data;
    } catch (error) {
      setModalPoruka(error.message || "Greška prilikom izbora knjige.");
      setShowModal(true);
      console.error("Error:", error);
    }
  };

  const kreirajRezervaciju = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rezervacije", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          knjiga_id: knjiga.id,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(
          responseBody.message || "Greška prilikom rezervacije knjige."
        );
      }

      setModalPoruka("Knjiga je uspešno rezervisana.");
      setShowModal(true);
      const data = await response.json();
      return data;
    } catch (error) {
      setModalPoruka(error.message || "Greška prilikom rezervacije knjige.");
      setShowModal(true);
      console.error("Error:", error);
    }
  };

  const handleShowUpdateModal = () => {
    setFormData({
      naslov: knjiga.naslov,
      pisac: knjiga.pisac,
      kolicina: knjiga.kolicina,
    });
    setShowUpdateModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const azurirajKnjigu = async () => {
    const adminToken = localStorage.getItem("adminToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/knjige/${knjiga.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessages = Object.values(data).flat().join(" ");
        throw new Error(errorMessages || "Greška prilikom ažuriranja knjige.");
      }

      setShowUpdateModal(false);
      setModalPoruka(data.message || "Knjiga je uspešno ažurirana.");
      setShowModal(true);
    } catch (error) {
      setShowUpdateModal(false);
      setModalPoruka(error.message);
      setShowModal(true);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card className="library-card">
        <Card.Body>
          <Card.Title className="text-truncate" title={knjiga.naslov}>
            {knjiga.naslov}
          </Card.Title>

          <Table className="mb-3">
            <tbody>
              <tr>
                <td style={{ width: "40%" }}>
                  <strong>Autor:</strong>
                </td>
                <td className="text-break">{knjiga.pisac}</td>
              </tr>
              <tr>
                <td>
                  <strong>Količina:</strong>
                </td>
                <td>{knjiga.kolicina}</td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3 gap-2">
            {loggedInAdmin && clanId && (
              <Button variant="primary" onClick={kreirajPozajmicu}>
                Izaberi
              </Button>
            )}
            {loggedIn && !loggedInAdmin && (
              <Button variant="primary" onClick={kreirajRezervaciju}>
                Kreiraj rezervaciju
              </Button>
            )}
            {loggedInAdmin && !clanId && (
              <Button variant="secondary" onClick={handleShowUpdateModal}>
                Ažuriraj podatke
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <ModalPoruka
        show={showModal}
        onClose={() => {
          setShowModal(false);
          osveziStranicu();
        }}
        poruka={modalPoruka}
      />

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ažuriraj knjigu: {knjiga.naslov}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNaslov">
              <Form.Label>Naslov</Form.Label>
              <Form.Control
                type="text"
                name="naslov"
                value={formData.naslov}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPisac">
              <Form.Label>Pisac</Form.Label>
              <Form.Control
                type="text"
                name="pisac"
                value={formData.pisac}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKolicina">
              <Form.Label>Količina</Form.Label>
              <Form.Control
                type="number"
                name="kolicina"
                value={formData.kolicina}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Zatvori
          </Button>
          <Button variant="primary" onClick={azurirajKnjigu}>
            Sačuvaj izmene
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default KnjigaKartica;
