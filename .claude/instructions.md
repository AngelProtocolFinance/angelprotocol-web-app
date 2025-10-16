# Coding Style Preferences

## Naming Conventions

- **Variables and functions**: Use `snake_case` as much as possible
- **React components**: Use `PascalCase` (e.g., `MyComponent`)
- **File names**: Use `kebab-case` (e.g., `my-component.tsx`)

## Examples

```typescript
// Variables and functions
const user_name = "John";
const fetch_user_data = async () => { ... };

// React components
function UserProfile() { ... }
export const DonationForm = () => { ... };

// File names
// ✓ user-profile.tsx
// ✓ donation-form.tsx
// ✗ UserProfile.tsx
// ✗ donation_form.tsx
```

## UI Development

- **Always check existing styles**: When creating or modifying UIs, always look at `src/index.css` and `src/styles/*` to understand existing CSS patterns, variables, and utility classes before writing new styles

## Code Comments

- **Comments are for code readers only**: Don't add comments intended for the prompter (e.g., "Add your API key here", "TODO: implement this feature"). Only add comments that help someone reading and maintaining the code understand what it does and why
