"use client";

import { useState } from "react";

export default function AddUserModal({
  onClose,
  onUserAdded,
}: {
  onClose: () => void;
  onUserAdded: () => void;
}) {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    country: "",
    interests: [] as string[],
  });

  const toggleInterest = (interest: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
      }),
    });

    if (res.ok) {
      setForm({ fullName: "", age: "", country: "", interests: [] });
      onUserAdded();
      onClose();
    } else {
      alert("Error adding user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New User</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Full Name"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Age"
            type="number"
            required
            min={18}
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            required
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="">Select Country</option>
            <option>UK</option>
            <option>USA</option>
            <option>Canada</option>
          </select>

          <div>
            <label className="font-semibold">Interests:</label>
            {["Sports", "Music", "Coding"].map((interest) => (
              <label key={interest} className="block">
                <input
                  type="checkbox"
                  checked={form.interests.includes(interest)}
                  onChange={() => toggleInterest(interest)}
                />{" "}
                {interest}
              </label>
            ))}
          </div>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
