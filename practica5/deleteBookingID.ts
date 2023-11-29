import { Request, Response } from "npm:express@4.18.2";
import BookingModel from "./booking.ts";

// elimino la reserva 
const deleteBookingID = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const reservaEliminar = await BookingModel.findByIdAndDelete(id).exec();
  
    if (!reservaEliminar) {
      res.status(400).send("No se encuentra la reserva.");
      return;
    }
  
    res.status(200).send("Reserva eliminada !!");
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};
  
export default deleteBookingID;
  