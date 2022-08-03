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

### admin/proposals

- remove vote details from proposal cards: not doing so causes each card on proposals page to fetch `{proposal:{proposal_id:x}}`

### profile

- rename files and folders according to folder namespace e.g if root if `Profile` then `ProfileHeader` can be just `Header`
- separate profile loading from admin check (put admin check on profile Nav)

### bug fixes

- image editor submits whole edit profile proposal when clicking image crop button
- rename duplicate services endpoint
