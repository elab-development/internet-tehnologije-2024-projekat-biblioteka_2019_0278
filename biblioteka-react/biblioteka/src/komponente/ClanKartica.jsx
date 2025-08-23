import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function ClanKartica({ clan, onOpenPozajmice, onOpenKnjige, onOpenRezervacije}) {
  const navigate = useNavigate();

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


  return (
    <Card className="library-card">
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

        <div className="button-container">
          <Button onClick={pregledajPozajmice} variant="primary">
            Pregledaj pozajmice
          </Button>
        </div>
        <div className="button-container">
          <Button onClick={pregledajKnjige} variant="primary">
            Napravi novu pozajmicu
          </Button>
        </div>
        <div className="button-container">
          <Button onClick={pregledajRezervacije} variant="primary">
            Pregledaj rezervacije
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ClanKartica;