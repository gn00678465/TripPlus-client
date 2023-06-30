import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_TC, Ubuntu } from 'next/font/google';
import localFont from 'next/font/local';
import { Chakra } from '@/components';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import '@/styles/banner.scss';
import '@/styles/cases.scss';
import 'nprogress/nprogress.css';
import '@/styles/nprogress-custom.scss';

const noto_sans_tc = Noto_Sans_TC({
  weight: ['100', '300', '400', '500', '700', '900'],
  preload: false,
  variable: '--font-noto_sans_tc'
});

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  preload: false,
  variable: '--font-ubuntu'
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

type AppPropsWithLayout = AppProps & {
  Component: App.NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, []);

  return (
    <main
      className={`${ubuntu.variable} ${noto_sans_tc.variable} ${alkatra.variable} flex min-h-screen flex-col font-sans text-gray-900`}
    >
      <Chakra>{getLayout(<Component {...pageProps} />)}</Chakra>
    </main>
  );
}
