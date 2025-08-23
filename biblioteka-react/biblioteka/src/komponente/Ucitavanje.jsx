import Spinner from 'react-bootstrap/Spinner';

function Ucitavanje() {
  return (
    <div  className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Učitavanje...</span>
    </Spinner>
    </div>
  );
}

export default Ucitavanje;