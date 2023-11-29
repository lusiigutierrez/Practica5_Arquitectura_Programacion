import { Request, Response } from "npm:express@4.18.2";
import RestauranteModel from "./restaurante.ts";

// muestra por pantalla el restaurante
const getRestaurante = async (req: Request, res: Response) => {
  try {
    
    const {id} = req.params;
    
    const restauranteReserva = await RestauranteModel.findById(id).exec();

    if (!restauranteReserva) {
      res.status(400).send("No se encuentra el restaurante.");
      return;
    }

    res.status(200).send(restauranteReserva);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export default getRestaurante;

