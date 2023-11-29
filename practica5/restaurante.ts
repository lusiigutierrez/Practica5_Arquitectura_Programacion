import mongoose from "npm:mongoose@8.0.1"
import { Booking } from "./booking.ts";
import ClienteModel from "./clienteReserva.ts";
import BookingModel from "./booking.ts";


export type Restaurante  = {
    name: string,
    CIF: string, // una letra al principio y 8 numeros siguientes
    address: string,
    bookings: Booking [];
}


const Schema = mongoose.Schema; 

const RestauranteSchema = new Schema ({
    name:{ type: String, required: true, unique: true },
    CIF: { type: String, required: true, unique: true }, 
    address: { type: String, required: true },
    bookings:[{ type: Schema.Types.ObjectId, ref: "booking" }],
      },
      { timestamps: true }
);

// valido el CIF 
RestauranteSchema.path("CIF").validate((CIF:string) => {
    // estructura = que tenga una letra al principio y 8 numeros siguientes
    const estructuraCIF = /^[a-zA-Z]\d{8}$/;
    // ^ indica el inicio 
    // Tiene que haber una letra al principio que la puede poner con mayusculas o minusculas de la [a - z]
   // \d {8} tiene que haber 8 numero del (0-9)
    //$ indica el final 
  return estructuraCIF.test(CIF); // aqui se hace la validacion 
})

//Al eliminar el restaurante, es necesario eliminar las reservas y tambien las reservas del array del cliente. 
RestauranteSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    const reservasEliminadas = await BookingModel.find({ restaurante: doc.id }).exec();
    await BookingModel.deleteMany({ restaurante: doc.id }).exec();
  
    await ClienteModel.updateMany(
      { bookings: { $in: reservasEliminadas.map(reserva => reserva._id) } },
      { $pull: { bookings: { $in: reservasEliminadas.map(reserva => reserva._id) } } }
    ).exec();
  
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

//Si elimino todos los restaurantes tambien tengo que eliminar las reservas. 
RestauranteSchema.post("deleteMany", async function (doc, next) {
  try {
    const reservasEliminadas = await BookingModel.find({ restaurante: doc.id }).exec();
    await BookingModel.deleteMany({ restaurante: doc.id }).exec();


    await ClienteModel.updateMany(
      { bookings: { $in: reservasEliminadas.map(reserva => reserva.id) } },
      { $pull: { bookings: { $in: reservasEliminadas.map(reserva => reserva.id) } } }
    ).exec();
  
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});



export type RestauranteModelType = mongoose.Document;  
export const RestauranteModel = mongoose.model<RestauranteModelType>("Restaurante", RestauranteSchema); 
export default RestauranteModel; 