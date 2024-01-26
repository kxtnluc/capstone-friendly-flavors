import { Form, Button, Col, FormGroup, FormText, Input } from "reactstrap"
import "./CreateIngredient.css"
import { useState } from "react"

export const CreateIngredient = () => {

    const [nameInput, setNameInput] = useState('')

    const submitForm = () =>
    {
        let modifiedString = nameInput.replace(' ', /+/g);
    }

    return (
        <main className="ci-main">
            <section className="ci-section">
                <Form className="ci-form">
                    <FormGroup className="ci-formgroup-input">
                        <Col className="ci-col">
                            <Input
                                className="ci-input"
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