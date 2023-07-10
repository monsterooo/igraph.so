import '@/styles/globals.css'
import '@/styles/app.scss'
import 'rc-tooltip/assets/bootstrap.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
