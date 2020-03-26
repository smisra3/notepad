import Document, { Html, Head, Main, NextScript } from 'next/document';

import { ThemeProvider } from 'styled-components';

const bodyStyle = {
  fontFamily: 'sans-serif',
  background: '#e9ecf0',
  fontSize: '15px',
  color: '#929ea4',
  visibility: 'visible',
  paddingBottom: '2px',
  height: '100vh',
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Libre+Baskerville|Mukta|Open+Sans|PT+Sans|Roboto|Roboto+Mono|Ubuntu&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={bodyStyle}>
          <ThemeProvider theme={{}}>
            <Main />
          </ThemeProvider>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument