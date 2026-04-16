# Code Frame

[![License](https://img.shields.io/github/license/yanfishel/code-frame)](/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v24.14-6)](https://nodejs.org/)
[![Typescript](https://img.shields.io/badge/Typescript-v6.0.2-blue)](https://www.typescriptlang.org/)
[![Next](https://img.shields.io/badge/Next.js-v16.2.3-f39f37)](https://nextjs.org/)
[![Yarn](https://img.shields.io/badge/Yarn-v4.13.0-red)](https://yarnpkg.com/)
[![Zustand](https://img.shields.io/badge/Zustand-v5.0.12-green)](https://github.com/pmndrs/zustand)

Code Frame is a beautiful code-to-image generator built with Next.js, TypeScript, and Mantine. It allows you to create high-quality screenshots of your code snippets with customizable themes, window frames, and backgrounds.

<img src="/public/screenshots/app_001.jpg" alt="Code Frame" width="100%"/>
<img src="/public/screenshots/app_002.jpg" alt="Code Frame" width="100%"/>

### Website: **[codeframe.pro](https://codeframe.pro)**

## 🚀 Features

- **Customizable Themes**: Multiple code highlighting themes supported by Prismjs.
- **Window Frames**: Options for macOS, Windows, Gnome, or no frame.
- **Backgrounds**: Support for solid colors, gradients, and transparency.
- **Dynamic Controls**: Adjust font family, font size, line height, padding, and box shadows.
- **Image Customization**: Add watermarks, adjust window opacity, and customize padding/shadows.
- **Real-time Preview**: See changes instantly as you adjust settings.
- **Export to Image**: Export your code snippets as high-quality images.
- **Authentication**: Secure user accounts and snippet saving powered by Clerk.
- **Snippet Management**: Save and manage your code frames in a personal library.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Pages & App Router)
- **UI Library**: [Mantine v8](https://mantine.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Prisma](https://www.prisma.io/) with MariaDB/MySQL
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [PostCSS](https://postcss.org/) with Mantine-specific plugins
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Yarn 4](https://yarnpkg.com/)

## 📋 Requirements

- [Node.js](https://nodejs.org/) (v24.14.0+)
- [Yarn](https://yarnpkg.com/) (v4.13.0+)
- A MariaDB or MySQL database instance

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yanfishel/code-frame.git
   cd code-frame
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the required variables (see [Environment Variables](#-environment-variables) section).

4. **Database Migration:**
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server:**
   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn start`: Starts the production server.
- `yarn analyze`: Builds the application and runs the bundle analyzer.
- `yarn lint`: Runs ESLint and Stylelint.
- `yarn typecheck`: Runs TypeScript compiler to check types.
- `yarn prettier:check`: Checks files for formatting.
- `yarn prettier:write`: Fixes formatting issues.
- `yarn export`: Builds and exports the app (Static Site Generation).

## 🌍 Environment Variables

The project requires the following environment variables:

### Clerk Authentication
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key.
- `CLERK_SECRET_KEY`: Clerk secret key.
- `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL`: Redirect after sign-in.
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL`: Redirect after sign-up.

### Database
- `DATABASE_URL`: Connection string for MariaDB/MySQL.
- `SHADOW_DATABASE_URL`: Shadow database URL for Prisma migrations.

### Build Tools
- `ANALYZE`: Set to `true` to enable the bundle analyzer during build (e.g., `ANALYZE=true yarn build`).

## 📂 Project Structure

```text
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets (images, fonts)
├── src/
│   ├── animations/     # Lottie animations and transitions
│   ├── app/            # Next.js App Router components and API routes
│   ├── assets/         # UI icons and static resources
│   ├── components/     # Reusable React components
│   ├── constants/      # Configuration defaults, colors, and styles
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Library initializations (e.g., Prisma client)
│   ├── pages/          # Next.js Pages Router (Main application entry points)
│   ├── services/       # Data fetching and API logic
│   ├── store/          # Zustand store for state management
│   ├── styles/         # Global styles and CSS modules
│   ├── types/          # TypeScript type definitions
│   └── util/           # Utility functions (Canvas, Image processing)
├── next.config.mjs     # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and dependencies
```

## 🧪 Tests

- TODO: Add automated tests (Unit/Integration).
- Currently, use `yarn typecheck` and `yarn lint` for code quality checks.

## 📄 License

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.

---
Built with ❤️ by [Yan Fishel](https://github.com/yanfishel)
