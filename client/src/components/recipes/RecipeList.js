import { useEffect, useState } from "react"
import { getAllRecipes } from "../../managers/recipeManager"
import { Input, Label, Spinner } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { RecipeListFormat } from "./RecipeListFormat"
import { Loading } from "../constants/Loading"


export const RecipeList = () => {

    const navigate = useNavigate()
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])

    const [complexityFilter, setComplexityFilter] = useState(0)
    const [cookTimeFilter, setCookTimeFilter] = useState(0)

    useEffect(() => {
        getAllRecipes().then((rArray) => {
            setRecipes(rArray)
            setFilteredRecipes(rArray)
        })
    }, [])

    const filterChange = () => {

        let filteredArray = []

        if(cookTimeFilter === 0 && complexityFilter === 0)
        {
            filteredArray = recipes;
        }
        else if (cookTimeFilter !== 0 && complexityFilter === 0)
        {
            filteredArray = recipes.filter((r) => r.cookTime === cookTimeFilter)
        }
        else if (cookTimeFilter === 0 && complexityFilter !== 0)
        {
            filteredArray = recipes.filter((r) => r.complexity === complexityFilter)
        }
        else if (cookTimeFilter !== 0 && complexityFilter !== 0)
        {
            filteredArray = recipes.filter((r) => r.complexity === complexityFilter && r.cookTime === cookTimeFilter)
        }
        console.log(filteredArray)
        setFilteredRecipes(filteredArray)
    }

    const handleComplexityChange = (e) => {
        setComplexityFilter(parseInt(e.target.value))
    }

    const handleCookTimeChange = (e) => {
        setCookTimeFilter(parseInt(e.target.value))
    }

        useEffect(() => {
    
    
            filterChange();
    
    
        }, [cookTimeFilter, complexityFilter]);

    return (
        <main className="rl-main">
            <section className="rl-section-header">
                <div className="rl-header">Recipes</div>
                <div className="rl-selects">
                    <div className="rl-complexity-div">
                        <Label className="rl-complexity-label">Complexity:</Label>
                        <Input value={complexityFilter} onChange={handleComplexityChange} className="rl-complexity-input" type="select">
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
                        <Input value={cookTimeFilter} onChange={handleCookTimeChange} className="rl-cooktime-input" type="select">
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
            {/* <Loading/> */}
            {filteredRecipes.length > 0 ? (<RecipeListFormat recipes={filteredRecipes} />):(<Loading/>)}
            

        </main>
    )
}