import { useState } from "react";

export default function ScannerPage({ onLogout }) {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxAsE56jos_5kHUTFPlyf-qmBK8gE2Qk7uVadiVoU8MZmYm3JsGP6Bkm9JU5JGXeLZK/exec?path=checkMember&id=" + id);
      const data = await res.json();
      if (data.status === "OK") {
        setMessage("✅ Adhérent valide : " + data.nom);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("Erreur de connexion");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎫 Scanner</h1>
      <button onClick={onLogout}>Se déconnecter</button>
      <form onSubmit={handleScan}>
        <input
          type="text"
          placeholder="ID ou code"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Vérifier</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
