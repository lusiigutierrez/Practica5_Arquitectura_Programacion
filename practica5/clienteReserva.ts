import mongoose from "npm:mongoose@8.0.1"
import { Booking } from "./booking.ts";

export type Cliente = {
    firstName:string,
    lastName: string
    email: string,
    phoneNumber:number,
    DNI: string,
    bookings: Booking [],
    id: mongoose.Types.ObjectId; 
}


const Schema = mongoose.Schema; 

const ClienteSchema = new Schema ({
    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // para que sea obligatorio y unico
    phoneNumber: { type: Number, unique: true },
    DNI: { type: String, required: true, unique: true },
    bookings:[{ type: Schema.Types.ObjectId, ref: "booking" }],
      },
      { timestamps: true }
);


// validar el email
ClienteSchema.path("email").validate((email:string ) => {
    //estructura del email= texto - @ - texto -  . - texto 
    const estructuraemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    // ^ indica el inicio 
    // [^\s@] -> No espacios en blanco ( \s) ni el símbolo '@'. 
    // +@ -> simbolo @
    // +\. -> simbolo . 
    // $ indica el final 
    if (estructuraemail.test(email) ) return true;
    return false;   
})


// validar el numero de telefono
ClienteSchema.path("phoneNumber").validate((phoneNumber:number ) => {
    // estructura = que tenga 9 numeros 
    if (phoneNumber.toString().length === 9 ) return true; 
    return false;     
})

// validar el DNI
ClienteSchema.path("DNI").validate((DNI:string) => {
    // estructura = que tenga 8 numeros y una letra al final
    const estructuraDNI = /^\d{8}[a-zA-Z]$/;
    // ^ indica el inicio 
    // \d {8} tiene que haber 8 numero del (0-9)
    // Tiene que haber una letra al final que la puede poner con mayusculas o minusculas de la [a - z]
    // $ indica el final 
   return estructuraDNI.test(DNI); 
})


    
export type ClienteModelType = mongoose.Document;  
export const ClienteModel = mongoose.model<ClienteModelType>("Cliente", ClienteSchema); 
export default ClienteModel; 