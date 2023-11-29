import { Request, Response } from "npm:express@4.18.2";
import BookingModel from "./booking.ts";

// muestro por pantalla la reserva, usando el middleware para que busque el nombre del cliente y el nombre del restaurante
const getBooking = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
  
    const reserva = await BookingModel.findById(id).exec();
  
  
    if (!reserva) {
      res.status(400).send("No se encuentra la reserva.");
      return;
    }
 
    const nombreCliente = reserva.clienteReserva;
    const nombreRestaurante = reserva.restauranteReserva;
  
    res.status(200).json({
      reserva,
      clienteReserva: nombreCliente,
      restauranteReserva: nombreRestaurante
    });
      
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export default getBooking;

