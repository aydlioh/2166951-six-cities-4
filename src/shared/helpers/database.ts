type MongoURIConfig = {
  username: string;
  password: string;
  host: string;
  port: string;
  databaseName: string;
};

export const getMongoURI = ({
  username,
  password,
  host,
  port,
  databaseName,
}: MongoURIConfig) =>
  `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
