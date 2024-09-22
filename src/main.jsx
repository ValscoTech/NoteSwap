import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@/styles/index.css';
// import { ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react';

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

// const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API_URL;

// if (!clerkFrontendApi) {
//   throw new Error("Missing frontend api")
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider> */}
    <App />
  </StrictMode>,
);
