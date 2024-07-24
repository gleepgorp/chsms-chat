import './global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import AuthProvider from '../context/AuthContext';
import Authenticated from '../components/atoms/Authenticated';
import ChatProvider from '../context/ChatContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const defaultTitle = 'Chsms';
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <link rel="icon" href="/favicon.png"/>
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Authenticated>
            <ChatProvider>
              <main>
                <Component {...pageProps} />
              </main>
            </ChatProvider>
          </Authenticated>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}