import { Form, Button, Col, FormGroup, FormText, Input } from "reactstrap"
import "./CreateIngredient.css"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { postIngredient } from "../../managers/ingredientManager"

export const CreateIngredient = () => {

    const [nameInput, setNameInput] = useState('')

    const navigate = useNavigate()

    const submitForm = () =>
    {
        let modifiedString = nameInput.replace(' ', '+');
        console.log(modifiedString)
        postIngredient(modifiedString)
        navigate("/recipes")
    }

    return (
        <main className="ci-main">
            <section className="ci-section">
                <Form className="ci-form">
                    <FormGroup className="ci-formgroup-input">
                        <Col className="ci-col">
                            <Input
                                className="ci-input"
                                maxLength={35}
                                type="text"
                                placeholder="Name..."
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormText className="ci-formtext"><div>please use lowercase letters for adjectives or directions, and begin the actual ingredient Name with a capital letter!</div><div>Example: "mostly skinned Apples"</div></FormText>

                    <FormGroup className="ci-formgroup-submit">
                        <Col>
                            <Button type="button" className="ci-button-submit" color="success" onClick={submitForm}>
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </section>
        </main>
    )
}