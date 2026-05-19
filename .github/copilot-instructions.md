# Copilot instructions — todo-app

## Quick start (build / test / lint)
- Build: none (static site). Open `index.html` in a browser or run a static server:
  - Python: `python3 -m http.server 8000`
  - Node: `npx http-server . -p 8000`
- Tests: no test framework present. (No single-test command to run.)
- Lint: no linter or formatter configured in this repo.

## High-level architecture
- Single-page static web app: `index.html`, `styles.css`, `script.js`.
- Behaviour is entirely client-side. Todos are DOM-only (no persistence); theme preference is stored in `localStorage` under the key `app-theme`.
- `script.js` is imperative DOM-manipulation code that:
  - wires event listeners on `#todo-form`, `#theme-toggle`, and dynamic todo controls
  - creates todo DOM nodes (structure below)
  - toggles completion by adding/removing the `completed` class
  - handles an "empty state" item when the list is empty
- Theming is implemented by setting `data-theme="dark"` on `document.documentElement`; CSS variables in `:root` and `[data-theme="dark"]` control color schemes.

## Key conventions and patterns
- Important IDs: `#todo-form`, `#todo-input`, `#todo-list`, `#theme-toggle`.
- Todo DOM shape (created by `createTodoItem`):
  - `li.todo-item`
    - `div.todo-control` containing
      - `input.todo-checkbox` (id pattern `todo-<timestamp>-<rand>`)
      - `label.todo-text` (htmlFor -> checkbox id)
    - `button.delete-button`
- Empty-state: class `empty-state` is used for the placeholder list item when no todos exist.
- ID generation: `todo-${Date.now()}-${Math.random().toString(36).slice(2)}` — keep this pattern if relying on stable id formatting.
- Theme key constant: `THEME_KEY = 'app-theme'` in `script.js` — update both JS and localStorage usage if changing the key.
- Accessibility: `#todo-list` uses `aria-live="polite"`; todo checkboxes and theme toggle have `aria-label`s. Preserve these when modifying markup.
- CSS variables: colors and theme tokens live in `:root` (light) and `[data-theme="dark"]` (dark). Prefer reusing variables rather than adding hard-coded colors.

## Files that must be edited together
- Changing the markup in `index.html` typically requires updates in `script.js` (DOM queries/event wiring) and `styles.css` (styling/layout).

## Notes for Copilot sessions
- Favor small, surgical edits: update markup, CSS variables, and JS together.
- Preserve ARIA attributes and the `aria-live` behavior for screen-reader friendliness.
- Do not introduce a build system or test harness without proposing it first — this repo is intentionally minimal.

## Existing docs checked
- README.md exists and is minimal.
- No other AI assistant config files detected in repo (CLAUDE.md, .cursorrules, .cursor/, AGENTS.md, .windsurfrules, CONVENTIONS.md, AIDER_CONVENTIONS.md, .clinerules, .cline_rules).

