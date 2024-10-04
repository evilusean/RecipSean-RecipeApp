# RecipSean-RecipeApp
Start: 27September2024</br>
End: 01October2024</br>

https://recip-sean-recipe-app.vercel.app/   

A repo for building a recipe app that takes the food you have and tells you what you can cook - can search by recipe, name, type, or ingredients</br>
Uses React, TS, TailwindCSS, ShadCN, NextJS, Store recipes as JSON objects in this repo, create an ingredients list, is responsive and uses ShadCN components - hosted on Vercel</br>
Have triple language support, so I can learn languages as I cook - Japanese recipes in Japanese and English, Czech/Slovak recipes in Slovak and English, flip the card if I need to review. </br>
Recipe Search feature</br>
Favorites feature, notes, utensils, ingredients, and cooking information</br>
Had a random feature since there is no such thing a true random 
I created a way that uses a unique entropy file, time. 
Time 4 entropy - takes datetime and uses that to generate a random recipe, if I want to change it up, or don't know what to cook, I can always just refresh the page.-I Had to remove this feature as it worked locally, and wasnt working on the Vercel VPS I had set up - went with a simpler random function that didn't check date/time and was loaded statically. - Also had problems with the 'randomRecipSean' button -it worked locally but kept failing on vercel VPS deployments - fixed by loading the recipes when app starts getting .length of all apps and then doing Math.random on those recipes - everything works now, and futureSean will actually be using this after escaping canada, when I get to a sane country where food and rent isn't considered a luxury good and are prohibitively expensive</br>
