import { createRoot } from 'react-dom/client'; // Import necessary modules
import './index.css';
import App from './App.jsx';

// Render the App component
createRoot(document.getElementById('root')).render(
  // Uncomment StrictMode if needed for debugging or production readiness
  // <StrictMode>
  <App />
  // </StrictMode>
);
