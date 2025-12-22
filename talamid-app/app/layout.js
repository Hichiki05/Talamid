
import './globals.css';
export const metadata = {
  title: 'Talamid App',
  description: 'Learning Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
        <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}