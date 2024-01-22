import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getRecipeById } from "../../managers/recipeManager";
import "./RecipePage.css"
import { Nav, NavItem } from "reactstrap";

export const RecipePage = () => {

    const { recipeid } = useParams()

    const [recipe, setRecipe] = useState();

    useEffect(() => {
        getRecipeById(recipeid).then((rObj) => {
            console.log(rObj);
            setRecipe(rObj);
        });
    }, [recipeid]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <main className="rp-main">
            <section className="rp-section-header">
                <h1 className="rp-title">{recipe.title}</h1>
                <div>
                    <span>Cook Time: {recipe.cookTime} </span>
                    <span>Complexity: {recipe.complexity}</span>
                </div>
            </section>

            <section className="rp-section-sidebar">
                <Nav vertical className="rp-sidebar" style={{ float: "right" }}>
                    {recipe.recipeIngredients.map((ri) => {
                        return (
                            <NavItem className="rp-sidebar-item">
                                • <strong>{ri.amount} {ri.measurement.type} {ri.ingredient.name}</strong>
                            </NavItem>
                        )
                    })}
                </Nav>
            </section>

            <section className="rp-section-body">
                <div className="rp-body">{recipe.body}</div>
            </section>
        </main>
    )
}
