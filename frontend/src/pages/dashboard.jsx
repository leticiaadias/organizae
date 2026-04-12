import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", location: "" });
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/events/", {
        headers: { Authorization: `Token ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/events/", formData, {
        headers: { Authorization: `Token ${token}` },
      });
      setEvents([...events, response.data]);
      setShowForm(false);
      setFormData({ name: "", date: "", location: "" });
    } catch (error) {
      console.error("Erro ao criar evento", error);
      alert("Não foi possível criar o evento. Verifique os dados.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10 pb-4 border-b border-slate-700">
          <h1 className="text-3xl font-black text-blue-400">Organizaê - Meu Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 flex items-center gap-2 rounded-lg font-semibold shadow-md transition-all active:scale-95"
          >
            Sair
          </button>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-200">Meus Eventos</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg transform active:scale-95 transition-all"
          >
            {showForm ? "Cancelar" : "+ Criar Evento"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreateEvent} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-8 shadow-xl animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-blue-300">Novo Evento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Evento</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  placeholder="Ex: Festa da Empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Local</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  placeholder="Ex: Salão Principal"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 px-8 py-2 text-white font-bold rounded-lg shadow-md transition-all active:scale-95"
              >
                Salvar Evento
              </button>
            </div>
          </form>
        )}

        {events.length === 0 ? (
          <div className="bg-slate-800 border-2 border-dashed border-slate-700 rounded-xl p-12 text-center text-slate-400">
            <p className="text-lg">Você ainda não criou nenhum evento.</p>
            <p className="text-sm">Clique em "Criar Evento" para começar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div key={evt.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{evt.name}</h3>
                  <div className="text-slate-400 text-sm space-y-1 mb-4">
                    <p className="flex items-center gap-2">
                       📅 {evt.date.split('-').reverse().join('/')}
                    </p>
                    <p className="flex items-center gap-2">
                       📍 {evt.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
