import mongoose from "npm:mongoose@8.0.1"
import ClienteModel from "./clienteReserva.ts";
import RestauranteModel from "./restaurante.ts";


export type Booking  = {
    fecha?: string, // es opcional 
    cliente:string,
    restaurante:string
}


const Schema = mongoose.Schema; 

export const BookingSchema = new Schema ({
    fecha:{ type: String, required: true },
    cliente: { type: Schema.Types.ObjectId, ref: "cliente", required: true },
    restaurante: { type: Schema.Types.ObjectId, ref: "restaurante", required: true },
    
      },
      { timestamps: true }
);

// Asi añado la reserva creada en los arrays del cliente y en el restaurante. 
BookingSchema.post("save", async function (doc,next) {
  try {
    // busco al cliente y al restaurante por el id proporcionado en el doc. 
    const clienteReserva = await ClienteModel.findById(doc.cliente);
    const restauranteReserva = await RestauranteModel.findById(doc.restaurante); 
    
    if (!clienteReserva) {
      return (new Error("No se encuentra el cliente."));
    }

    if (!restauranteReserva) {
      return (new Error("No se encuentra el restaurante."));
    }

    // guardo el id de la reserva en el array 
    clienteReserva.bookings.push(doc.id);
    await clienteReserva.save();
    
    restauranteReserva.bookings.push(doc.id); 
    await restauranteReserva.save(); 

    next (); 
  } catch (error) {
    console.error(error);
    next();
  }
});
 

// Lo hago con post porque es necesario antes saber la reserva.
// Encontrar el nombre del cliente y el del restaurante y lo paso para que salga la informacion en JSON
BookingSchema.post("findOne", async function (doc, next) {
  try {
    const clienteReserva = await ClienteModel.findById(doc.get("cliente")).exec();
    const restauranteReserva = await RestauranteModel.findById(doc.get("restaurante")).exec();

    if (!clienteReserva) {
      return (new Error("No se encuentra el cliente."));
    }

    if (!restauranteReserva) {
      return (new Error("No se encuentra el restaurante."));
    }

    //mando la informacion para que la muestre en el JSON
    doc.clienteReserva = clienteReserva.firstName;
    doc.restauranteReserva = restauranteReserva.name;

    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

//Elimino la reserva de los arrays del cliente y del restaurante
BookingSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    const clienteReserva = await ClienteModel.findById(doc.get("cliente")).exec();
    const restauranteReserva = await RestauranteModel.findById(doc.get("restaurante")).exec();

    if (!clienteReserva) {
      return (new Error("No se encuentra el cliente."));
    }

    if (!restauranteReserva) {
      return (new Error("No se encuentra el restaurante."));
    }

    // elimino la reserva en el array del cliente y en el del restaurante. Uso el pull para editar los arrays
    await ClienteModel.findByIdAndUpdate(
      clienteReserva.id, 
      { $pull: { bookings: doc.id } }
      ).exec();
    await RestauranteModel.findByIdAndUpdate(
      restauranteReserva.id, 
      { $pull: { bookings: doc.id } }
      ).exec();

    next();
  } catch (error) {
    console.error(error);
    next();
  }
});


export type BookingModelType = mongoose.Document;  
export const BookingModel = mongoose.model<BookingModelType>("booking", BookingSchema); 
export default BookingModel; 


