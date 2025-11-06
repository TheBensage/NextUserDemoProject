"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/types";

export default function UserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "User not found");
          setUser(null);
        } else {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="text-gray-500 animate-pulse">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-purple-50 to-white">
      <button
        onClick={() => router.back()}
        className="mb-6 text-purple-600 font-semibold hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-800">{user!.fullName}</h1>
        <p className="text-gray-600 mt-2">
          {user!.age} years old - {user!.country}
        </p>
        <p className="text-gray-500 mt-2">Interests: {user!.interests}</p>
      </div>
    </div>
  );
}
