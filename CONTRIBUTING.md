
---
# Contributing to RideAble FE

Thank you for your interest in contributing to **RideAble FE**!  
We love contributions from the community — whether it's fixing bugs, improving docs, or building new features.

##  Getting Started

1. **Fork** the repository  
2. **Clone** your fork:

   ```bash
   git clone https://github.com/<your-username>/rideAble-FE.git
   cd rideAble-FE


3. **Install** dependencies:

   ```bash 
   npm install
 

4. Create a new branch:
   ```bash 
   git checkout -b feat/free-ride-service


5. Run the app:
   ```bash 
   npm run dev

# Coding Guidelines

## Code Style

1. Use TypeScript for all new files.

2. Follow existing component structure and naming conventions.

3. Use Tailwind CSS utilities for styling — avoid inline styles.

4. Ensure accessibility (ARIA attributes, keyboard navigation, etc.)

## Lint & Format

Run linters before pushing:
   ```bash 
   npm run lint
   npm run format
   ```

## Commit Guidelines

Follow Conventional Commit Messages for clarity:

<type>(scope): description


Examples:

- feat(auth): add login with email

- fix(ui): correct button hover color

- docs(readme): update setup instructions

## Pull Request Process

1. Update documentation where applicable(when its available).

2. Ensure all checks pass (npm run lint, build, etc.)

3. Push your branch and open a PR to dev.

4. Add a clear PR description:

5. What does it fix/add?

6. Screenshots if UI-related

7. Any breaking changes? Give detailed description

**Your PR will be reviewed — feedback is friendly and constructive**


# Deployment Notes

- Builds are handled by Vite.

- CI/CD uses GitHub Actions to ensure clean installs (npm ci).

**NB: Husky hooks are disabled in CI automatically via HUSKY=0.**

# Code of Conduct

Please treat everyone with respect and kindness.
We follow the Contributor Covenant in all community interactions.


# Thanks
Every contribution makes RideAble better.
Thank you for your time, effort, and ideas!

“The best software is built together.” — The RideAble Team