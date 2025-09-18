import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function GrafikPozajmice() {
  const [data, setData] = useState([["Knjiga", "Broj pozajmica"]]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/pozajmice",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Greška prilikom dohvata pozajmica");
        const result = await response.json();

        // Count loans per book
        const counts = {};
        result.data.forEach((p) => {
          const bookName = p.knjiga.naslov || "Nepoznata knjiga";
          counts[bookName] = (counts[bookName] || 0) + 1;
        });

        // Convert to Google Charts data format
        const chartData = [["Knjiga", "Broj pozajmica"]];
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1]) // descending
          .forEach(([name, count]) => {
            chartData.push([name, count]);
          });

        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <p>Učitavanje grafa...</p>;

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        title: "Najpopularnije knjige",
        chartArea: { width: "70%" },
        hAxis: { title: "Broj pozajmica" },
        vAxis: { title: "Knjiga" },
        bars: "horizontal",
        colors: ["#644117"],
      }}
    />
  );
}

export default GrafikPozajmice;
