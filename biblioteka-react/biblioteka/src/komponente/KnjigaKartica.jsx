import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function KnjigaKartica({ knjiga, osveziStranicu}) {
  const token = localStorage.getItem("token");
  const loggedIn = localStorage.getItem("token") !== null;

  const kreirajPozajmicu = async () => {
    
     try {
    const response = await fetch("http://127.0.0.1:8000/api/pozajmice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_knjige: knjiga.id,
      }),
    });

    if (!response.ok) {
      console.log(JSON.stringify(response))
      throw new Error("Request failed with status " + response.status);
    }

    alert("Knjiga je uspešno pozajmljena.");
    osveziStranicu();

    const data = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }

  }


  return (
    <Card style={{ width: "18rem", textAlign: "left", display: "flex" }}>
      <Card.Body style={{ textAlign: "justify" }}>
        <Card.Title style={{ textAlign: "left" }}>{knjiga.naslov}</Card.Title>
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
              <td>{knjiga.pisac}</td>
            </tr>
            <tr>
              <td>
                <strong>Količina:</strong>
              </td>
              <td>{knjiga.kolicina}</td>
            </tr>
          </tbody>
        </Table>
        {loggedIn ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={kreirajPozajmicu} variant="primary">Pozajmi</Button>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default KnjigaKartica;
