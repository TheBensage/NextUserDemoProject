"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserInput } from "@/lib/validation/user";
import { useEffect, useRef } from "react";

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
};

export default function AddUserModal({
  isOpen,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const COUNTRIES = ["UK", "USA", "Canada"];
  const INTERESTS = ["Sports", "Music", "Coding"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: { fullName: "", age: 18, country: "", interests: [] },
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      onUserAdded();
      onClose();
    }
  };

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }
    if (isOpen && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    if (!isOpen && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="
        fixed inset-0 m-auto
        max-w-md w-full
        rounded-xl p-8
        shadow-xl border border-gray-200
        bg-white
      "
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6 text-purple-800">Add New User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}

        <input
          type="number"
          placeholder="Age"
          {...register("age", {
            setValueAs: (v) => {
              if (v === "" || v == null) return 0;
              return Number(v);
            },
          })}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}

        <select
          {...register("country")}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Country</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}

        <fieldset className="flex flex-col gap-2 border-t pt-3">
          <legend className="font-semibold text-gray-700">Interests</legend>
          {INTERESTS.map((interest) => (
            <label key={interest} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={interest}
                {...register("interests")}
              />
              {interest}
            </label>
          ))}
          {errors.interests && (
            <p className="text-red-500 text-sm">{errors.interests.message}</p>
          )}
        </fieldset>

        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Add User
        </button>
      </form>
    </dialog>
  );
}
