import "tw-elements-react/dist/css/tw-elements-react.min.css";
import './globals.css'
import StoreProvider from "./StoreProvider";
import {Roboto} from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });


export const metadata = {
  title: 'To Do',
  description: 'A simple to-do list',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <StoreProvider>
          
          <main className="{roboto.className}">{children}</main>
          
        </StoreProvider>
      </body>
    </html>
  )
}
