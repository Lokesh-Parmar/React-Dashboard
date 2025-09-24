# React Dashboard (React 19 compatible)

This project is configured for **React 19** and uses **@dnd-kit** for drag-and-drop and **Tailwind CSS** with the new PostCSS setup.

## Steps to run

1. Extract the ZIP and open the folder in terminal / VS Code.
2. Run:
   npm install
3. Start the dev server:
   npm run dev
4. Open http://localhost:5173 (Vite default) in your browser.

Notes:
- I removed Redux and other packages that may not support React 19 to avoid npm conflicts.
- If `npm install` shows any peer-dep warnings, run `npm install --legacy-peer-deps` as a fallback.
