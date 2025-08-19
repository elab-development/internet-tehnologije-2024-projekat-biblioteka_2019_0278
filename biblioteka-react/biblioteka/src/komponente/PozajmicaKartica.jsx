import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function PozajmicaKartica({ pozajmica, osveziStranicu }) {
  const token = localStorage.getItem("adminToken");
  const adminLoggedIn = localStorage.getItem("adminToken") !== null;
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
        throw new Error("Request failed with status " + response.status);
      }
      if (response.ok) {
        alert("Knjiga je uspešno vraćena.");
        osveziStranicu(); // Refresh the page to reflect changes
      } else {
        alert("Došlo je do greške prilikom vraćanja knjige.");
      }
      const data = await response.json();
      console.log("Response:", data);

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card style={{ width: "18rem", textAlign: "left", display: "flex" }}>
      <Card.Body style={{ textAlign: "justify" }}>
        <Card.Title style={{ textAlign: "left" }}>
          {pozajmica.knjiga.naslov}
        </Card.Title>
        <Table
          style={{
            width: "100%",
            textAlign: "justify",
            borderCollapse: "collapse",
            margin: "0 auto",
          }}
        >
          <thead>
            <tr>
              <th colSpan="2">Detalji knjige</th>
            </tr>
          </thead>
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
            {pozajmica.datum_vracanja ? (
              <tr>
                <td>
                  <strong>Datum vraćanja:</strong>
                </td>
                <td>{pozajmica.datum_vracanja}</td>
              </tr>
            ) : null}
          </tbody>
        </Table>
        {!(adminLoggedIn && !pozajmica.datum_vracanja) ? null : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={vratiKnjigu} variant="primary">
              Vrati
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default PozajmicaKartica;
