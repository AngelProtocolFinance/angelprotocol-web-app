import { setupServer } from "msw/node";
// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom";
import { handlers as programsHandlers } from "services/aws/programs";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { handlers as apesHandlers } from "./services/apes/mock";
import { handlers as awsHandlers } from "./services/aws/mock";
import { handlers as wordpressHandlers } from "./services/wordpress/mock";

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

/** used by @headlessui/react */
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

export const mswServer = setupServer(
  ...programsHandlers,
  ...apesHandlers,
  ...awsHandlers,
  ...wordpressHandlers
);

// Start server before all tests
beforeAll(() => mswServer.listen({ onUnhandledRequest: "bypass" }));

//  Close server after all tests
afterAll(() => mswServer.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => mswServer.resetHandlers());
