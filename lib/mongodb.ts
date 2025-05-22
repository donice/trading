import { MongoClient, ServerApiVersion } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};

const user = encodeURIComponent(process.env.DB_USER || "");
const pass = encodeURIComponent(process.env.DB_PASS || "");
const srv = process.env.MONGODB_SRV === "true";
const host = (() => {
  const rawHost = process.env.DB_HOST || "localhost:27017";
  return srv ? rawHost.replace(/:\d+$/, "") : rawHost;
})();

const uri = `${srv ? "mongodb+srv" : "mongodb"}://${user}:${pass}@${host}`;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  appName: "Alumni",
};

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

/**
 * Use this for one-off simple client creation (non-singleton).
 */
export function simpleMongoClient() {
  const user = encodeURIComponent(process.env.DB_USER || "");
  const pass = encodeURIComponent(process.env.DB_PASS || "");
  const srv = process.env.MONGODB_SRV === "true";
  const host = (() => {
    const rawHost = process.env.DB_HOST || "localhost:27017";
    return srv ? rawHost.replace(/:\d+$/, "") : rawHost;
  })();

  const uri = `${srv ? "mongodb+srv" : "mongodb"}://${user}:${pass}@${host}`;
  console.log("Connecting to MongoDB via simpleMongoClient...");
  return new MongoClient(uri, {
    serverApi: {
      strict: true,
      version: ServerApiVersion.v1,
      deprecationErrors: true,
    },
    appName: "Alumni",
  });
}
