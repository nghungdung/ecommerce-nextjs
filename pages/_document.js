import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document{
  render(){
    return(
      <Html lang='en'>
        <Head>
          <meta name="description" content="e-commerce website with Next.js"/>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"></link>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
          <link src="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
          <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
    
  }
}

export default MyDocument