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

function PregledKnjiga({ clanId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKnjige, setFilteredKnjige] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDodajKnjiguModal, setShowDodajKnjiguModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [metaLinks, setMetaLinks] = useState([]);

  const params = useParams();
  const location = useLocation();
  const id = clanId || params.id;

  const isOnKnjigeEndpoint = location.pathname === '/admin/knjige';

  const vratiKnjige = useCallback(async (page = 1, query = "") => {
    setSearchLoading(true);
    let url = `http://localhost:8000/api/knjige?page=${page}`;
    if (query.trim()) {
      url += `&titleQuery=${encodeURIComponent(query)}`;
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
  }, []);

  useEffect(() => {
    vratiKnjige(1, searchQuery);
  }, [vratiKnjige]);

  const handleSearch = () => {
    vratiKnjige(1, searchQuery);
  };

  const handlePageChange = (page) => {
    vratiKnjige(page, searchQuery);
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
        {localStorage.getItem("adminToken") && isOnKnjigeEndpoint &&  (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Pregled knjiga</h2>
            <Button
              variant="success"
              onClick={() => setShowDodajKnjiguModal(true)}
            >
              Dodaj Knjigu
            </Button>
          </div>
        )}
        <Form className="mb-4">
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
                        vratiKnjige(currentPage, searchQuery);
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
        show={showDodajKnjiguModal}
        onHide={() => setShowDodajKnjiguModal(false)}
        onBookAdded={() => vratiKnjige(currentPage, searchQuery)}
      />
    </div>
  );
}

export default PregledKnjiga;
