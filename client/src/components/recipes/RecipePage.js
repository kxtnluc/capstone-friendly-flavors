import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { deleteRecipe, getRecipeById } from "../../managers/recipeManager";
import "./RecipePage.css"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem, ListGroupItemHeading, Nav, NavItem, Table } from "reactstrap";
import { getCookBookByUserId } from "../../managers/cookBookManager";

export const RecipePage = ({loggedInUser}) => {

    const { recipeid } = useParams()

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState();

    useEffect(() => {
        getRecipeById(recipeid).then((rObj) => {
            console.log(rObj);
            setRecipe(rObj);
        });
    }, [recipeid]);

    
    function convertDecimalToMixedNumber(decimalValue) {
        const integerPart = Math.floor(decimalValue);
        const fractionalPart = decimalValue - integerPart;
    
        if (fractionalPart === 0) {
            return `${integerPart}`;
        }
    
        let fractionString = '';
        if (fractionalPart === 0.25) {
            fractionString = '1/4';
        } else if (fractionalPart === 0.5) {
            fractionString = '1/2';
        } else if (fractionalPart === 0.75) {
            fractionString = '3/4';
        } else if (fractionalPart === 0.125) {
            fractionString = '1/8'
        } else if (fractionalPart === 0.33) {
            fractionString = '1/3'
        } 
        else if (fractionalPart === 0.66) {
            fractionString = '1/8'
        } 
        else {
            fractionString = fractionalPart.toFixed(2); // Use the decimal value as-is if not a common fraction
        }

        if(integerPart === 0)
        {
            return `${fractionString}`
        }
        else{
            return `${integerPart} ${fractionString}`;
        }
    
    }

    console.log(convertDecimalToMixedNumber(1.5))

    const isDecimal = (num) =>
    {
        if(num % 1 !== 0)
        {
            return true
        }
        else
        {
            return false
        }
    }

    const handleDelete = () =>
    {
        console.log("deleting recipe..."+recipe.id)

        deleteRecipe(recipe.id)
        navigate("/recipes")
    }

    const handleEdit = () =>
    {
        navigate(`edit`)
    }

    if (recipe === undefined) return <div>Loading...</div>
    if (recipe.title === 'Not Found') return <div>Recipe Not Found.</div>

    return (
        <main className="rp-main">
            <section className="rp-section-header">
                {loggedInUser?.id === recipe.cookBook.userProfileId || loggedInUser?.roles.includes("Admin") ? (<><Button color="success" onClick={handleEdit} style={{float: "right", marginRight: "1rem", marginTop: "1rem"}}>Edit</Button><Button color="danger" onClick={handleDelete} style={{float: "right", marginRight: "1rem", marginTop: "1rem"}}>Delete Recipe</Button></>):("")}
                <h1 className="rp-title">{recipe.title}</h1>
                    <div className="rp-image-div">
                        <div className="rp-image-container">
                            {recipe.coverImageUrl ? (<img className="rp-img" src={recipe.coverImageUrl} alt="recipeCover"/>):(<img className="rp-img" src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="FoodImage"/>)}
                            {recipe.coverImageUrl ? (<img className="rp-img-blur" src={recipe.coverImageUrl} alt="recipeCover"/>):(<img className="rp-img-blur" src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="FoodImage"/>)}
                        </div>
                    </div>
                <Card inverse className="rp-card">
                    <CardHeader>
                        <CardTitle tag="h5">
                            Information
                        </CardTitle>
                    </CardHeader>
                    <CardBody className="rp-card-body">
                        <CardText className="rp-card-text">
                            <Table>
                                <thead>
                                    <th>Cook Time</th>
                                    <th>Complexity</th>
                                </thead>
                                <tbody>
                                    <th>~ {recipe.cookTime} hours</th>
                                    <th>~ {recipe.complexity} / 5</th>
                                </tbody>
                            </Table>
                        </CardText>
                    </CardBody>
                </Card>
            </section>

            <section className="rp-section-sidebar">
                <ListGroup vertical className="rp-sidebar">
                    <ListGroupItemHeading className="rp-sidebar-header">Ingredients:</ListGroupItemHeading>
                    {recipe.recipeIngredients.map((ri) => {
                        return (
                            <ListGroupItem className="rp-sidebar-item">
                                • <strong>{isDecimal(ri.amount) ? (<>{convertDecimalToMixedNumber(ri.amount)}</>):(ri.amount)} {!ri.measurement.abv ? (ri.measurement.type):(ri.measurement.abv)} {ri.ingredient.name}</strong>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </section>

            <section className="rp-section-body">
                <Card className="rp-bc">
                    <CardHeader className="rp-bc-header" tag="h2">
                        Directions
                    </CardHeader>
                    <CardBody className="rp-bc-body">
                        <CardText className="rp-bc-body-text">
                            {recipe.body}
                        </CardText>
                    </CardBody>
                </Card>
            </section>
        </main>
    )
}
