import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

function KnjigaKartica({knjiga, loggedIn}) {

    
 return (<Card style={{ width: '18rem' , textAlign: 'left', display:'flex'}}>
      <Card.Body style={{textAlign: 'justify'}}>
        <Card.Title style={{textAlign:'left'}}>{knjiga.naslov}</Card.Title>
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
              <td>{knjiga.pisac}</td>
            </tr>
            <tr>
              <td><strong>Količina:</strong></td>
              <td>{knjiga.kolicina}</td>
            </tr>
          </tbody>
        </Table>
        {loggedIn? (<div style={{display:'flex', justifyContent:'center'}}>
        <Button variant="primary">Pozajmi</Button>
        </div>) : null}
      </Card.Body>
    </Card>
  )
}

export default KnjigaKartica