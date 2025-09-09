import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

function PocetnaStranica() {
  return (
    <div className="pocetna-biblioteka">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center tekst-na-backgroundu">
        
            <h1>Dobrodošli u Biblioteku</h1>
            <p>
              Naša biblioteka je mesto gde knjige žive, a znanje je dostupno svima.  
              Otkrijte bogatu kolekciju romana, stručne literature i časopisa.  
              Bez obzira da li ste ljubitelj klasike, nauke ili umetnosti - ovde ćete pronaći inspiraciju.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PocetnaStranica