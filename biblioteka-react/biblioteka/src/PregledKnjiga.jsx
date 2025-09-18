import React, { useState, useEffect, useCallback } from "react";
import KnjigaKartica from "./komponente/KnjigaKartica";
import DodajKnjiguModal from "./komponente/KreirajKnjiguModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ucitavanje from "./komponente/Ucitavanje";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";
import { useLocation, useParams } from "react-router";
import useToggle from "./hooks/useToggle";

function PregledKnjiga({ clanId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategorija, setSelectedKategorija] = useState("");
  const [kategorije, setKategorije] = useState([]);
  const [filteredKnjige, setFilteredKnjige] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const dodajKnjiguModal = useToggle();

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [metaLinks, setMetaLinks] = useState([]);

  const params = useParams();
  const location = useLocation();
  const id = clanId || params.id;

  const isOnKnjigeEndpoint = location.pathname === "/admin/knjige";

  useEffect(() => {
    const fetchKategorije = async () => {
      try {
        let url = `http://localhost:8000/api/knjige/kategorije`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setKategorije(result.kategorije || {});
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchKategorije();
  }, []);

  const vratiKnjige = useCallback(
    async (page = 1, query = "", kategorija = "", sortOrder="") => {
      setSearchLoading(true);
      let url = `http://localhost:8000/api/knjige?page=${page}`;
      if (query.trim()) {
        url += `&titleQuery=${encodeURIComponent(query)}`;
      }
      if (kategorija.trim()) {
        url += `&kategorija=${encodeURIComponent(kategorija)}`;
      }
      if (sortOrder.trim()) {
        url += `&sortOrder=${encodeURIComponent(sortOrder)}`;
      }
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Greška prilikom pretrage.");
        const result = await response.json();
        setFilteredKnjige(result.data || []);
        setCurrentPage(result.meta.current_page);
        setLastPage(result.meta.last_page);
        setTotal(result.meta.total);
        setMetaLinks(result.meta.links || []);
      } catch (error) {
        setFilteredKnjige([]);
        console.error(error);
      } finally {
        setSearchLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    vratiKnjige(1, searchQuery, selectedKategorija, sortOrder);
  }, [vratiKnjige]);

  const handleSearch = () => {
    vratiKnjige(1, searchQuery, selectedKategorija, sortOrder);
  };

  const handleKategorijaChange = (e) => {
    const newKategorija = e.target.value;
    console.log(e.target.value);
    setSelectedKategorija(newKategorija);
    setCurrentPage(1);
    vratiKnjige(1, searchQuery, newKategorija, sortOrder);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedKategorija("");
    setCurrentPage(1);
  
    vratiKnjige(1, "", "", sortOrder);
  };
  const handlePageChange = (page) => {
    vratiKnjige(page, searchQuery, selectedKategorija, sortOrder);
  };

  const handleOpenKreirajKnjiguModal = () => {
    dodajKnjiguModal.setTrue();
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    vratiKnjige(1, searchQuery, selectedKategorija, sortOrder === "asc" ? "desc" : "asc");
  };

  

  // Use meta.links for pagination rendering
  const renderPagination = () => {
    if (lastPage <= 1 || !metaLinks.length) return null;
    return (
      <Pagination className="justify-content-center mt-4">
        {metaLinks.map((link, idx) => {
          // Skip "Previous" and "Next" if you want only numbers, or handle them
          if (link.label.includes("Previous")) {
            return (
              <Pagination.Prev
                key={idx}
                disabled={link.url === null}
                onClick={() => {
                  if (link.url) {
                    // Extract page number from url
                    const match = link.url.match(/page=(\d+)/);
                    if (match) handlePageChange(Number(match[1]));
                  }
                }}
              />
            );
          }
          if (link.label.includes("Next")) {
            return (
              <Pagination.Next
                key={idx}
                disabled={link.url === null}
                onClick={() => {
                  if (link.url) {
                    const match = link.url.match(/page=(\d+)/);
                    if (match) handlePageChange(Number(match[1]));
                  }
                }}
              />
            );
          }
          // Numbered pages
          return (
            <Pagination.Item
              key={idx}
              active={link.active}
              onClick={() => {
                if (link.url) {
                  const match = link.url.match(/page=(\d+)/);
                  if (match) handlePageChange(Number(match[1]));
                }
              }}
            >
              {link.label.replace(/<[^>]+>/g, "")}
            </Pagination.Item>
          );
        })}
      </Pagination>
    );
  };

  return (
    <div>
      <Container className="container-custom">
        {localStorage.getItem("adminToken") && isOnKnjigeEndpoint && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Pregled knjiga</h2>
            <Button variant="success" onClick={handleOpenKreirajKnjiguModal}>
              Dodaj Knjigu
            </Button>
          </div>
        )}
        <Form className="mb-4">
            <Row className="g-2 align-items-end">
            <Col md={5}> {/* Changed from 6 to 5 */}
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Pretraži po naslovu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
                <Button variant="primary" onClick={handleSearch}>
                  Pretraži
                </Button>
              </InputGroup>
            </Col>

            <Col md={4}> {/* No change, still 4 */}
              <Form.Select
                value={selectedKategorija}
                onChange={handleKategorijaChange}
              >
                <option value="">Sve kategorije</option>
                {kategorije.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3} className="d-flex gap-2"> {/* Changed from 2 to 3 */}
              <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="w-100"
              >
                Očisti
              </Button>
              <Button
                variant="secondary"
                onClick={toggleSortOrder}
                className="w-100"
              >
                {/* Text is a bit long, so it needs more space */}
                Količina ({sortOrder === "asc" ? "▲" : "▼"})
              </Button>
            </Col>
          </Row>
        </Form>
        {searchLoading ? (
          <Ucitavanje />
        ) : (
          <>
            <Row xs={1}>
              {filteredKnjige && filteredKnjige.length > 0 ? (
                filteredKnjige.map((knjiga) => (
                  <Col key={knjiga.id}>
                    <KnjigaKartica
                      knjiga={knjiga}
                      osveziStranicu={() => {
                        vratiKnjige(currentPage, searchQuery, selectedKategorija, sortOrder);
                      }}
                      clanId={id}
                    />
                  </Col>
                ))
              ) : (
                <Col>
                  <p>Nema knjiga za prikaz.</p>
                </Col>
              )}
            </Row>
            {renderPagination()}
          </>
        )}
      </Container>

      <DodajKnjiguModal
        show={dodajKnjiguModal.value}
        onHide={() => dodajKnjiguModal.setFalse()}
        onBookAdded={() =>
          vratiKnjige(currentPage, searchQuery, selectedKategorija, sortOrder)
        }
      />
    </div>
  );
}

export default PregledKnjiga;
