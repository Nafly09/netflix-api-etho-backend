import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"]
})

async function databaseInitialize() {
  try {
    await AppDataSource.initialize()

    console.log("Banco de dados conectado")
  } catch (e: unknown) {
    console.error(e)
  }
}

export default databaseInitialize
