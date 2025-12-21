// app/layout.js
import './globals.css'; // Path is simple because it's in the same folder

export const metadata = {
  title: 'Talamid App',
  description: 'Learning Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children} {/* This will render your Student or Teacher layouts */}
      </body>
    </html>
  );
}