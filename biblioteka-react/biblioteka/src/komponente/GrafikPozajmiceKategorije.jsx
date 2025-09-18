import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function GrafikPozajmiceKategorije() {
  const [data, setData] = useState([["Kategorija", "Broj pozajmica"]]);
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

        // Count loans per category
        const counts = {};
        result.data.forEach((p) => {
          const category = p.knjiga.kategorija || "Nepoznata kategorija";
          counts[category] = (counts[category] || 0) + 1;
        });

        // Convert to Google Charts data format
        const chartData = [["Kategorija", "Broj pozajmica"]];
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1]) // descending
          .forEach(([category, count]) => {
            chartData.push([category, count]);
          });

        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoans();
  }, [token]);

  if (loading) return <p>Učitavanje grafa...</p>;

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        title: "Najpopularnije kategorije",
        chartArea: { width: "70%" },
        hAxis: { title: "Broj pozajmica" },
        vAxis: { title: "Kategorija" },
        bars: "horizontal",
        colors: ["#a52a2a"],
      }}
    />
  );
}

export default GrafikPozajmiceKategorije;
