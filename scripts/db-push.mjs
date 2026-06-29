/**
 * Minimal migration runner (no Supabase CLI required).
 *
 * Runs every supabase/migrations/*.sql in filename order, then supabase/seed.sql,
 * each inside its own transaction. Tracks applied migrations in a
 * `schema_migrations` table so it is safe to re-run.
 *
 * Usage:
 *   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.<ref>.supabase.co:5432/postgres" \
 *     node scripts/db-push.mjs
 *
 * Get the connection string from Supabase -> Project Settings -> Database ->
 * "Connection string" (URI). Use the direct/session connection (port 5432) for
 * DDL, not the transaction pooler (6543).
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const migrationsDir = join(root, "supabase", "migrations");
const seedFile = join(root, "supabase", "seed.sql");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("✗ DATABASE_URL is not set. See header of this file.");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();

  await client.query(`
    create table if not exists public.schema_migrations (
      version    text primary key,
      applied_at timestamptz not null default now()
    );
  `);

  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const { rowCount } = await client.query(
      "select 1 from public.schema_migrations where version = $1",
      [file],
    );
    if (rowCount > 0) {
      console.log(`• skip   ${file} (already applied)`);
      continue;
    }
    const sql = readFileSync(join(migrationsDir, file), "utf8");
    try {
      await client.query("begin");
      await client.query(sql);
      await client.query(
        "insert into public.schema_migrations (version) values ($1)",
        [file],
      );
      await client.query("commit");
      console.log(`✓ apply  ${file}`);
    } catch (err) {
      await client.query("rollback");
      console.error(`✗ failed ${file}: ${err.message}`);
      throw err;
    }
  }

  // Seed (idempotent — uses upserts / on conflict).
  const seed = readFileSync(seedFile, "utf8");
  await client.query(seed);
  console.log("✓ seed   supabase/seed.sql");
}

main()
  .then(() => client.end())
  .then(() => console.log("\nDone ✅"))
  .catch((err) => {
    console.error("\nMigration failed ❌");
    console.error(err.message);
    client.end();
    process.exit(1);
  });
