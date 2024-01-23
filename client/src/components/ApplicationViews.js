import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { RecipeList } from "./recipes/RecipeList";
import { RecipePage } from "./recipes/RecipePage";
import { CreateRecipe } from "./recipes/CreateRecipe";


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
            element={<CreateRecipe/>}
          />

        </Route>

        <Route path="cookbook">
          <Route
            path=":userid"
            element={<>Cookbook of user</>}
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
