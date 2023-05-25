import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Organizr</title>
                <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}