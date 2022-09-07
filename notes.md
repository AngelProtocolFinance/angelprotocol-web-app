# STRATEGY UPDATE

- editing strategies for liquid and locked is separate

### questions

- profile.strategies = should just be YieldVault & {percentage}
- where to query

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
