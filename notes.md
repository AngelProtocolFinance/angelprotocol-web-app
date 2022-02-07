delete `useAppBackground` - since app, has unified background
delete `useRequest` - not used
delete `useUSTBalance` - not used since balance querying is moved to RTK
remove `formik` package
-migrated `components/Subscriber` to `react-hook-form`
-migrated `pages/Login` to `react-hook-form`

delete `TcaForm` - migrated to `Donater`

delete `components/Popup` - not used, used before by `<Announcer/>`

delete `helpers/displayTerraError`
-use `components/Popup` instead in `Auction`

transferred `<Website/>` related components to `src/Website`
