import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getRecipeById } from "../../managers/recipeManager";
import "./RecipePage.css"
import { Card, CardBody, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem, ListGroupItemHeading, Nav, NavItem, Table } from "reactstrap";

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
                    <div className="rp-image-div">
                        {recipe.coverImageUrl ? (<img className="rp-img" src={recipe.coverImageUrl} alt="recipeCover"/>):(<img className="rp-img" src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="FoodImage"/>)}
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
                                • <strong>{ri.amount} {ri.measurement.type} {ri.ingredient.name}</strong>
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
