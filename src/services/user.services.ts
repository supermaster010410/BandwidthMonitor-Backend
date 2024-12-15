import { User } from "@models/user";
import { AppDataSource } from "@utils/data-source";

const userRepository = AppDataSource.getRepository(User);

export const getUserByUsername = async (username: string) => {
  return await userRepository.findOne({ where: { username } });
};

export const createNewUser = async (username: string, password: string) => {
  const newUser = userRepository.create({ username, password });
  await userRepository.save(newUser);
};
