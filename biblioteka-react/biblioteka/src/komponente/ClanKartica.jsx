import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ClanKartica({
  clan,
  onOpenPozajmice,
  onOpenKnjige,
  onOpenRezervacije,
  onDelete
}) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const pregledajPozajmice = () => {
    if (typeof onOpenPozajmice === "function") {
      onOpenPozajmice(clan.id);
      return;
    }
    navigate(`/admin/clanovi/${clan.id}/pozajmice`);
  };

  const pregledajKnjige = () => {
    if (typeof onOpenKnjige === "function") {
      onOpenKnjige(clan.id);
      return;
    }
    navigate(`/admin/clanovi/${clan.id}/knjige`);
  };
  const pregledajRezervacije = () => {
    if (typeof onOpenRezervacije === "function") {
      onOpenRezervacije(clan.id);
      return;
    }
    navigate(`/admin/clanovi/${clan.id}/rezervacije`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:8000/api/admin/clanovi/${clan.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        if (typeof onDelete === "function") {
          onDelete(clan.id);
        }
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete clan");
        alert("Greška pri brisanju člana");
      }
    } catch (error) {
      console.error("Error deleting clan:", error);
      alert("Greška pri brisanju člana");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Card className="library-card">
        <Button
          variant="outline-danger"
          size="sm"
          className="position-absolute"
          style={{ top: "10px", right: "10px", zIndex: 1 }}
          onClick={handleDeleteClick}
          title="Obriši člana"
        >
          ×
        </Button>
        <Card.Body>
          <Card.Title className="text-truncate" title={clan.ime_prezime}>
            {clan.ime_prezime}
          </Card.Title>

          <Table className="mb-3">
            <thead>
              <tr>
                <th colSpan="2">Detalji člana</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "40%" }}>
                  <strong>Email:</strong>
                </td>
                <td className="text-break">{clan.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>ID:</strong>
                </td>
                <td>{clan.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>User ID:</strong>
                </td>
                <td>{clan.user_id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Kreiran:</strong>
                </td>
                <td className="text-nowrap">
                  {new Date(clan.created_at).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Ažuriran:</strong>
                </td>
                <td className="text-nowrap">
                  {new Date(clan.updated_at).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </Table>
          <br />
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={pregledajPozajmice} variant="primary">
              Pregledaj pozajmice
            </Button>
            <Button onClick={pregledajKnjige} variant="primary">
              Napravi novu pozajmicu
            </Button>
            <Button onClick={pregledajRezervacije} variant="primary">
              Pregledaj rezervacije
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potvrda brisanja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Da li ste sigurni da želite da obrišete člana{" "}
          <strong>{clan.ime_prezime}</strong>?
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
    </>
  );
}

export default ClanKartica;
