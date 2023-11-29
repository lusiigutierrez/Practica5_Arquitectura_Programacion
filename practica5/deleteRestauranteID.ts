import { Request, Response } from "npm:express@4.18.2";
import RestauranteModel from "./restaurante.ts";

//elimino el restaurante
const deleteRestauranteID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restauranteID = await RestauranteModel.findByIdAndDelete(id);

    if (!restauranteID) {
      res.status(400).send("No se encuentra el restaurante.");
      return;
    }

    res.status(200).send("Restaurante eliminado !!");
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export default deleteRestauranteID;



  