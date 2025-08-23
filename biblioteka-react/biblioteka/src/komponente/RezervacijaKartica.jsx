import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ModalPoruka from "./ModalPoruka";

function RezervacijaKartica({ rezervacija, osveziStranicu }) {
  const token = localStorage.getItem("adminToken");
  const adminLoggedIn = token !== null;

  const [showModal, setShowModal] = useState(false);
  const [modalPoruka, setModalPoruka] = useState("");

  const potvrdiRezervaciju = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/potvrdiRezervaciju/${rezervacija.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        setModalPoruka("Došlo je do greške prilikom potvrde rezervacije.");
        setShowModal(true);
        return;
      }
      setModalPoruka("Rezervacija je uspešno konvertovana u pozajmicu.");
      setShowModal(true);
      osveziStranicu();

      const data = await response.json();
      console.log("Response:", data);

      return data;
    } catch (error) {
      setModalPoruka("Došlo je do greške prilikom potvrde rezervacije.");
      setShowModal(true);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card
        className="library-card"
        border={rezervacija.pozajmica_id ? "success" : "danger"}
      >
        <Card.Body>
          <Card.Title>{rezervacija.knjiga.naslov}</Card.Title>
          <Table>
            <tbody>
              <tr>
                <td>
                  <strong>Autor:</strong>
                </td>
                <td>{rezervacija.knjiga.pisac}</td>
              </tr>
              <tr>
                <td>
                  <strong>Datum rezervacije:</strong>
                </td>
                <td>{rezervacija.datum_rezervacije}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>
                  {rezervacija.pozajmica_id
                    ? "Rezervacija je potvrđena"
                    : "Rezervacija nije potvrđena"}
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">

          {adminLoggedIn && !rezervacija.pozajmica_id && (
            <Button onClick={potvrdiRezervaciju} variant="primary">
              Potvrdi rezervaciju
            </Button>
          )}
          </div>
        </Card.Body>
      </Card>
      <ModalPoruka
        show={showModal}
        onClose={() => setShowModal(false)}
        poruka={modalPoruka}
      />
    </>
  );
}

export default RezervacijaKartica;