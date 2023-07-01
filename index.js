const express = require("express");
const app = express();
const mongoose = require('mongoose');
const recipes = require('./data.json');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

mongoose.set('strictQuery', false);

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
})
.catch(err => console.log(err));

    // Before adding any recipes to the database, let's remove all existing ones
Recipe.deleteMany()
.then(deleteMany => console.log("Recetas borradas"))
.catch(err => console.log(err));

  
    // Run your code here, after you have insured that the connection was made
  
    let newRecipe = {
      title: "Pollo a la Rococo Lulu",
      level: "Amateur Chef",
      ingredients: ["2 pechugas de pollo", "200gr de Champiñones", "250gr de Crema de Leche", "1 Cebolla", "1 Pimiento Rojo", "Sal", "Pimienta", "1 Copa de Vino Blanco"],
      cuisine: "Internacional",
      dishType: "main_course",
      image: "https://cdn0.recetasgratis.net/es/posts/9/3/2/pechuga_de_pollo_a_la_crema_42239_600.webp",
      duration: 30,
      creator: "Alejandro van den Bussche",
    };
    
  Recipe.create(newRecipe)
  .then(result => console.log(`Receta Insertada - ${result.title}`))
  .catch(err => console.log(err));


  Recipe.insertMany(recipes)
  .then((insertedRecipes) => {
    console.log("Recetas insertadas con éxito");
    insertedRecipes.forEach((recipes) => {
      console.log(recipes.title);
    });
  })
  .catch((err) => {
    console.log("Error al insertar las recetas:", err);
  });
  
  Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 }
  )
    .then((updatedRecipe) => {
      if (updatedRecipe) {
        console.log("Receta actualizada con éxito");
      } else {
        console.log("No se encontró la receta");
      }
    })
    
    .catch((err) => {
      console.log("Error al actualizar la receta:", err);
    });

    Recipe.deleteOne({ title: "Carrot Cake" })
        .then((deleteOneRecipe) => {
          if (deleteOneRecipe) {
            console.log("Receta borrada con éxito");
          } else {
            console.log("No se encontró la receta");
          }
        })
        
        .catch((err) => {
          console.log("Error al borrar la receta:", err);
        });
  
  


  app.listen(3000, () => console.log("Escuchando en puerto 3000"));
