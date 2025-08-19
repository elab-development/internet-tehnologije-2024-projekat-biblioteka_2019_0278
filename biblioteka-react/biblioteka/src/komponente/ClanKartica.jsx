import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function ClanKartica({ clan }) {
  return (
    <Card style={{ width: "20rem", textAlign: "left", display: "flex" }}>
      <Card.Body style={{ textAlign: "justify" }}>
        <Card.Title style={{ textAlign: "left" }}>
          {clan.ime_prezime}
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
              <th colSpan="2">Detalji člana</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{clan.email}</td>
            </tr>
            <tr>
              <td><strong>ID:</strong></td>
              <td>{clan.id}</td>
            </tr>
            <tr>
              <td><strong>User ID:</strong></td>
              <td>{clan.user_id}</td>
            </tr>
            <tr>
              <td><strong>Kreiran:</strong></td>
              <td>{new Date(clan.created_at).toLocaleString()}</td>
            </tr>
            <tr>
              <td><strong>Ažuriran:</strong></td>
              <td>{new Date(clan.updated_at).toLocaleString()}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ClanKartica;