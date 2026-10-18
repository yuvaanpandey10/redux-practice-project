# Redux Media Search App

A modern React + Redux media discovery app for searching and saving photos, videos, and GIFs. The app is built with Vite and uses Redux Toolkit for state management, React Router for navigation, and animated UI transitions for a polished browsing experience.

## Features

- Search media by keyword across multiple providers
- Browse results in tabs for photos, videos, and GIFs
- View recent searches stored locally in the browser
- Save favorites to a personal collection
- Responsive, animated interface for desktop and mobile
- Local storage persistence for collections and recent searches

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Motion (Framer Motion-style animation library)
- Axios

## Project Structure

```bash
src/
├── api/
│   └── mediaApi.js
├── components/
├── hooks/
├── pages/
├── redux/
│   ├── features/
│   └── store.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example` and add your API keys:

```bash
cp .env.example .env
```

Then fill in:

```env
VITE_UNSPLASH_KEY=your_unsplash_access_key
VITE_KLIPY_KEY=your_klipy_key
VITE_PIXABAY_KEY=your_pixabay_key
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks

## Notes

This app uses third-party media APIs, so valid API keys are required for live search results. Without keys, the app may not return results from those providers.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
