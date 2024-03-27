import { Card, CardBody, CardFooter, CardHeader } from "reactstrap"
import "./CookBookListFormat.css"
import { useNavigate } from "react-router-dom"

export const CookBookListFormat = ({cookBooks}) =>
{

    const navigate = useNavigate();

    return (
        <section className="clf-section">
            {cookBooks.map((c) => {
                return(
                    <Card onClick={()=>navigate(`/cookbook/${c.userProfileId}`)} className="clf-card"> {/*someday, if users can have multiple cookbooks, this should be changed to c.id*/}
                        <CardHeader className="clf-card-header">{c.title}</CardHeader>
                        <CardBody className="clf-card-body">{c.description}</CardBody>
                        <CardFooter className="clf-card-footer">(recipe count?)</CardFooter>
                    </Card>
                )
            })}
        </section>
    )
}