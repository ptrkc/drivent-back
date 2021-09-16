import { getConnection } from "typeorm";

function getEntities() {
  const entities = [];

  const connection = getConnection();

  for (const entityInfo of connection.entityMetadatas) {
    entities.push({ name: entityInfo.name, tableName: entityInfo.tableName });
  }

  return entities;
}

export async function clearDatabase() {
  const entities = getEntities();
  const connection = getConnection();

  for (const entity of entities) {
    try {
      await connection.query(`DELETE FROM "${entity.tableName}"`);
    } catch {
      // se não deu pra rodar delete na tabela por chave estrangeira, jogo pro final do array pra tentar de novo no futuro
      entities.push(entity);
    }
  }
  await connection.query("TRUNCATE users RESTART IDENTITY CASCADE");
  await connection.query("TRUNCATE sessions RESTART IDENTITY CASCADE");
  await connection.query("TRUNCATE hotel RESTART IDENTITY CASCADE");
  await connection.query("TRUNCATE rooms RESTART IDENTITY CASCADE");
  await connection.query("TRUNCATE \"roomType\" RESTART IDENTITY CASCADE");
  await connection.query("TRUNCATE auditoriums RESTART IDENTITY CASCADE");
  await connection.query("TRUNCATE activities RESTART IDENTITY CASCADE");
}

export async function endConnection() {
  await getConnection().close();
}
