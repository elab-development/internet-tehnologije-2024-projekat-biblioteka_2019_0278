import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ModalPoruka from "./ModalPoruka";

function PozajmicaKartica({ pozajmica, osveziStranicu }) {
  const token = localStorage.getItem("adminToken");
  const adminLoggedIn = localStorage.getItem("adminToken") !== null;

  const [showModal, setShowModal] = useState(false);
  const [modalPoruka, setModalPoruka] = useState("");

  const vratiKnjigu = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/vratiKnjigu/${pozajmica.id}`,
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
        setModalPoruka("Došlo je do greške prilikom vraćanja knjige.");
        setShowModal(true);
        return;
      }
      if (response.ok) {
        setModalPoruka("Knjiga je uspešno vraćena.");
        setShowModal(true);
        osveziStranicu();
      }
      const data = await response.json();
      console.log("Response:", data);

      return data;
    } catch (error) {
      setModalPoruka("Došlo je do greške prilikom vraćanja knjige.");
      setShowModal(true);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card className="library-card" border={pozajmica.datum_vracanja ? "success" : "danger"}>
        <Card.Body>
          <Card.Title>{pozajmica.knjiga.naslov}</Card.Title>
          <Table>
            <tbody>
              <tr>
                <td>
                  <strong>Autor:</strong>
                </td>
                <td>{pozajmica.knjiga.pisac}</td>
              </tr>
              <tr>
                <td>
                  <strong>Datum pozajmljivanja:</strong>
                </td>
                <td>{pozajmica.datum_pozajmice}</td>
              </tr>
              <tr>
                <td>
                  <strong>Datum vraćanja:</strong>
                </td>
                <td>
                  {pozajmica.datum_vracanja ? (
                    pozajmica.datum_vracanja
                  ) : "Knjiga nije vraćena"}
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">

          {!(adminLoggedIn && !pozajmica.datum_vracanja) ? null : (
            <Button onClick={vratiKnjigu} variant="primary">
              Vrati
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

export default PozajmicaKartica;
