import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

function TrendingBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_NYTIMES_API_KEY;
  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`
        );
        if (!response.ok) throw new Error("Greška pri prihvatanju knjiga");
        const data = await response.json();
        setBooks((data.results.books || []).slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBooks();
  }, []);

  if (loading) return <p>Učitavanje popularnih knjiga...</p>;

  return (
    <div className="mt-3 tekst-na-backgroundu">
      <h5>Popularne knjige (New York Times)</h5>
      <Row className="g-2 mt-2">
        {books.map((book) => (
          <Col key={book.primary_isbn13} xs={12} sm={4}>
            <Card className="h-100 text-center" style={{ fontSize: "0.8rem" }}>
              <Card.Img
                variant="top"
                src={book.book_image}
                alt={book.title}
                style={{ height: "150px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "0.9rem" }}>{book.title}</Card.Title>
                <Card.Text style={{ fontSize: "0.8rem" }}>{book.author}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TrendingBooks;
