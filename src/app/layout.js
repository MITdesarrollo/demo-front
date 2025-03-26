import { Providers } from '@/redux/provider';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Poppins, Raleway, Playfair } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import '../styles/_global.scss';
import Head from "next/head";

config.autoAddCss = false;

const poppins = Poppins({ subsets: ['latin'], variable:'--font-poppins' , weight: ["100" , "500", "400", "600", "800"]});
const raleway = Raleway({ subsets: ['latin'], variable:'--font-raleway' , weight: ["100" , "500", "400", "600", "800"]});
const playfair = Playfair({ subsets: ['latin'], variable:'--font-playfair', weight: ["500" , "400", "800"] });

export const metadata = {
  title: 'Dreamon',
  description: 'Insert description first',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      {/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" /> */}
    </Head>
      <body className={`${poppins.variable} ${raleway.variable} ${playfair.variable}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
