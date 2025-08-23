import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ModalPoruka from "./ModalPoruka"; 

function KnjigaKartica({ knjiga, osveziStranicu, clanId }) {
  const token = localStorage.getItem("token");
  const loggedIn = localStorage.getItem("token") !== null;
  const loggedInAdmin = localStorage.getItem("adminToken") !== null;

  const [showModal, setShowModal] = useState(false);
  const [modalPoruka, setModalPoruka] = useState("");

  const kreirajPozajmicu = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/pozajmice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_knjige: knjiga.id,
          id_clana: clanId,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        console.error("Response status:", response.status);
        console.error("Response status:", responseBody.message);

        throw new Error(responseBody.message ? responseBody.message: "Greška prilikom izbora knjige.");
      }

      setModalPoruka("Knjiga je uspešno izabrana.");
      setShowModal(true);

      const data = await response.json();
      console.log("Response:", data);
      return data;
    } catch (error) {
      setModalPoruka(error.message || "Greška prilikom izbora knjige.");
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

          {loggedInAdmin && clanId && (
            <Button variant="primary" onClick={kreirajPozajmicu}>
              Izaberi
            </Button>
          )}
        </Card.Body>
      </Card>
      <ModalPoruka
        show={showModal}
        onClose={() => {setShowModal(false); osveziStranicu();}}
        poruka={modalPoruka}
      />
    </>
  );
}

export default KnjigaKartica;
