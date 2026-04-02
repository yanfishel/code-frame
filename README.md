# Code Frame

Code Frame is a beautiful code-to-image generator built with Next.js, TypeScript and Mantine. It allows you to create high-quality screenshots of your code snippets with customizable themes, window frames, and backgrounds.

## 🚀 Features

- **Customizable Themes**: Multiple code highlighting themes supported by Prismjs.
- **Window Frames**: Options for macOS, Windows, Gnome, or no frame.
- **Backgrounds**: Support for solid colors, gradients, and transparency.
- **Dynamic Controls**: Adjust font family, font size, line height, padding, and box shadows.
- **Image Customization**: Add watermarks, adjust window opacity, and customize padding/shadows.
- **Real-time Preview**: See changes instantly as you adjust settings.
- **Export to Image**: Export your code snippets as high-quality images.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Pages Router)
- **UI Library**: [Mantine v8](https://mantine.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [PostCSS](https://postcss.org/) with Mantine-specific plugins
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Yarn 4](https://yarnpkg.com/)

## 📋 Requirements

- [Node.js](https://nodejs.org/) (v24.14.0+)
- [Yarn](https://yarnpkg.com/) (v4.13.0+)

## ⚙️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yanfishel/code-frame.git
   cd code-frame
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the development server:
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

The project currently uses the following environment variables:

- `ANALYZE`: Set to `true` to enable the bundle analyzer during build (e.g., `ANALYZE=true yarn build`).

## 📂 Project Structure

```text
├── .github/workflows   # GitHub Actions (Deployment to VPS)
├── public/             # Static assets
├── src/
│   ├── assets/         # UI icons and static resources
│   ├── components/     # React components (Layout, CodeArea, PreviewArea, Controls)
│   ├── constants/      # Configuration defaults, colors, and styles
│   ├── pages/          # Next.js pages (Pages Router)
│   ├── store/          # Zustand store for state management
│   ├── styles/         # Global styles and CSS modules
│   ├── types/          # TypeScript type definitions
│   └── util/           # Utility functions (Canvas, Image processing, Formatting)
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
