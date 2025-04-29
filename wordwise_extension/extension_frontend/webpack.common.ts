import path from 'path'
import webpack, { DefinePlugin } from 'webpack' 
import CopyWebpackPlugin from 'copy-webpack-plugin'


const config: webpack.Configuration = {
    entry : {
        popup: './src/popup.ts',
        content: './src/content.ts',
        background: './src/background.ts'
    },

    resolve : {
        extensions: [".ts"],
    },

    module : {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader : "postcss-loader", 
                        options : {
                            postcssOptions : {
                                plugins: ["postcss-import" , "tailwindcss"],
                            },
                        },
                    },
                ],
            },
        ],
    },
    
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [{from : 'static'}],
        }),
        new DefinePlugin({
            "process.env.API_KEY" : JSON.stringify('AIzaSyBU1pOlg1RXIGqYbE1_uMWwAa_9WB3Gcpw'),
            "process.env.FIREBASE_API_KEY" : JSON.stringify("AIzaSyDD_n0qhvKuorl6YwJyIy9ObgfcUX3x6bE"),
            "process.env.FIREBASE_AUTH_DOMAIN" : JSON.stringify("fluentify-7a78a.firebaseapp.com"),
            "process.env.FIREBASE_PROJECT_ID" : JSON.stringify("fluentify-7a78a"),
            "process.env.FIREBASE_STORAGE_BUCKET" : JSON.stringify("fluentify-7a78a.firebasestorage.app"),
            "process.env.FIREBASE_SENDER_ID" : JSON.stringify("1096214608573"),
            "process.env.FIREBASE_APP_ID" : JSON.stringify("1:1096214608573:web:e947b22b3542da8ba695d4")
        })
    ]
}

export default config