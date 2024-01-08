import { UserProvider } from '@/context/UserContext';
import './globals.css'
import Navbar from './navbar';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <div>
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
