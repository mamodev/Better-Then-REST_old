/*
Config sequence

// Get entities Defs from file
// Check releted tables and views
// Build Entity Type & Check compatibility
// Build dependency 
// Create dependency Triggers

*/

import { sleepSync, spawn } from "bun";
import { mkdirSync } from "fs";
import { dbConnection } from "./src/dbConnector.js";
import { PGRST_ENV } from "./src/env.js";

const startTime = new Date();

const logFolder = `./logs/${startTime.getDate()}-${startTime.getMonth()}-${startTime.getFullYear()}`;

const pgrstLogFile = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}_postgrest.log`;

try {
  mkdirSync(logFolder);
} catch (e) {}

async function startPostgrest() {
  console.log("Starting postgrest server!");

  const postgrest = spawn(["./postgrest"], {
    env: PGRST_ENV,
    stderr: Bun.file(`${logFolder}/${pgrstLogFile}`),
    onExit(exitCode) {
      console.error(`postgresest process stopped! Exit code: ${exitCode}`);
    },
  });

  console.log(`Started postgrest server with PID[${postgrest.pid}]`);

  for (let attempts = 1; attempts < 10; attempts++) {
    try {
      const response = await fetch(`http://localhost:5556/live`);
      if (response.status !== 200)
        throw new Error("Service sersponse is not 200");
      console.log("postGREST is ready!");
      break;
    } catch (err) {
      console.error("waiting for PostgREST server...");
      if (attempts === 9) {
        throw err;
      }
    }
    console.log(`Retrying in ${2}s`);
    sleepSync(2);
  }
}

// This function throws errors
export async function loadConfiguration() {
  const connection = await dbConnection();
  await startPostgrest();

  connection.release();
  // const domains = await db.query("select * from core.v_domini");
}
