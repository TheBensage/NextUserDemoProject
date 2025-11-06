"use client";

import AddUserModal from "@/components/AddUserModal";
import UserList from "@/components/UserList";
import { User } from "@/types";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await loadUsers();
    };

    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-purple-800">User Manager</h1>
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
      >
        + Add User
      </button>

      <UserList users={users} loading={loading} />

      <AddUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUserAdded={loadUsers}
      />
    </main>
  );
}
