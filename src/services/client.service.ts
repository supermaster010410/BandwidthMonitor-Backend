import { Client } from "@models/client";
import { AppDataSource } from "@utils/data-source";

const clientRepository = AppDataSource.getRepository(Client);

export const getAllClients = async () => {
  return await clientRepository.find({ order: { ip: "asc" } });
};

export const createNewClient = async (
  name: string,
  ip: string,
  limit: number,
  userId: string
) => {
  const newClient = clientRepository.create({
    name,
    ip,
    limit,
    createdBy: userId,
    updatedBy: userId,
  });
  const client = await clientRepository.save(newClient);
  return {
    id: client.id,
    name: client.name,
    ip: client.ip,
    limit: client.limit,
  };
};

export const updateClient = async (
  id: string,
  name: string,
  ip: string,
  limit: number,
  userId: string
) => {
  const client = await clientRepository.findOneBy({ id: id });
  if (!client) {
    return null;
  }
  client.name = name;
  client.ip = ip;
  client.limit = limit;
  client.updatedBy = userId;
  await clientRepository.save(client);
  return {
    id: client.id,
    name: client.name,
    ip: client.ip,
    limit: client.limit,
  };
};

export const deleteClient = async (id: string) => {
  const client = await clientRepository.findOneBy({ id: id });
  if (client) {
    return await clientRepository.remove(client);
  }
};
