import AddUserModal from "@/components/AddUserModal";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest"; // ← use vi instead of jest

describe("AddUserModal", () => {
  const onCloseMock = vi.fn();
  const onUserAddedMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when open", () => {
    render(
      <AddUserModal
        isOpen={true}
        onClose={onCloseMock}
        onUserAdded={onUserAddedMock}
      />
    );

    expect(screen.getByText(/Add New User/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
  });

  it("closes the modal when ✕ button is clicked", () => {
    render(
      <AddUserModal
        isOpen={true}
        onClose={onCloseMock}
        onUserAdded={onUserAddedMock}
      />
    );

    fireEvent.click(screen.getByText("✕"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("submits the form successfully", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as unknown as typeof fetch;

    render(
      <AddUserModal
        isOpen={true}
        onClose={onCloseMock}
        onUserAdded={onUserAddedMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByDisplayValue("Select Country"), {
      target: { value: "UK" },
    });
    fireEvent.click(screen.getByLabelText("Sports"));

    fireEvent.click(screen.getByText("Add User"));

    await waitFor(() => {
      expect(onUserAddedMock).toHaveBeenCalledTimes(1);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    vi.restoreAllMocks();
  });

  it("shows validation errors when required fields are empty", async () => {
    render(
      <AddUserModal
        isOpen
        onClose={onCloseMock}
        onUserAdded={onUserAddedMock}
      />
    );
    fireEvent.click(screen.getByText("Add User"));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Select at least one interest/i)
      ).toBeInTheDocument();
    });
  });
});
