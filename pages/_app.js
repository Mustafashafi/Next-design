import '../styles/globals.css'
import '../styles/footer.css'

import Chat from '../components/Chat'; // <-- ADD THIS

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <Chat />   {/* <-- Chat stays open across all pages */}
    </>
  );
}
