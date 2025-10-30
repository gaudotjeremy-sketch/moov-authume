import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://script.google.com/macros/s/TON_SCRIPT_ID/exec?path=checkPassword&password=" + password);
      const data = await res.json();

      if (data.status === "OK") {
        onLogin("admin", {});
      } else {
        setError("❌ Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🔐 Connexion Admin</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
