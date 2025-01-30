import { registerAs } from "@nestjs/config";
import { dbConfig } from "./db.interface";

// export default (): dbConfig => ({
//   db_type: process.env.DB_TYPE,
//   db_host: process.env.DB_HOST,
//   db_port: parseInt(process.env.DB_PORT, 10),
//   db_username: process.env.DB_USERNAME,
//   db_password: process.env.DB_PASSWORD,
//   db_database: process.env.DB_DATABASE,
// });

export default registerAs('database', (): dbConfig => ({
  db_type: process.env.DB_TYPE,
  db_host: process.env.DB_HOST,
  db_port: parseInt(process.env.DB_PORT, 10),
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_database: process.env.DB_DATABASE,
}));
