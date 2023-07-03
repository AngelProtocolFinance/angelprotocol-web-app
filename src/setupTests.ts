// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// NOTE(davidlumley): Override default Crypto for terra.js
//                    see: https://github.com/terra-money/terra.js/issues/100
import { Crypto } from "@peculiar/webcrypto";
import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

jest.mock("@walletconnect/modal", () => ({
  __esModule: true,
  WalletConnectModal: jest.fn(),
}));
jest.mock("@walletconnect/sign-client", () => ({
  __esModule: true,
  SignClient: {
    init: jest.fn(async () => ({
      session: {
        getAll: jest.fn(),
      },
    })),
  },
}));

class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
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
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

// required after adding @cosmjs/cosmwasm-stargate
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder; // `global as any` cast required due to (expected) type incompatibility
global.crypto = new Crypto();
