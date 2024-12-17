import { useState } from "react";

function AddUserForm({ onAddUser, onCancel }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar usuário");
      }

      alert("Usuário adicionado com sucesso!");
      onAddUser();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-user-form w-full max-w-md flex flex-col items-center justify-center space-y-6 mx-auto bg-[#272727]/50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white">Adicionar Usuário</h2>

      <form className="w-full space-y-4" onSubmit={handleAddUser}>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-white">Nome de Usuário</label>
          <input
            type="text"
            className="block w-full rounded-lg border-none bg-white/10 py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-white">Email</label>
          <input
            type="email"
            className="block w-full rounded-lg border-none bg-white/10 py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-white">Senha</label>
          <input
            type="password"
            className="block w-full rounded-lg border-none bg-white/10 py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center rounded-md bg-blue-500 py-2 px-4 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none active:bg-blue-600 backdrop-blur-md"
          >
            Adicionar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full inline-flex justify-center items-center rounded-md bg-gray-500 py-2 px-4 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none active:bg-gray-600 backdrop-blur-md"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
