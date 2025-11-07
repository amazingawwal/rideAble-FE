# RideAble FE

RideAble FE is the **frontend application** for the RideAble fullstack platform — an accessibility-focused web app that helps users manage mobility and accessibility-related services.  
Built with **React + TypeScript + TailwindCSS**, it’s designed to be **fast, responsive, and accessible** for everyone.

---

## Tech Stack

| Technology                                    | Purpose                     |
| --------------------------------------------- | --------------------------- |
| [React](https://react.dev/)                   | UI framework                |
| [TypeScript](https://www.typescriptlang.org/) | Static typing               |
| [Vite](https://vitejs.dev/)                   | Build tool and dev server   |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first styling       |
| [React Router](https://reactrouter.com/)      | Client-side routing         |
| [Axios](https://axios-http.com/)              | API communication           |
| [ESLint + Prettier](https://eslint.org/)      | Code linting and formatting |
| [Husky](https://typicode.github.io/husky)     | Git hooks for code quality  |

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/amazingawwal/rideAble-FE.git
cd rideAble-FE
```

# Install Dependencies

`npm install`
or
`npm ci`

# Set Up Environment Variables

Create a .env file in the root directory:

```
VITE_API_URL=https://api.rideable-be.render.com
VITE_APP_ENV=production
```

# Run the App

```bash
npm run dev
```

App runs locally on http://localhost:5173

# Build for Production

```bash
npm run build
```

This will generate an optimized production build in the /dist folder.

# To preview:

```bash
npm run preview
```

# Code Quality

Before every commit, Husky runs automated checks to ensure:

- Code follows ESLint + Prettier standards
- All TypeScript files compile cleanly
- Commit messages follow the configured linting style

## You can also run manually:

```bash
npm run lint
npm run format
```

# Deployment

Build the project:

```bash
npm run build
```

# Contributing

Contributions are welcome!
Please read CONTRIBUTING.md before submitting pull requests.

# Contact

For inquiries or support:

- Email: sakeebmawwal01@gmail.com
- GitHub: @amazingawwal
