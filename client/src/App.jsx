// client/src/App.jsx
import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("");

  const searchRepos = async () => {
    if (!query.trim()) return;
    setStatus("Searching…");
    setResults([]);
    try {
      // Call your backend (Option A route)
      const res = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      const items = res.data?.items || [];
      setResults(items);
      setStatus(`Saved ${items.length} results for “${query}” (not actually saving yet, just showing).`);
    } catch (err) {
      console.error(err);
      setStatus("Error: could not fetch results.");
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter") searchRepos();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 24 }}>
      {/* Search (Home) */}
      <section style={{ maxWidth: 720, margin: "0 auto 24px", background: "#fff", padding: 24, border: "2px solid #ddd", borderRadius: 8 }}>
        <h1 style={{ textAlign: "center", marginBottom: 16 }}>GitHub Repo Searcher</h1>

        <div style={{ display: "flex", gap: 12 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onEnter}
            placeholder="Enter keyword…"
            style={{ flex: 1, padding: 12, border: "2px solid #ddd", borderRadius: 6, fontSize: 16 }}
          />
          <button
            onClick={searchRepos}
            style={{ padding: "12px 20px", background: "#007bff", color: "#fff", border: 0, borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
          >
            Search
          </button>
        </div>

        {status && (
          <div style={{
            marginTop: 12, padding: 12, borderRadius: 6,
            background: status.startsWith("Error") ? "#f8d7da" : "#d4edda",
            color: status.startsWith("Error") ? "#721c24" : "#155724",
            border: `1px solid ${status.startsWith("Error") ? "#f5c6cb" : "#c3e6cb"}`
          }}>
            {status}
          </div>
        )}
      </section>

      {/* Dashboard */}
      <section style={{ maxWidth: 960, margin: "0 auto", background: "#fff", padding: 24, border: "2px solid #ddd", borderRadius: 8 }}>
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Stored GitHub Repositories</h2>

        {results.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
            No repositories yet. Try a search above!
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {results.map((repo) => (
              <div key={repo.id} style={{ border: "1px solid #e1e1e1", borderRadius: 8, padding: 16 }}>
                <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 18 }}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: "#0066cc", textDecoration: "none" }}>
                    {repo.full_name || repo.name}
                  </a>
                </h3>
                <p style={{ margin: 0, color: "#555", minHeight: 42 }}>
                  {repo.description || "No description"}
                </p>
                <div style={{ marginTop: 10, fontSize: 14, color: "#666" }}>
                  ⭐ Stars: {repo.stargazers_count ?? 0}
                  <br />
                  <i>Keyword: “{query}”</i>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
