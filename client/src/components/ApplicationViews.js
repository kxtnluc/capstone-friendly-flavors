import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { RecipeList } from "./recipes/RecipeList";
import { RecipePage } from "./recipes/RecipePage";
import { CreateRecipe } from "./recipes/CreateRecipe";
import { CookBookPage } from "./cookbook/CookBookPage";
import { CreateIngredient } from "./ingredients/CreateIngredient";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">

        <Route path="recipes">

          <Route
            index
            element={<RecipeList />}
          />

          <Route
            path=":recipeid"
            element={<RecipePage />}
          />

          <Route
            path="create"
            element={<CreateRecipe loggedInUser={loggedInUser}/>}
          />

        </Route>

        <Route path="cookbook">
          <Route
            path=":userid"
            element={<CookBookPage loggedInUser={loggedInUser}/>}
          />


        </Route>

        <Route path="ingredient">
          <Route
            path="create"
            element={<CreateIngredient/>}
          />

        </Route>



        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
