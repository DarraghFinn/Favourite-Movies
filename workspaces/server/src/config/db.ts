import { Pool, PoolClient, QueryResult } from "pg";

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

  async query<T>(queryText: string, values?: any[]): Promise<QueryResult<T>> {
    const client: PoolClient = await this.pool.connect();
    console.log({ client });

    try {
      return await client.query<T>(queryText, values);
    } finally {
      client.release();
    }
  }
}
