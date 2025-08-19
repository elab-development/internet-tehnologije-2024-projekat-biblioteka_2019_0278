import React from 'react'
import KnjigaKartica from './komponente/KnjigaKartica'

function PregledKnjiga({knjige, osveziStranicu}) {

  const loggedIn = localStorage.getItem("token") !== null;

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'normal'}}>
        {knjige? knjige.map((knjiga) => (
          <KnjigaKartica key={knjiga.id} knjiga={knjiga} loggedIn={loggedIn} osveziStranicu={osveziStranicu} />
        )): null}
        </div>
       

  )
}

export default PregledKnjiga