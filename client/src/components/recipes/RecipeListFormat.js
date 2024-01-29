import { useNavigate } from "react-router-dom";
import "./RecipeList.css"
import { Card, CardBody, CardHeader, CardImg } from "reactstrap";
import "./RecipeListFormat.css"

export const RecipeListFormat = ({recipes}) =>
{

    const navigate = useNavigate();

    return(
        <section className="rl-section-list">
            <div className="rl-br"></div>
            {recipes.map((r) => {
                return (
                        <Card onClick={() => navigate(`/recipes/${r.id}`)} className="rl-card">
                            <div className="rl-card-img-container">
                                {r.coverImageUrl ? (
                                <CardImg alt="cardimg" src={r.coverImageUrl} top width="100%" className="rl-card-img"/>)
                                :
                                <CardImg alt="cardimg" src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0" top width="100%" className="rl-card-img"/>}
                                
                            </div>
                            <CardHeader className="rl-card-header">
                                {r.title}
                            </CardHeader>
                            <CardBody className="rl-card-body">
                                {r.description ? (`${r.description}`):("See more...")}
                            </CardBody>
                        </Card>
                )
            })}
        </section>
    )
}