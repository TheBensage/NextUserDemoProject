import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock <dialog> methods since jsdom doesn't implement them
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();
