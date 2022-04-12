// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// NOTE(davidlumley): Override default Crypto for terra.js
//                    see: https://github.com/terra-money/terra.js/issues/100
import { Crypto } from "@peculiar/webcrypto";
import "@testing-library/jest-dom";

global.crypto = new Crypto();
