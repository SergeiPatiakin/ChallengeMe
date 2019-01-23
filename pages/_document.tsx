import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class AppDocument extends Document<{ styleTags: any }> {
  public static getInitialProps({ renderPage }: { renderPage: any }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App: any) => (props: any) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  public render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="https://somecdn.example.com/icon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="https://somecdn.example.com/icon-16x16.png" sizes="16x16" />
          <link href="https://fonts.googleapis.com/css?family=Sarabun" rel="stylesheet" />
          <style>{`
                html, body { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; }
                * { box-sizing: border-box; font-family: Sarabun, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
                #__next { height: 100%; }
              `}</style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
