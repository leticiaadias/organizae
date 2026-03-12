import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-700 pb-6">
          <h1 className="text-3xl font-black text-blue-400">Organizaê</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 text-red-500 border border-red-500/50 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            Sair
          </button>
        </header>

        <main>
          <h2 className="text-2xl mb-4">Bem-vindo ao Organizaê!</h2>
          <p className="text-slate-400">
            Você está na sua área logada. Aqui listaremos seus eventos em breve.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-blue-400 mb-2">Meus Eventos</h3>
              <p className="text-3xl font-black text-white">0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
