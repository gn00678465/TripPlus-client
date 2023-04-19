import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_TC } from 'next/font/google';
import localFont from 'next/font/local';

const noto_sans_tc = Noto_Sans_TC({
  weight: ['100', '300', '400', '500', '700', '900'],
  preload: false,
  variable: '--font-noto_sans_tc'
});

const alkatra = localFont({
  src: [
    {
      path: '../../public/fonts/Alkatra-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/Alkatra-Medium.ttf',
      weight: '500'
    },
    {
      path: '../../public/fonts/Alkatra-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../../public/fonts/Alkatra-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-alkatra'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${noto_sans_tc.variable} ${alkatra.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
