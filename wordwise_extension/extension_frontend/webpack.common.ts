import path from 'path'
import webpack, { DefinePlugin } from 'webpack' 
import CopyWebpackPlugin from 'copy-webpack-plugin'
import dotenv from "dotenv";

dotenv.config();


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
            "process.env.API_KEY" : JSON.stringify(process.env.API_KEY),
            "process.env.FIREBASE_API_KEY" : JSON.stringify(process.env.FIREBASE_API_KEY),
            "process.env.FIREBASE_AUTH_DOMAIN" : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            "process.env.FIREBASE_PROJECT_ID" : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            "process.env.FIREBASE_STORAGE_BUCKET" : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            "process.env.FIREBASE_SENDER_ID" : JSON.stringify(process.env.FIREBASE_SENDER_ID),
            "process.env.FIREBASE_APP_ID" : JSON.stringify(process.env.FIREBASE_APP_ID)
        })
    ]
}

export default config