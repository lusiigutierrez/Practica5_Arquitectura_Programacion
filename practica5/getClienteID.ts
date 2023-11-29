import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "./clienteReserva.ts";

// muestro por pantalla al cliente
const getCliente = async (req: Request, res: Response) => {
  try {
    
    const {id} = req.params;

    const clienteReserva = await ClienteModel.findById(id).exec();

    if (!clienteReserva) {
      res.status(400).send("No se encuentra al cliente.");
      return;
    }

    res.status(200).send(clienteReserva);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export default getCliente;



