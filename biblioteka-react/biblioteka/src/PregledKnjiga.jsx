import React from "react";
import KnjigaKartica from "./komponente/KnjigaKartica";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ucitavanje from "./komponente/Ucitavanje";
function PregledKnjiga({ knjige, osveziStranicu, loading }) {
  const loggedIn = localStorage.getItem("token") !== null;

  if (loading) {
    return <Ucitavanje />;
  } else {
    return (
      <div>
        <Container>
          <Row xs={1}>
            {knjige
              ? knjige.map((knjiga) => (
                  <Col>
                    {" "}
                    <KnjigaKartica
                      key={knjiga.id}
                      knjiga={knjiga}
                      osveziStranicu={osveziStranicu}
                    />
                  </Col>
                ))
              : null}
          </Row>
        </Container>
      </div>
    );
  }
}

export default PregledKnjiga;
