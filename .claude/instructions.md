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

## React Component Design

- **Props-based design**: Make components reusable by accepting configuration as props rather than deriving values internally. This improves SSR compatibility, testability, and flexibility
- **Define interfaces**: Always define proper TypeScript interfaces for component props
- **Use existing patterns**: Check the codebase for existing design system classes (e.g., `btn btn-blue`) and patterns before creating custom ones
- **Provide fallbacks**: Use sensible fallbacks for optional props (e.g., `logo || default_logo`)
- **Keep it concise**: Prefer compact, inline layouts over verbose sections with extra headings unless the UI demands it
- **Component naming**: Keep component names clear and concise

## UI Development

- **Always check existing styles**: When creating or modifying UIs, always look at `src/index.css` and `src/styles/*` to understand existing CSS patterns, variables, and utility classes before writing new styles

## Code Comments

- **Comments are for code readers only**: Don't add comments intended for the prompter (e.g., "Add your API key here", "TODO: implement this feature"). Only add comments that help someone reading and maintaining the code understand what it does and why
- **Lowercase start**: All comments should begin with a lowercase word (e.g., `// validate form input` not `// Validate form input`)

## Development Workflow

- **Always check package.json for scripts**: Before running any npm/pnpm commands (like `pnpm test:run`, `pnpm build`, etc.), always check `package.json` first to see what scripts are actually available. Use the exact script names defined there
