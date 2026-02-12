import { useState } from "react";
import { Search, Plus, X, MapPin, Phone, Mail, User, Building2, Users2 } from "lucide-react";
import { areas } from "../data/areas";
import type { Client, ClientType, Area } from "../types";

type TabFilter = "Kaikki" | "Yritys" | "Kuluttaja";

export default function ClientsView({
  clients,
  onAddClient,
}: {
  clients: Client[];
  onAddClient: (client: Client) => void;
}) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabFilter>("Kaikki");
  const [showModal, setShowModal] = useState(false);

  const filtered = clients.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = tab === "Kaikki" || c.type === tab;
    return matchesSearch && matchesTab;
  });

  const counts = {
    Kaikki: clients.length,
    Yritys: clients.filter((c) => c.type === "Yritys").length,
    Kuluttaja: clients.filter((c) => c.type === "Kuluttaja").length,
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Asiakkaat</h1>
          <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
            {clients.length} asiakasta yhteensä
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "#94d60a", color: "#fff" }}
        >
          <Plus size={16} />
          Lisää asiakas
        </button>
      </div>

      {/* Search + tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hae asiakasta nimellä..."
            className="w-full rounded-lg text-sm pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={{ background: "#f8faf5", border: "1px solid #e2e8d5", color: "#1e293b" }}
          />
        </div>
        <div className="flex rounded-lg overflow-hidden text-sm" style={{ border: "1px solid #e2e8d5" }}>
          {(["Kaikki", "Yritys", "Kuluttaja"] as TabFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 py-1.5 transition-all whitespace-nowrap"
              style={
                tab === t
                  ? { background: "#e2e8d5", color: "#1e293b" }
                  : { color: "#64748b" }
              }
            >
              {t} ({counts[t]})
            </button>
          ))}
        </div>
      </div>

      {/* Client cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="rounded-xl p-4 space-y-2"
            style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm" style={{ color: "#1e293b" }}>
                {client.name}
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap flex-shrink-0"
                style={
                  client.type === "Yritys"
                    ? { background: "#94d60a15", color: "#6ba200", border: "1px solid #94d60a30" }
                    : { background: "#3b82f615", color: "#2563eb", border: "1px solid #3b82f630" }
                }
              >
                {client.type === "Yritys" ? (
                  <span className="flex items-center gap-1"><Building2 size={10} />{client.type}</span>
                ) : (
                  <span className="flex items-center gap-1"><Users2 size={10} />{client.type}</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#64748b" }}>
              <MapPin size={12} />
              {client.area}
            </div>
            {client.contactPerson && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "#64748b" }}>
                <User size={12} />
                {client.contactPerson}
              </div>
            )}
            {client.phone && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "#64748b" }}>
                <Phone size={12} />
                {client.phone}
              </div>
            )}
            {client.email && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "#64748b" }}>
                <Mail size={12} />
                {client.email}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sm" style={{ color: "#94a3b8" }}>
          Ei hakutuloksia
        </div>
      )}

      {/* Add client modal */}
      {showModal && (
        <AddClientModal
          onSave={(client) => {
            onAddClient(client);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

function AddClientModal({
  onSave,
  onClose,
}: {
  onSave: (client: Client) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState<ClientType>("Yritys");
  const [area, setArea] = useState<Area>("Varkaus keskusta");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    onSave({
      id: `c-new-${Date.now()}`,
      name: name.trim(),
      type,
      area,
      contactPerson: contactPerson.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
    });
  };

  const inputStyle = {
    background: "#f8faf5",
    border: "1px solid #e2e8d5",
    color: "#1e293b",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative rounded-xl p-5 w-full max-w-sm space-y-4 shadow-xl"
        style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Lisää asiakas</h3>
          <button onClick={onClose} className="p-1 rounded" style={{ color: "#94a3b8" }}>
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="text-sm mb-1.5 block" style={{ color: "#64748b" }}>Nimi *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Asiakkaan nimi"
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="text-sm mb-1.5 block" style={{ color: "#64748b" }}>Tyyppi</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ClientType)}
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          >
            <option value="Yritys">Yritys</option>
            <option value="Kuluttaja">Kuluttaja</option>
          </select>
        </div>

        <div>
          <label className="text-sm mb-1.5 block" style={{ color: "#64748b" }}>Alue</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as Area)}
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          >
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm mb-1.5 block" style={{ color: "#64748b" }}>Yhteyshenkilö</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            placeholder="Yhteyshenkilön nimi"
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="text-sm mb-1.5 block" style={{ color: "#64748b" }}>Puhelin</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="040-1234567"
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="text-sm mb-1.5 block" style={{ color: "#64748b" }}>Sähköposti</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nimi@esimerkki.fi"
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 rounded-lg text-sm transition-all"
            style={{ border: "1px solid #e2e8d5", color: "#64748b" }}
          >
            Peruuta
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: "#94d60a", color: "#fff" }}
          >
            Lisää
          </button>
        </div>
      </div>
    </div>
  );
}
