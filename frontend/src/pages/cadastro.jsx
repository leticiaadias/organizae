import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importamos o Link para navegar sem recarregar a página

function Cadastro() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Endpoint do seu Django
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      alert(`Usuário ${response.data.username} cadastrado com sucesso!`);
    } catch (error) {
      console.error("Erro:", error);
      alert(" Erro ao cadastrar. Tente novamente!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        <h1 className="text-3xl font-black mb-2 text-center text-blue-400">
          Organizaê
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Crie sua conta no sistema oficial
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">
              Usuário
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
              placeholder="Ex: Ana Maria"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 ml-1">
              E-mail
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
              placeholder="seu@email.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 ml-1">Senha</label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all"
          >
            Finalizar Cadastro
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
