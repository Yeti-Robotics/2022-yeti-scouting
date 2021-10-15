import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalContextProvider from '@/GlobalContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Yeti Scouting</title>
			</Head>
			<GlobalContextProvider>
				<Component {...pageProps} />
			</GlobalContextProvider>
		</>
	);
}
export default MyApp;
