import { Request, Response } from "npm:express@4.18.2";
import RestauranteModel from "./restaurante.ts";

// creo el restaurante
const postRestaurante = async (req: Request, res: Response) => {
  try {
        
    const {name, CIF, address} = req.body;

    const newRestaurante = new RestauranteModel({name, CIF, address}); // se crea un nuevo restaurante
    await newRestaurante.save(); // se guarda el restaurante
    
    res.status(200).send(newRestaurante);

  } catch (error) {
    res.status(500).send(error);
    return;
  }
    
};
    
export default postRestaurante;

