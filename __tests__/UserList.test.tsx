// __tests__/UserList.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserList from "@/components/UserList";
import { User } from "@/types";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("UserList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading text when loading is true", () => {
    render(<UserList users={[]} loading={true} />);
    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();
  });

  it("shows empty message when users array is empty", () => {
    render(<UserList users={[]} loading={false} />);
    expect(
      screen.getByText(/No users yet. Add one above!/i)
    ).toBeInTheDocument();
  });

  it("renders a list of users", () => {
    const users: User[] = [
      {
        id: 1,
        fullName: "Alice Smith",
        age: 28,
        country: "UK",
        interests: ["Sports", "Music"],
      },
      {
        id: 2,
        fullName: "Bob Johnson",
        age: 35,
        country: "USA",
        interests: ["Reading"],
      },
    ];

    render(<UserList users={users} loading={false} />);

    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("28 years old – UK")).toBeInTheDocument();
    expect(
      screen.getByText(/Interests:\s*Sports\s*Music/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    expect(screen.getByText("35 years old – USA")).toBeInTheDocument();
    expect(screen.getByText("Interests: Reading")).toBeInTheDocument();
  });

  it("calls router.push when View button is clicked", async () => {
    const users: User[] = [
      {
        id: 1,
        fullName: "Alice Smith",
        age: 28,
        country: "UK",
        interests: ["Sports", "Music"],
      },
    ];

    render(<UserList users={users} loading={false} />);

    const viewButton = screen.getByText("View");
    await userEvent.click(viewButton);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/users/1");
  });
});
