import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function KnjigaKartica({ knjiga, osveziStranicu}) {
  const token = localStorage.getItem("token");
  const loggedIn = localStorage.getItem("token") !== null;
  const loggedInAdmin = localStorage.getItem("adminToken") !== null;

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
        
        
      </Card.Body>
    </Card>
  );
}

export default KnjigaKartica;
