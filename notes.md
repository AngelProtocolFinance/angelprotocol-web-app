# ACCOUNTS UPDATE

### done

- update [contract addresses](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-ad347a63010488ecb7e42f17461bb113a3491dd784ec91d253f0040e631d0098)
- [reflect](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-d864f54f89ecf07eb507757abd61f5e46591f718fd3c65e33f72506be72b4b3eL16) moved registrar methods to accounts
- included [categories](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-d864f54f89ecf07eb507757abd61f5e46591f718fd3c65e33f72506be72b4b3eR65) field in create endowment payload
- create [Beneficiary](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-ce85087d6285d5a7b922331cb634797b711441dafa392aff3ff998071788a817) component to allow selecting between `wallet`, `endowment` and `index-fund` as beneficiary
- update [sdg selector](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-eb52585db1265f4891bf482782eb6c1a459d6bfa1aafe79edc958ea6d05b839cL13) to accept multiple sdg nums
- [reflect](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-df6c72367ae2ab30182afc4df1181a71ee9c1389be4691c7120f76e4397aa3b6R11) moved registrar queries to accounts
- [update](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-e3977ebc8089e1d4e27f2be36f9c08d669348afd103cc6d1a06c6b28fdb1dffaL11) balance query result

### bug fixes

- [add](https://github.com/AngelProtocolFinance/angelprotocol-web-app/pull/1202/files#diff-d6d0ca35fabb204fc52cc13ef9e78a8210f586dc46315735e5f7d8c0bc3157f1R49) check for AP team to not change status of `Inactive` endowments

### queries tested

- [x] endowlist & categorized
- [x] profile
- [x] balance queries

### tx tested

- [x] update profile
- [x] withdraw liquid `acc_type = "liquid"`, type `"locked"` can only be performed by `config.owner` atm
- [x] update endowment status(approval | rejection) in registration
- [x] update endowment status via ap admin, `msg` format okay and getting unauthorized

### todos

- [] registration

  - allow multiple sdgs to be selected and reflect on `msg.categories`
  - `categories.general` field ?

- [] marketplace

  - need to change layout of marketplace since categorized by single endowment, now each charity have multiple sdgs, they can appear on multiple rows

- [] proposal meta

  - diffs of nested objects

- [] queries with `[]` result shoudn't throw `404`

- [] `/widthdraw` endpoint: withdraw proposal `msg` format is changed

# STRATEGY UPDATE

- editing strategies for liquid and locked is separate

### Setting up1

- query existing `Y` strategies, pre acquired in guard
- query available `X` strategies in registrar
- set mapped `X`, `x` with `isAdded` flag if `x` is in `Y`
- seggragate `x` with `isAdded` flags from those without

- removing `x`, `isAdded` = false
- adding `x`, `isAdded` = true

### Setting up2

- `Y`strategies in guard query
-

### Picking Strategies

- box for strategies selection
- box for existing strategies
- click one strategy goes to selected
  - user can remove strategy from selected and goes back to selection
- selected strategy removed from selection

### Effect on percentage when adding/removing strategy (no predefined allocation)

- user has no selected strategy, when adding the first, set percent to `100%`
- user has `n` strategies, adding another one sets allocations to `100%/(n+1)`
- user has `n` strategies, removing one sets allocations to `100%/(n-1)`
  - or reflect on `unallocated` field

### Effect on percentage when updating strategies (with predefined allocation)

- user has `a,b,c` allocation where `a + b + c = 100%` (always the case since pre-existing allocations must have conformed to rules), when adding `d`, initially set percentage to `0`,
- user has `n` allocation where `sum n percentages = 100%`, when removing `x`, add `x/(n-1)` allocations to remaining strategies
  - or reflect on `unallocated` field

### Effect on changing allocations of each strategies

- sum of `n` allocations doesn't add to `100%`, with `x` to still to allocate

  - button shows to allocate evenly(`x/n`) among `n` strategies
  - button shows on each strategy to allocate full `x` to itself
    - or reflect on `unallocated` field

- sum of `n` allocations more than `100%`
  - error showing, no more allocations

### Restrictions

- 2 decimal places only

### Undoing changes

- user can always go back to original strategies and allocations

### Submitting

- when adding, submit the original strategy[] + new strategy
- when deleting, submit the original strategy[] - new strategy

### Future

- draggable pie

### schema

StrategyComponent
vault: meta, not changed
percent: number
balance: changed on every percent change

owned strategies is a subset of list of strategies

TODOS

[x] create useBalanceQuery, single token only
[x] tokenSelector, no need balances to show coins
[ ] test admin voter, handleSubmit reimplementation
[ ] why `widthdraw/cw3/id` shape is `{ Proposal:{}, Axelar_Transaction?:{} }` and `widthdraw/cw3` is `{...Proposal}[]`

## Disadvantages of current wallet structure

## (1) Provider(wallet Api, like window.ethereum), Chain, and balance treated as one

When connecting wallet, three things happen sequentially,

1. wallet access - gives (chainId, address)
2. fetch chain info - gives (lcds, blockExplorers, coins etc..)
3. balance fetching - gives balances of all coins

When all of these steps are complete, we show to user the wallet is connected.
But most consumers doesn't even need wallet to go to step `3` to be usable

- AdminLinks - only needs `step1` for `address` and `chainId`
- Gov transactors, only needs `halo` balance combined with other non-wallet queries, \*fee balance can be checked by `keplr`
- Admin, only need steps `1` and `2` to validate credential and run transactors: `proposal` \*fee balance can be checked by `keplr`
- Registration, only step `1` and assert `chainId` is that of juno

The only transactor so far that needs all three is `Donater`

## (2) Type narrowing/assertions duplicated

When consumers use `wallet` context value, there's a need for some assertions to guarantee that it is `defined`

```tsx
//Admin.tsx top level page
const { wallet, isLoading } = useWalletContext();

if (isLoading) alert("wallet is loading...");
if (!wallet) alert("wallet is not connected");

//use connected wallet as intended
return <div>{wallet.address} is your address and it is defined</div>

```

when components further down the tree needs to access the same value, it also needs to do some assertions

```tsx
//sendTx.ts
const { wallet } = useWalletContext();
if (isLoading) return
if (!wallet) return
await sendTransaction(wallet) //typescript won't complain now because this narrowed to be defined
```

since the top level component already asserted this, lower level components should know that it's already defined. Currently we add `!` on such values with some notes and do this to a lot of child components

```ts
const { wallet } = useWalletContext();
await sendTransaction(wallet!); // NOTE: wallet is defined here
```

## (3) Chain requirement not handled upfront

```rust
 if !(
  //reviewer condition
  (
   info.sender == registrar_config.applications_review
   && endowment.status == EndowmentStatus::Inactive
   && (msg.status == 1 || msg.status == 3)
  )
  ||
  //ap-team condition
  (
   info.sender == config.owner
   && endowment.status != EndowmentStatus::Inactive
  )
) {
  //throw Unauthorized
}
```
