import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; // Certifique-se de importar corretamente
import Navbar from "../../components/Navbar";

import AddUserForm from "../../components/AddUserForm"; // Importar o componente

function UsersList() {
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleAddUser = () => {
    setShowAddUserForm(false);
    // Atualize a lista de usuários após adicionar
    window.location.reload(); 
  };

  return (
    <div className="people-screen">
      <Navbar />
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold">People</h1>
        {isAdmin && (
          <button
            onClick={() => setShowAddUserForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Adicionar Usuário
          </button>
        )}
      </div>

      {showAddUserForm ? (
        <AddUserForm
          onAddUser={handleAddUser}
          onCancel={() => setShowAddUserForm(false)}
        />
      ) : (
        <div className="min-h-screen flex flex-wrap items-center justify-center gap-4 bg-[#272727]/50 backdrop-blur-sm p-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="w-40 h-40 flex flex-col items-center justify-center bg-[#272727]/50 backdrop-blur-sm text-white rounded-md shadow-lg p-2"
            >
              {/* Detalhes do usuário */}
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
      )}
    </div>
  );
}

