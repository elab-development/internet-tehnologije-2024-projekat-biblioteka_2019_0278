import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ModalPoruka from "./ModalPoruka";
import useToggle from "../hooks/useToggle";

function KnjigaKartica({ knjiga, osveziStranicu, clanId }) {
  const token = localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : localStorage.getItem("token");
  const loggedIn = localStorage.getItem("token") !== null;
  const loggedInAdmin = localStorage.getItem("adminToken") !== null;

  const modalPorukaPrikaz = useToggle();
  const [modalPoruka, setModalPoruka] = useState("");
  const modalUpdateKnjiga = useToggle();
  const modalObrisiKnjigu = useToggle();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    modalObrisiKnjigu.setTrue();
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:8000/api/admin/knjige/${knjiga.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        modalObrisiKnjigu.setFalse();
        setModalPoruka("Knjiga je uspešno obrisana.");
        modalPorukaPrikaz.setTrue();
        if (typeof osveziStranicu === "function") {
          osveziStranicu();
        }
      } else {
        const data = await response.json().catch(() => ({}));
        const errorMsg = data.message || data.error || "Greška pri brisanju knjige.";
        setModalPoruka(errorMsg);
        modalPorukaPrikaz.setTrue();
      }
    } catch (error) {
      setModalPoruka(error.message || "Greška pri brisanju knjige.");
      modalPorukaPrikaz.setTrue();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    modalObrisiKnjigu.setFalse();
  };
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
            clan_id: clanId,
          }),
        }
      );

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(
          responseBody.error || "Greška prilikom izbora knjige."
        );
      }

      setModalPoruka("Knjiga je uspešno izabrana.");
      modalPorukaPrikaz.setTrue();
      const data = await response.json();
      return data;
    } catch (error) {
      setModalPoruka(error.message || "Greška prilikom izbora knjige.");
      modalPorukaPrikaz.setTrue();
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
          responseBody.error || "Greška prilikom rezervacije knjige."
        );
      }

      setModalPoruka("Knjiga je uspešno rezervisana.");
      modalPorukaPrikaz.setTrue();
      const data = await response.json();
      return data;
    } catch (error) {
      setModalPoruka(error.message || "Greška prilikom rezervacije knjige.");
      modalPorukaPrikaz.setTrue();
      console.error("Error:", error);
    }
  };

  const handleShowUpdateModal = () => {
    setFormData({
      naslov: knjiga.naslov,
      pisac: knjiga.pisac,
      kolicina: knjiga.kolicina,
    });
    modalUpdateKnjiga.setTrue();
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

      modalUpdateKnjiga.setFalse();
      setModalPoruka(data.message || "Knjiga je uspešno ažurirana.");
      modalPorukaPrikaz.setTrue();
    } catch (error) {
      modalUpdateKnjiga.setFalse();
      setModalPoruka(error.message);
      modalPorukaPrikaz.setTrue();
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card className="library-card">
        {loggedInAdmin && !clanId && (
          <Button
            variant="outline-danger"
            size="sm"
            className="position-absolute"
            style={{ top: "10px", right: "10px", zIndex: 1 }}
            onClick={handleDeleteClick}
            title="Obriši knjigu"
          >
            ×
          </Button>
        )}
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
        show={modalPorukaPrikaz.value}
        onClose={() => {
          modalPorukaPrikaz.setFalse();
          osveziStranicu();
        }}
        poruka={modalPoruka}
      />

  <Modal show={modalObrisiKnjigu.value} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potvrda brisanja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Da li ste sigurni da želite da obrišete knjigu <strong>{knjiga.naslov}</strong>?
          <br />
          Ova akcija se ne može poništiti.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Otkaži
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Brisanje..." : "Obriši"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalUpdateKnjiga.value} onHide={() => modalUpdateKnjiga.setFalse()}>
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
          <Button variant="secondary" onClick={() => modalUpdateKnjiga.setFalse()}>
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
