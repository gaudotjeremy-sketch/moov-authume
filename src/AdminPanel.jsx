import { useState, useEffect } from "react";

export default function AdminPanel({ onLogout }) {
  const [tab, setTab] = useState("adherents");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("https://script.google.com/macros/s/TON_SCRIPT_ID/exec?path=" + tab);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [tab]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚙️ Panneau d’administration</h1>
      <button onClick={onLogout}>Se déconnecter</button>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setTab("adherents")}>👥 Adhérents</button>
        <button onClick={() => setTab("evenements")}>🎉 Événements</button>
        <button onClick={() => setTab("benevoles")}>🙋 Bénévoles</button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              {Object.keys(data[0] || {}).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((v, j) => (
                  <td key={j}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
