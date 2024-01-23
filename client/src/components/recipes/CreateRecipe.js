import { useEffect, useState } from "react"
import { Form, Button, Col, FormGroup, FormText, Input, Label, ListGroup, ListGroupItem, Table } from "reactstrap"
import { getAllIngredients, getIngredientByName } from "../../managers/ingredientManager";
import "./CreateRecipe.css"
import { getMeasurements } from "../../managers/measurementManager";

export const CreateRecipe = () => {

    const [ingredientTextInput, setIngredientTextInput] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    const [ingredients, setIngredients] = useState([]);
    const [measurements, setMeasurements] = useState([])

    const [ingredientId, setIngredientId] = useState(null)
    const [amount, setAmount] = useState(null)
    const [measurementId, setMeasurementId] = useState(null)

    useEffect(() => {
        getAllIngredients().then(setIngredients)
        getMeasurements().then(setMeasurements)
    }, [])

    const getSuggestions = (input) => {
        // Replace this with your actual database or API call
        const filteredSuggestions = ingredients.filter((i) => i.name.includes(input));

        return filteredSuggestions.slice(0, 5);
    };

    const handleIngredientInputChange = (e) => {
        const value = e.target.value
        setIngredientTextInput(value)

        // Filter suggestions based on user input
        const filteredSuggestions = getSuggestions(value);
        setSuggestions(filteredSuggestions);
    }

    const handleSuggestionClick = (suggestion) => {
        setIngredientTextInput(suggestion.name);
        setSuggestions([]); // Clear suggestions
        setSelectedSuggestion(null);
    };

    const handleAddRecipeIngredient = (e) => {

        e.preventDefault();

        console.log(ingredientTextInput)

        getIngredientByName(ingredientTextInput).then((iObj) =>
        {
            setIngredientId(iObj.id);
            const recipeIngredient = {
                ingredientId: ingredientId,
                measurementId: measurementId,
                amount: amount
            }
    
            console.log(recipeIngredient)
        })

    }

    return (
        <main style={{ backgroundColor: "wheat" }}>
            <section>
                <Form>
                    <FormGroup row>
                        <Label
                            for="Ingredient"
                            sm={2}
                        >
                            Ingredient
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="ingredient"
                                name="ingredient"
                                placeholder="Ingredient..."
                                type="text"
                                maxLength={25}
                                onChange={handleIngredientInputChange}
                                value={ingredientTextInput}
                            />
                            {suggestions.length > 0 && (
                                <ListGroup className="suggestion-list">
                                    {suggestions.map((suggestion, index) => (
                                        <ListGroupItem
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            active={selectedSuggestion === index}
                                            className="suggestion-item"
                                        >
                                            {suggestion.name}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="amount"
                            sm={2}
                        >
                            Amount
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="amount"
                                multiple
                                name="amount"
                                type="number"
                                onChange={(e) => setAmount(parseInt(e.target.value))}
                            />
                        </Col>
                    </FormGroup>                        
                    <FormGroup row>
                        <Label
                            for="exampleSelect"
                            sm={2}
                        >
                            Measurement
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={(e) => setMeasurementId(parseInt(e.target.value))}
                            >
                                <option value={0}>- No Measurement -</option>
                                {measurements.map((m) => {
                                    return (
                                        <option key={m.id} value={m.id}>{m.type}</option>
                                    )
                                })}
                            </Input>
                        </Col>
                    </FormGroup>

                    <Button type="button" onClick={handleAddRecipeIngredient} size="sm" color="success">Add Recipe Ingredient</Button>
                    
                    <Table>
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Amount</th>
                                <th>Measurement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>a</td>
                                <td>b</td>
                                <td>c</td>
                            </tr>
                        </tbody>
                    </Table>

                    <FormGroup row>
                        <Label
                            for="exampleText"
                            sm={2}
                        >
                            Body
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="exampleText"
                                name="text"
                                type="textarea"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="exampleFile"
                            sm={2}
                        >
                            Cover Image:
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="exampleFile"
                                name="file"
                                type="file"
                            />
                            <FormText>
                                This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                            </FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup
                        check
                        row
                    >
                        <Col
                            sm={{
                                offset: 2,
                                size: 10
                            }}
                        >
                            <Button>
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </section>
        </main>
    )
}