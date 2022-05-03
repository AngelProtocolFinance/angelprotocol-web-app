const OpenLogin = jest.createMockFromModule("@toruslabs/openlogin");

OpenLogin.prototype.constructor = (...args) => {};

export default OpenLogin;
