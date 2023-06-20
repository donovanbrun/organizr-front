import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Organizr</title>
                <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}