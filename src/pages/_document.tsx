import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Organizr</title>
                <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
                <meta
                    name="description"
                    content="Organizr allows you to organize your life and your work in a simple and practical way"
                    key="desc"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}