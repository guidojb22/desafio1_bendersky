import dotenv from "dotenv"

dotenv.config(
    {
        path:"./src/.env",
        override: true
    }
)

export const config={
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET,
    CLIENT_ID_GITHUB: process.env.CLIENT_ID_GITHUB
}