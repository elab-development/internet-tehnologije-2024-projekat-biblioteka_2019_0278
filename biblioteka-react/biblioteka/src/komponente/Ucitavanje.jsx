import Spinner from 'react-bootstrap/Spinner';

function Ucitavanje() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Učitavanje...</span>
    </Spinner>
  );
}

export default Ucitavanje;