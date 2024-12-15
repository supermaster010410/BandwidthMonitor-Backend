import { Request, Response, Router } from "express";

import {
  createNewClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "@services/client.service";

const router = Router();

router.get("", async (_: Request, res: Response) => {
  const clients = await getAllClients();
  res.json(clients);
});

router.post("", async (req: any, res: Response) => {
  3 / 0;
  const { name, ip, limit } = req.body;
  const newClient = await createNewClient(name, ip, limit, req.user.id);
  res.json(newClient);
});

router.put("/:id", async (req: any, res: Response) => {
  const { name, ip, limit } = req.body;
  const { id } = req.params;
  const client = await updateClient(id, name, ip, limit, req.user.id);
  if (!client) {
    res.status(400).send("Client Not Found.");
    return;
  }
  res.json(client);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteClient(id);
  res.send("Delete user successfuly.");
});

export { router };
