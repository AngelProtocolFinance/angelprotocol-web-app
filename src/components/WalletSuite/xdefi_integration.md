XDEFI INTEGRATION NOTES

1. xdefi is not installed/disabled

- present in terra-wallet `availableInstallations`
- `window.xfi` is undefined

2. xdefi is installed but not yet setup (not recovered nor new wallet is created)

- present in terra-wallet `availableInstallions`
- `window.xfi` is present with only `window.xfi.info` prop

3. xdefi is installed, all chains enabled, but not prioritized

- [!!] still present in terra-wallet `availableInstallations`
- `window.xfi[litecoin | terra | others...]` is `undefined`

4. xdefi is installed, priotized, but chains are disabled

- present in terra-wallet `availableConnections`
- not present in terra-wallet `availableInstallations`
- [!!] `window.xfi[litecoin | terra | others...]` is defined
  (should be undefined since in wallet management they're disabled?)
- only enabled chains will be shown in xdefi display

5. when posting tx using `wallet.post(tx)` with xdefi wallet connected, terra station extension doesn't popup together with xdefi when signing

6. [!!] when posting tx using `wallet.post(x)` with terra station extension connected, xdefi popup together with terra extension when signing

7. [!!] when posting tx with `wallet.post(tx)` for signing, and user cancels it, it doens't throw error similar to what `wallet.post(tx)` could've thrown e.g `UserDenied` and would have been catched by existing error handler for terra transactions.

INTEGRATION DECISIONS

1. don't integrate xdefi using `@terra-money/wallet-provider`. Instead, use its own `window.xfi.terra` api as it is together with its limitations. In addition, the same effort of intergrating with `window` api is needed for `ethereum`
2. add checks to terra station `CONNECT` - don't allow if xdefi wallet priority is set for it will only pop-up also for terra station initiated transactions
3. add checks to xdefi `CONNECT` - don't allow if xdefi wallet priority is not set for it will do nothing
4.
