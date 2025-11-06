"use client";

import { User } from "@/types";
import { useRouter } from "next/navigation";

export default function UserList({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}) {
  const router = useRouter();

  if (loading)
    return (
      <p className="text-gray-500 text-lg animate-pulse">Loading users...</p>
    );

  if (users.length === 0)
    return (
      <p className="text-gray-400 text-lg italic">
        No users yet. Add one above!
      </p>
    );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
      {users.map((u) => (
        <li
          key={u.id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-col"
        >
          <div className="text-lg font-semibold text-purple-800">
            {u.fullName}
          </div>
          <div className="text-sm text-gray-600">
            {u.age} years old – {u.country}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Interests: {u.interests}
          </div>
          <button
            onClick={() => router.push(`/users/${u.id}`)}
            className="
              mt-4
              px-4 py-2
              bg-purple-600 text-white
              font-semibold
              rounded-lg
              shadow-sm
              hover:bg-purple-700
              hover:shadow-md
              transition
              duration-200
              ease-in-out
              self-start
            "
          >
            View
          </button>
        </li>
      ))}
    </ul>
  );
}
