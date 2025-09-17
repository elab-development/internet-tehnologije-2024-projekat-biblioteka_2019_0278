import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";

const KreirajKnjiguModal = ({ show, onHide, onBookAdded }) => {
  const token = localStorage.getItem("adminToken");
  const [kategorije, setKategorije] = useState([]);

  const [formData, setFormData] = useState({
    naslov: "",
    pisac: "",
    kolicina: 1,
    kategorija: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchKategorije();
    }
  }, [show]);

  const fetchKategorije = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/knjige/kategorije"
      );
      if (response.ok) {
        const result = await response.json();
        setKategorije(result.kategorije || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const searchBooks = async () => {
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchQuery
        )}&maxResults=5`
      );
      const data = await response.json();

      if (data.items) {
        const books = data.items.map((item) => ({
          title: item.volumeInfo.title || "Unknown",
          authors: item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Unknown",
        }));
        setSearchResults(books);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const selectBook = (book) => {
    setFormData({
      ...formData,
      naslov: book.title,
      pisac: book.authors,
    });
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/knjige", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          naslov: "",
          pisac: "",
          kolicina: 1,
          kategorija: "",
        });
        setSearchQuery("");
        setSearchResults([]);
        onHide();
        if (onBookAdded) {
          onBookAdded();
        }
        console.log("Knjiga je uspešno dodana!");
      } else {
        console.error("Greška pri dodavanju knjige");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  const handleClose = () => {
    setFormData({
      naslov: "",
      pisac: "",
      kolicina: 1,
      kategorija: "",
    });
    setSearchQuery("");
    setSearchResults([]);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj novu knjigu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 p-3 bg-light rounded">
          <Form.Label>Pretraži postojeće knjige putem Google Books:</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Pretraži knjige..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchBooks();
                }
              }}
            />
            <Button
              variant="outline-primary"
              onClick={searchBooks}
              disabled={searchLoading}
            >
              {searchLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Pretraži"
              )}
            </Button>
          </InputGroup>

          {searchResults.length > 0 && (
            <div className="mt-2">
              {searchResults.map((book, index) => (
                <div
                  key={index}
                  className="p-2 border-bottom bg-white rounded my-1 cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => selectBook(book)}
                >
                  <strong>{book.title}</strong>
                  <br />
                  <small className="text-muted">{book.authors}</small>
                </div>
              ))}
            </div>
          )}
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formAddNaslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control
              type="text"
              name="naslov"
              value={formData.naslov}
              onChange={handleFormChange}
              placeholder="Unesite naslov knjige"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddPisac">
            <Form.Label>Pisac</Form.Label>
            <Form.Control
              type="text"
              name="pisac"
              value={formData.pisac}
              onChange={handleFormChange}
              placeholder="Unesite ime pisca"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddKategorija">
            <Form.Label>Kategorija</Form.Label>
            <Form.Select
              name="kategorija"
              value={formData.kategorija}
              onChange={handleFormChange}
            >
              <option value="">Izaberite kategoriju</option>
              {kategorije.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() +
                    cat.slice(1).replace(/_/g, " ")}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddKolicina">
            <Form.Label>Količina</Form.Label>
            <Form.Control
              type="number"
              name="kolicina"
              value={formData.kolicina}
              onChange={handleFormChange}
              min="1"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Otkaži
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!formData.naslov || !formData.pisac || !formData.kategorija}
        >
          Dodaj Knjigu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KreirajKnjiguModal;
