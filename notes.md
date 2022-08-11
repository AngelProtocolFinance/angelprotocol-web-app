###refactored components

- WalletSuite
- MobileNav
- CountrySelector
- Selector used in `Registration`

### side refactors

- registration `<FormInput/>` to take advantage of `<FormProvider/>`
- rename DappHead to just Header
- rename DappFoot to just Footer
- moved `urls` not used widely back to where they are only used
- improve footer spacing, alignment, and hierarchy

### packages removed

- react-select
- react-select-country-list
