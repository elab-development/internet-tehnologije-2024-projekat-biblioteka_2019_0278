import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const KreirajKnjiguModal = ({ show, onHide, onBookAdded }) => {

  const token = localStorage.getItem("adminToken");
  const [formData, setFormData] = useState({
    naslov: '',
    pisac: '',
    kolicina: 1
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/knjige', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          naslov: '',
          pisac: '',
          kolicina: 1
        });
        onHide();
        if (onBookAdded) {
          onBookAdded();
        }
        console.log('Knjiga je uspešno dodana!');
      } else {
        console.error('Greška pri dodavanju knjige');
      }
    } catch (error) {
      console.error('Greška:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      naslov: '',
      pisac: '',
      kolicina: 1
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj novu knjigu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formAddNaslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control
              type="text"
              name="naslov"
              value={formData.naslov}
              onChange={handleFormChange}
              placeholder="Unesite naslov knjige"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddPisac">
            <Form.Label>Pisac</Form.Label>
            <Form.Control
              type="text"
              name="pisac"
              value={formData.pisac}
              onChange={handleFormChange}
              placeholder="Unesite ime pisca"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddKolicina">
            <Form.Label>Količina</Form.Label>
            <Form.Control
              type="number"
              name="kolicina"
              value={formData.kolicina}
              onChange={handleFormChange}
              min="1"
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
          disabled={!formData.naslov || !formData.pisac}
        >
          Dodaj Knjigu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KreirajKnjiguModal;