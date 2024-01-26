import { useEffect, useState } from "react"
import { getAllRecipes } from "../../managers/recipeManager"
import { Input, Label } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { RecipeListFormat } from "./RecipeListFormat"


export const RecipeList = () => 
{

    const navigate = useNavigate()
    const [recipes, setRecipes] = useState([])

    useEffect(()=>{
        getAllRecipes().then(setRecipes)
    },[])


    return (
        <main className="rl-main">
            <section className="rl-section-header">
                <div className="rl-header">Recipes</div>
                <div className="rl-selects">
                    <div className="rl-complexity-div">
                        <Label className="rl-complexity-label">Complexity:</Label>
                        <Input className="rl-complexity-input" type="select">
                            <option value={0}>All</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Input>
                    </div>
                    <div className="rl-cooktime-div">
                        <Label className="rl-cooktime-label">Cooktime:</Label>
                        <Input className="rl-cooktime-input" type="select">
                            <option value={0}>All</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5+</option>
                        </Input>
                    </div>
                </div>
            </section>
            <RecipeListFormat recipes={recipes}/>
            
        </main>
    )
}