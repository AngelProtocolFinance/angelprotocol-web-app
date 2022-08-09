### admin & endowment admin

merge into just /Admin

### contract

- split Admin contract to --> CW3 & CW4

### services

- split Admin api to --> cw3Api & cw4Api & remove queriers (endpoints used as raw)
- add custom junoApi endpoints for multicontract queries ( different from multicall query)

### admin

- organized admin files, Proposals, Proposal, Templates, index.tsx
- expiration ui for both time and block types
- move `<Withdrawer>` from `components/transactors` to `page/admin/charity`
- remove `<AdminExecuter>` and place `execute` function inside `<PollAction/>`
- update cw3 config template to accept both `time` (charities) and `height`(ap-admin) voting duration values

### admin/proposal(s)

- remove vote details from proposal cards: not doing so causes each card on proposals page to fetch `{proposal:{proposal_id:x}}`
- move `<Voter/>` from `components/transactor` to `page/admin/proposal`

### profile

- rename files and folders according to folder namespace e.g if root if `Profile` then `ProfileHeader` can be just `Header`
- separate profile loading from admin check (put admin check on profile Nav)

### bug fixes

- image editor submits whole edit profile proposal when clicking image crop button
- rename duplicate services endpoint
- update fee balance check on admin voter: set still to `uusd`

### withdraw related refactors

- distinguish contract address from wallet address schema
