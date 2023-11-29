import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "./clienteReserva.ts";

// creo el cliente
const postCliente = async (req: Request, res: Response) => {
  try {
    const {firstName, lastName, email, phoneNumber, DNI} = req.body;

    const newCliente = new ClienteModel({firstName, lastName, email, phoneNumber, DNI}); // se crea un nuevo cliente

    await newCliente.save(); // se guarda el cliente

    res.status(200).send(newCliente);
  } catch (error) {
    res.status(500).send(error);
    return;
  }      

};
    
export default postCliente;



