import { Pool } from "pg";
import { DB_ENV } from "./env.js";

export async function dbConnection() {
  console.log("Connecting to Postgres DB");

  const pool = new Pool(DB_ENV);

  try {
    const db = await pool.connect();
    console.log("Connected successfully!");
    return db;
  } catch (err) {
    console.error("Error occurred connecting to DB");
    throw err;
  }
}
