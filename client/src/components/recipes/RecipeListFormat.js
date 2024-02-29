import { Link, useNavigate } from "react-router-dom";
import "./RecipeList.css"
import { Card, CardBody, CardHeader, CardImg } from "reactstrap";
import "./RecipeListFormat.css"
import { useEffect, useState } from "react";

export const RecipeListFormat = ({ recipes }) => {

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false)

    const MobileSettingFunction = () => {
        console.log(/Android|iPhone/i.test(navigator.userAgent))
        setIsMobile(/Android|iPhone/i.test(navigator.userAgent))
        console.log(isMobile)
        // return /Android|iPhone/i.test(navigator.userAgent)
    }

    useEffect(() => {
        MobileSettingFunction();
    }, [])


    return (
        <section className="rl-section-list">
            <div className="rl-br"></div>
            {recipes.map((r) => {
                return (
                    <Card key={r.id} className="rl-card">
                        {isMobile ? (
                            <>
                                <div className="rl-card-img-container">
                                    {r.coverImageUrl ? (
                                        <CardImg onClick={() => navigate(`/recipes/${r.id}`)} alt="cardimg" src={r.coverImageUrl} top width="100%" className="rl-card-img" />)
                                        :
                                        <CardImg onClick={() => navigate(`/recipes/${r.id}`)} alt="cardimg" src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0" top width="100%" className="rl-card-img" />}

                                </div>
                                <CardHeader onClick={() => navigate(`/recipes/${r.id}`)} className="rl-card-header">
                                    {r.title}
                                </CardHeader>
                            </>
                        ) : (
                            <>
                                <Link to={`/cookbook/${r.cookBook.id}`} style={{ textDecoration: "none", color: "black" }}>
                                    <CardBody className="rl-card-hh">
                                        <i className="rl-i">{r.cookBook.title}</i>
                                    </CardBody>
                                </Link>
                                <div className="rl-card-img-container">
                                    {r.coverImageUrl ? (
                                        <CardImg onClick={() => navigate(`/recipes/${r.id}`)} alt="cardimg" src={r.coverImageUrl} top width="100%" className="rl-card-img" />)
                                        :
                                        <CardImg onClick={() => navigate(`/recipes/${r.id}`)} alt="cardimg" src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0" top width="100%" className="rl-card-img" />}

                                </div>
                                <CardHeader onClick={() => navigate(`/recipes/${r.id}`)} className="rl-card-header">
                                    {r.title}
                                </CardHeader>
                                <CardBody onClick={() => navigate(`/recipes/${r.id}`)} className="rl-card-body">
                                    {r.description ? (`${r.description}`) : ("See more...")}
                                </CardBody>
                            </>
                        )}

                    </Card>
                )
            })}
        </section>
    )
}