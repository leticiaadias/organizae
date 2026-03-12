import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData
      );

      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        <h1 className="text-3xl font-black mb-2 text-center text-blue-400">
          Organizaê
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Acesse sua conta para gerenciar eventos
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">
              Usuário
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
              placeholder="Seu usuário"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 ml-1 text-white">
              Senha
            </label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all mt-4"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-blue-400 hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
