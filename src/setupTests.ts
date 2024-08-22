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

/**
Mocking the `getBoundingClientRect` method for the virtual tests otherwise
the `Virtualizer` from `@tanstack/react-virtual` will not work as expected
because it couldn't measure the elements correctly.
@see https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/components/combobox/combobox.test.tsx
*/
vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(() => ({
  width: 120,
  height: 40,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
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
