import { Request, Response} from "npm:express@4.18.2";
import BookingModel from "./booking.ts";

// creo la reserva 
export const postBooking = async (req: Request, res: Response) => {
  try {
    const { fecha, cliente, restaurante } = req.body;

    const newBooking = new BookingModel({ fecha, cliente, restaurante });
    await newBooking.save();
  
    res.status(200).send(newBooking);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export default postBooking;




