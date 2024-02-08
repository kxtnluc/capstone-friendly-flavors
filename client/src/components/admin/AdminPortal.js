import { Card, CardBody, CardHeader, CardImg } from "reactstrap"
import "./AdminPortal.css"
import { useNavigate } from "react-router-dom"

export const AdminPortal = () => {

    const navigate = useNavigate();

    return (
        <main className="ap-main">
            <section className="ap-section">
                <Card onClick={()=>navigate("/ingredients/create")} className="ap-card">
                    <div className="ap-card-imgcontainer">
                        <CardImg className="ap-card-img" alt="foods" src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/10/14/FN_ingredient-substitutions_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1634257696464.jpeg"/>
                    </div>
                    <CardHeader className="ap-card-header">
                        Create Ingredient
                    </CardHeader>
                    <CardBody className="ap-card-body">
                        <i>Add more ingredients to the ever growing database for users to utalize in their recipes!</i>
                    </CardBody>
                </Card>
                <Card onClick={()=>navigate("promote")} className="ap-card">
                    <div className="ap-card-imgcontainer">
                        <CardImg className="ap-card-img" alt="foods" src="https://cdn-icons-png.flaticon.com/512/3135/3135783.png"/>
                    </div>
                    <CardHeader className="ap-card-header">
                        Promote User
                    </CardHeader>
                    <CardBody className="ap-card-body">
                        <i>Promote a User of Friendly Flavors to the <strong>Admin</strong> role. "No Man Rules Alone!"</i>
                    </CardBody>
                </Card>
            </section>
        </main>
    )
}