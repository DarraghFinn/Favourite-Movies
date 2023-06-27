import { Pool, PoolClient, QueryResult } from "pg";
import { queries } from "../repository/movieQueries";

export default class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB_NAME,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    });
  }

  async createTable() {
    try {
      const client: PoolClient = await this.pool.connect();
      await client.query(queries.createMovieTable);
      client.release();
    } catch (error) {
      throw error;
    }
  }

  async query<T>(queryText: string, values?: any[]): Promise<QueryResult<T>> {
    let client: PoolClient;
    try {
      client = await this.pool.connect();
      return await client.query<T>(queryText, values);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      client.release();
    }
  }
}
