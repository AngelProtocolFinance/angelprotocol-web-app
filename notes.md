###refactored components

- WalletSuite - with Menu
- MobileNav - with Menu
- CountrySelector - with ListBox
- Selector used in `Registration` - with ListBox
- ModalContext - with Dialog
  - wrapped modals with Dialog.Panel and tests
  - `<Popup/>` - ok
  - `<TransactionPrompt/>` - ok
  - donate `<SharePrompt/>` - ok
  - admin/applications `<Previewer/>` - ok
  - edit profile `<ImgCropper/>` - ok
  - leaderboard `<Summary/>`
  - registration `<ProofOfIdentityModal>`

### side refactors

- registration `<FormInput/>` to take advantage of `<FormProvider/>`
- rename DappHead to just Header
- rename DappFoot to just Footer
- moved `urls` not used widely back to where they are only used
- improve footer spacing, alignment, and hierarchy

### packages removed

- react-select
- react-select-country-list
