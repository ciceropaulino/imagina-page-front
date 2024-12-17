import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { PencilLine, Trash } from "phosphor-react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Hook useNavigate para navegação

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InVzZXIxIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzM0MjIxNzA2fQ.alhGManwWjb_GguGHJKBZyWEiyIZml4BxZevdiRpl6Y";

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "ADMIN") {
      setIsAdmin(true);
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Usuário excluído com sucesso!");
          setUsers(users.filter((user) => user.id !== userId));
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
    alert(`Editar usuário com ID: ${userId}`);
  };

  const handleAddUser = () => {
    navigate("/add_user"); // Navegar para a página de adicionar usuário
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="people-screen">
      <Navbar />
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold">People</h1>
        {isAdmin && (
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Adicionar Usuário
          </button>
        )}
      </div>

      <div className="min-h-screen flex flex-wrap items-center justify-center gap-4 bg-[#272727]/50 backdrop-blur-sm p-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="w-40 h-40 flex flex-col items-center justify-center bg-[#272727]/50 backdrop-blur-sm text-white rounded-md shadow-lg p-2"
          >
            <h3 className="text-sm font-semibold text-center">{user.username}</h3>
            <p className="text-xs text-gray-300 text-center">{user.email}</p>
            <a
              href={`http://localhost:8080/users/${user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 mt-2 hover:underline"
            >
              Mais detalhes
            </a>
            {isAdmin && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-black/50 text-white px-1 py-1 rounded-md shadow-black shadow-inner hover:bg-blue-600/50 active:scale-95"
                >
                  <PencilLine color="#1E88E5"/>
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-black/50 text-white px-1 py-1 rounded-md shadow-black shadow-inner hover:bg-red-600/50 active:scale-95"
                >
                  <Trash color="#ff0000" />
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

