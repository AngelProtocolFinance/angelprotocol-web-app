// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@walletconnect/modal", () => ({
  WalletConnectModal: vi.fn(),
}));
vi.mock("@walletconnect/sign-client", () => ({
  SignClient: {
    init: vi.fn(async () => ({
      session: {
        getAll: vi.fn(),
      },
    })),
  },
}));

class IntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
