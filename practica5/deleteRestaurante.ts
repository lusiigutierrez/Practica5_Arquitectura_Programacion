import { Request, Response } from "npm:express@4.18.2";
import RestauranteModel from "./restaurante.ts";

// elimino todos los restaurantes
const deleteRestaurantes = async (_req: Request, res: Response) => { // pongo _req para que no se ponga en amarillo
  try {

    await RestauranteModel.deleteMany({}); // con el deleMany se eliminan todos los restaurantes que hay

    res.status(200).send("Todos los restaurantes eliminados !!");
      
  } catch (error) {
    res.status(500).send(error);
    return;
  }

};
  
export default deleteRestaurantes;