// Breadcrumbs.js
import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

// Map route segments to human-friendly Serbian names
const labels = {
  "knjige": "Knjige",
  "pozajmice": "Pozajmice",
  "rezervacije": "Rezervacije",
  "login": "Prijava",
  "admin": "Admin",
  "clanovi": "Članovi",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-body-tertiary border-bottom">
      <Container>
        <Breadcrumb className="mb-0 py-2">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Početna
          </Breadcrumb.Item>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            const label = labels[name] || decodeURIComponent(name);

            return isLast ? (
              <Breadcrumb.Item active key={name}>
                {label}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: routeTo }}
                key={name}
              >
                {label}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
