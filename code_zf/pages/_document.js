import Document, { Html, Head, Main, NextScript } from 'next/document';
class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx);
        return { ...props };
    }
    render() {
        return (
            <Html>
                <Head>
                    <style>
                        {
                            `
                            *{
                                padding:0;
                                margin:0;
                            }
                            `
                        }
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="http://abcdef.js"></script>
                </body>
            </Html>
        )
    }
}
export default CustomDocument;