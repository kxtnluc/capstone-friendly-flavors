import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { RecipeList } from "./recipes/RecipeList";
import { RecipePage } from "./recipes/RecipePage";
import { CreateRecipe } from "./recipes/CreateRecipe";
import { CookBookPage } from "./cookbook/CookBookPage";
import { CreateIngredient } from "./ingredients/CreateIngredient";
import { EditRecipe } from "./recipes/EditRecipe";
import { MyCookBook } from "./cookbook/MyCookBook";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import { CookBookList } from "./cookbook/CookBookList";
import { AdminPortal } from "./admin/AdminPortal";
import { AdminPromote } from "./admin/AdminPromote";
import { Home } from "./home/Home";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">

        <Route
          index
          element={<Home/>}
        />

        <Route path="recipes">

          <Route
            index
            element={<RecipeList />}
          />

          <Route
            path=":recipeid"
            element={<RecipePage loggedInUser={loggedInUser} />}
          />

          <Route
            path=":recipeid/edit"
            element={<EditRecipe loggedInUser={loggedInUser} />}
          />

          <Route
            path="create"
            element={<CreateRecipe loggedInUser={loggedInUser} />}
          />

        </Route>

        <Route path="cookbook">
          <Route
            index
            element={
              <MyCookBook loggedInUser={loggedInUser} />
            }
          />
          <Route
            path=":userid"
            element={<CookBookPage loggedInUser={loggedInUser} />}
          />
          <Route
            path="list"
            element={<CookBookList loggedInUser={loggedInUser} />}
          />


        </Route>

        <Route path="ingredients">

          <Route
            path="create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={['Admin']}>
                <CreateIngredient />
              </AuthorizedRoute>
            }
          />

        </Route>

        <Route path="admin">
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                  <AdminPortal loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />

            <Route
              path="promote"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                  <AdminPromote loggedInUser={loggedInUser}/>
                </AuthorizedRoute>
              }
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
