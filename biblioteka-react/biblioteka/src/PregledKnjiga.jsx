import React from 'react'
import KnjigaKartica from './komponente/KnjigaKartica'

function PregledKnjiga({knjige}) {

  const loggedIn = localStorage.getItem("token") !== null;

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'normal'}}>
        {knjige? knjige.map((knjiga) => (
          <KnjigaKartica key={knjiga.id} knjiga={knjiga} loggedIn={loggedIn} />
        )): null}
        </div>
       

  )
}

export default PregledKnjiga