"use client";

import { User } from "@/types";

export default function UserList({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}) {
  if (loading) return <p>Loading...</p>;

  if (users.length === 0)
    return <p className="text-gray-500">No users yet. Add one above!</p>;

  return (
    <ul className="space-y-3">
      {users.map((u) => (
        <li key={u.id} className="border p-3 rounded bg-gray-50 flex flex-col">
          <strong>{u.fullName}</strong> ({u.age}) – {u.country}
          <div className="text-sm text-gray-600">Interests: {u.interests}</div>
        </li>
      ))}
    </ul>
  );
}
