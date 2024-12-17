import { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InVzZXIxIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzM0MjIxNzA2fQ.alhGManwWjb_GguGHJKBZyWEiyIZml4BxZevdiRpl6Y";

  useEffect(() => {
    // Decodificar o token para verificar a role do usuário
    const userRole = localStorage.getItem('userRole');

    // Se o usuário for ADMIN, permite mostrar o botão
    if (userRole === 'ADMIN') {
      setIsAdmin(true);
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Usuário excluído com sucesso!");
          setUsers(users.filter(user => user.id !== userId)); // Remove o usuário da lista
        } else {
          throw new Error(`Erro ao excluir usuário: ${response.status}`);
        }
      } catch (error) {
        alert("Erro ao excluir usuário.");
        console.error(error);
      }
    }
  };

  const handleEdit = (userId) => {
    // Você pode redirecionar para um formulário de edição de usuário
    alert(`Editar usuário com ID: ${userId}`);
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="people-screen">
      <Navbar />
      {/* Linha com título e botão */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        {/* Título à esquerda */}
        <h1 className="text-2xl font-semibold">People</h1>
        {/* Botão à direita (apenas para ADMIN) */}
        {isAdmin && (
          <button
            onClick={() => alert("Adicionar novo usuário!")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Adicionar Usuário
          </button>
        )}
      </div>

      {/* Lista de usuários */}
      <div className="min-h-screen flex flex-wrap items-center justify-center gap-4 bg-[#272727]/50 backdrop-blur-sm p-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="w-40 h-40 flex flex-col items-center justify-center bg-[#272727]/50 backdrop-blur-sm text-white rounded-md shadow-lg p-2"
          >
            {/* Nome do usuário */}
            <h3 className="text-sm font-semibold text-center">{user.username}</h3>
            {/* Email do usuário */}
            <p className="text-xs text-gray-300 text-center">{user.email}</p>
            {/* Link de detalhes */}
            <a
              href={`http://localhost:8080/users/${user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 mt-2 hover:underline"
            >
              Mais detalhes
            </a>

            {/* Botões de editar e excluir (visíveis apenas para ADMIN) */}
            {isAdmin && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md shadow hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md shadow hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;

