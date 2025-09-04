import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalPoruka from "./ModalPoruka";

const DodajClanaModal = ({ show, onHide, onClanAdded }) => {

  
  const [modalPoruka, setModalPoruka] = useState("");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("adminToken");
  const [formData, setFormData] = useState({
    ime_prezime: "",
    email: "",
    user_id: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/clanovi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          ime_prezime: "",
          email: "",
          user_id: "",
        });
        onHide();
        if (onClanAdded) {
          onClanAdded();
        }
        setShowModal(true);
        setModalPoruka("Član je uspešno dodat.");
        console.log("Član je uspešno dodat!");
      } else {
        console.error("Greška pri dodavanju člana");
        setShowModal(true);
        setModalPoruka("Greška pri dodavanju člana.");
      }
    } catch (error) {
      console.error("Greška:", error);
      setShowModal(true);
      setModalPoruka(error.message || "Greška pri dodavanju člana.");
    }
  };

  const handleClose = () => {
    setFormData({
      ime_prezime: "",
      email: "",
      user_id: "",
    });
    onHide();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj novog člana</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAddImePrezime">
              <Form.Label>Ime i prezime</Form.Label>
              <Form.Control
                type="text"
                name="ime_prezime"
                value={formData.ime_prezime}
                onChange={handleFormChange}
                placeholder="Unesite ime i prezime"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Unesite email adresu"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleFormChange}
                placeholder="Unesite User ID"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Otkaži
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={
              !formData.ime_prezime || !formData.email || !formData.user_id
            }
          >
            Dodaj Člana
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalPoruka
        show={showModal}
        onClose={() => setShowModal(false)}
        poruka={modalPoruka}
      />
    </div>
  );
};

export default DodajClanaModal;
