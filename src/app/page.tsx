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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, []);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">User Manager</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <UserList users={users} loading={loading} />

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onUserAdded={loadUsers}
        />
      )}
    </main>
  );
}
