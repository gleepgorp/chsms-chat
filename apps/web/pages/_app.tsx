import './global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import AuthProvider from '../context/AuthContext';
import Authenticated from '../components/atoms/Authenticated';

export default function App({ Component, pageProps }: AppProps) {
  const defaultTitle = 'Chsms';

  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <link rel="icon" href="/favicon.png"/>
      </Head>
      <AuthProvider>
        <Authenticated>
          <main>
            <Component {...pageProps} />
          </main>
        </Authenticated>
      </AuthProvider>
    </>
  );
}