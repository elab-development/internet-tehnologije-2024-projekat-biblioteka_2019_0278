import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

function PozajmicaKartica({pozajmica}) {
      
 return (<Card style={{ width: '18rem' , textAlign: 'left', display:'flex'}}>
      <Card.Body style={{textAlign: 'justify'}}>
        <Card.Title style={{textAlign:'left'}}>{pozajmica.knjiga.naslov}</Card.Title>
            <Table style={{
            width: '100%',
            textAlign: 'justify',
            borderCollapse: 'collapse',
            margin: '0 auto'
          }}
>
            <thead>
                <tr>
                    <th colSpan="2">Detalji knjige</th>
                </tr>
                </thead>
         <tbody>
         
            <tr>
              <td><strong>Autor:</strong></td>
              <td>{pozajmica.knjiga.pisac}</td>
            </tr>
            <tr>
              <td><strong>Datum pozajmljivanja:</strong></td>
              <td>{pozajmica.datum_pozajmice}</td>
            </tr>
            {pozajmica.datum_vracanja ? (
                <tr>
              <td><strong>Datum vraćanja:</strong></td>
              <td>{pozajmica.datum_vracanja}</td>
              </tr>) : null
            }
          </tbody>
        </Table>
         <div style={{display:'flex', justifyContent:'center'}}>
        <Button variant="primary">Vrati</Button>
        </div>
      </Card.Body>
    </Card>
  )
}



export default PozajmicaKartica