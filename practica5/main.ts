import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@8.0.1";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import postCliente from "./postCliente.ts";
import postRestaurante from "./postRestaurante.ts";
import getCliente from "./getClienteID.ts";
import getBooking from "./getBookingID.ts";
import getRestaurante from "./getRestauranteID.ts";
import deleteBookingID from "./deleteBookingID.ts";
import postBooking from "./postBooking.ts";
import deleteRestauranteID from "./deleteRestauranteID.ts";
import deleteRestaurantes from "./deleteRestaurante.ts";

const env = await load();

const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!URL_MONGO) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
    await mongoose.connect(URL_MONGO); 
    console.log ("Te has conectado correctamente")
    const app = express();
    app.use(express.json());

    app
    .post("/booking",postBooking)
    .post("/cliente", postCliente)
    .post("/restaurante", postRestaurante)
    .get("/client/:id", getCliente)
    .get("/restaurant/:id", getRestaurante)
    .get("/booking/:id", getBooking)
    .delete("/restauranteEliminar/:id",deleteRestauranteID)
    .delete("/booking/:id",deleteBookingID)
    .delete("/restauranteEliminarTodos", deleteRestaurantes)
    

  app.listen(3000, () => console.info("Server listening on port 3000"));


}catch (e){
    console.log(e)
}


