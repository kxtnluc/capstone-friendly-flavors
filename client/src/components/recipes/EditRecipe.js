import { useEffect, useState } from "react"
import { Form, Button, Col, FormGroup, Input, Label, ListGroup, ListGroupItem, Table, FormFeedback, Card, CardBody, CardHeader } from "reactstrap"
import { getAllIngredients, getIngredientByName } from "../../managers/ingredientManager";
import "./CreateRecipe.css"
import { getMeasurements } from "../../managers/measurementManager";
import { getCookBookByUserId } from "../../managers/cookBookManager";
import { getRecipeById, postCompositeRecipe, updateRecipe } from "../../managers/recipeManager";
import { useNavigate, useParams } from "react-router-dom";

export const EditRecipe = ({ loggedInUser }) => {

    const navigate = useNavigate();
    const {recipeid} = useParams();

    const [recipeToEdit, setRecipeToEdit] = useState({})

    const [ingredientTextInput, setIngredientTextInput] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [measurements, setMeasurements] = useState([])
    const [amount, setAmount] = useState(0.0)
    const [measurement, setMeasurement] = useState({})
    const [cookbook, setCookbook] = useState({});
    const [recipeIngredientArray, setRecipeIngredientArray] = useState([]);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [cookTime, setCookTime] = useState(0)
    const [complexity, setComplexity] = useState(0)
    const [ingredientInputInvalid, setIngredientInputInvalid] = useState(false)
    const [amountInputInvalid, setAmountInputInvalid] = useState(false)
    
    let ingredientId = 0;

    
    
    useEffect(() => {

        getCookBookByUserId(loggedInUser.id).then(setCookbook)
        getAllIngredients().then(setIngredients)
        getMeasurements().then(setMeasurements)
        getRecipeById(recipeid).then((rObj) => {
            setRecipeToEdit(rObj)
            setTitle(rObj.title)
            setBody(rObj.body)
            setImageUrl(rObj.coverImageUrl)
            setCookTime(rObj.cookTime)
            setComplexity(rObj.complexity)
            setRecipeIngredientArray(rObj.recipeIngredients)
        })

    }, [loggedInUser, recipeid])

    const getSuggestions = (input) => {
        // Replace this with your actual database or API call
        const filteredSuggestions = ingredients.filter((i) => i.name.toLowerCase().includes(input.toLowerCase()));

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

    const handleImgChange = (e) => {
        let files = e.target.files;

        if (files.length > 0) {
            let reader = new FileReader();

            reader.onload = (e) => {
                // Set imageUrl to the base64-encoded data URL of the uploaded image
                setImageUrl(e.target.result);
            };

            reader.readAsDataURL(files[0]);
        }
    };

    const handleAddRecipeIngredient = async (e) => 
    {

        e.preventDefault();

        if(ingredients.some((i) => i.name === ingredientTextInput)) setIngredientInputInvalid(false)
        else setIngredientInputInvalid(true)

        console.log(amount)

        if(amount > 0) setAmountInputInvalid(false)
        else setAmountInputInvalid(true)

        console.log(ingredientTextInput);

        console.log(measurement)
        console.log(measurement.id)
        console.log(measurement.type)

        if (ingredientTextInput === '' || isNaN(measurement.id) || measurement.type === undefined || amount <= 0) {
            console.log('try again shmucko')
        }
        else {
            try {
                const iObj = await getIngredientByName(ingredientTextInput);
                ingredientId = iObj.id;

                const newRecipeIngredientWithNames = {
                    ingredientId: ingredientId,
                    measurementId: parseInt(measurement.id),
                    amount: amount,
                    ingredientName: ingredientTextInput,
                    measurementName: measurement.type
                }

                setRecipeIngredientArray((prevArray) => [...prevArray, newRecipeIngredientWithNames]);

                console.log(recipeIngredientArray); // Log the updated array here

                setIngredientTextInput('')

            } catch (error) {
                console.error('Error fetching ingredient:', error);
            }
        }

    };

    const handleRemoveIngredient = (indexToRemove) => {

        console.log(indexToRemove)

        setRecipeIngredientArray((prevArray) => {
          // Use filter to create a new array excluding the item with the specified index
          return prevArray.filter((_, index) => index !== indexToRemove);
        });
      };


    const handleInputBlur = () => {
        setSuggestions([]);
    };

    const submitForm = () => {
        console.log("=====cookbookId=====")
        console.log(cookbook.id)
        console.log("=====recipeIngredientArray=====")
        console.log(recipeIngredientArray)
        console.log("=====title=====")
        console.log(title)
        console.log("=====cooktime=====")
        console.log(cookTime)
        console.log("=====complexity=====")
        console.log(complexity)
        console.log("=====body=====")
        console.log(body)
        console.log("=====imageUrl=====")
        console.log(imageUrl)

        if (recipeIngredientArray.length >= 1 && title !== '' && body !== '' && cookbook.id !== null) {
            console.log("adding recipe...")
            //first create the perfectly formated JSON package that has both the recipe as well as all its recipeIngredients
            const recipeData = {
                id: recipeToEdit.id,
                cookBookId: recipeToEdit.cookBookId,
                title: title,
                body: body,
                cookTime: cookTime,
                complexity: complexity,
                coverImageUrl: imageUrl //add description eventually
            }

            // for (const ria of recipeIngredientArray) {
            //     compositeJSONPackage.recipeIngredientData.push(ria)
            // }

            console.log("=======the full thingy========")
            console.log(recipeData)
            console.log("=======/the full thingy========")
            //then post that one JSON Composite Package using the endpoint

            if (recipeData !== null) {
                updateRecipe(recipeData).then((newRecipeObj) => {
                    console.log(newRecipeObj);
                    // navigate(`/recipes/${recipeData.id}`)
                })
            }
        }
        else {
            console.log("invalid inputs, try again.")
        }
    }


    return (
        <main className="cr-main">
            <section className="cr-section-header">
                <h1 className="cr-header">{cookbook.title}</h1>
            </section>
            <section className="cr-section-form">
                <h3>Edit Recipe: {recipeToEdit.title}</h3>
                <Form className="cr-form">
                    <FormGroup row className="cr-formgroup-title">
                        <Label
                            className="cr-label-title cr-label"
                            for="Title"
                            sm={2}
                        >
                            Title
                        </Label>
                        <Col sm={10}>
                            <Input
                                placeholder="Title..."
                                className="cr-input-title"
                                id="Title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="cr-formgroup-cooktime">
                        <Label
                            className="cr-label cr-label-cooktime"
                            for="CookTime"
                            sm={2}
                        >
                            Cook Time
                        </Label>
                        <Col sm={10}>
                            <Input
                                className="cr-input-cooktime"
                                id="cooktime"
                                name="cooktime"
                                type="number"
                                value={cookTime}
                                onChange={(e) => setCookTime(parseInt(e.target.value))}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="cr-formgroup-complexity">
                        <Label
                            className="cr-label cr-label-complexity"
                            for="Complexity"
                            sm={2}
                        >
                            Complexity
                        </Label>
                        <Col sm={10}>
                            <Input
                                placeholder="(1-5)"
                                className="cr-input-complexity"
                                id="complexity"
                                name="complexity"
                                type="number"
                                value={complexity}
                                onChange={(e) => setComplexity(parseInt(e.target.value))}
                            />
                        </Col>
                    </FormGroup>
                    <div className="cr-br"></div>
                    <FormGroup row className="cr-formgroup-ingredient">
                        <Label
                            className="cr-label cr-label-ingredient"
                            for="Ingredient"
                            sm={2}
                        >
                            Ingredient
                        </Label>
                        <Col sm={10} style={{ position: 'relative' }}>
                            <Input
                                className="cr-input-ingredient"
                                id="ingredient"
                                name="ingredient"
                                placeholder="Ingredient..."
                                type="text"
                                maxLength={25}
                                onChange={handleIngredientInputChange}
                                value={ingredientTextInput}
                                onBlur={handleInputBlur}
                                invalid={ingredientInputInvalid}
                            />
                            {suggestions.length > 0 && (
                                <ListGroup
                                    className="suggestion-list"
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        zIndex: 1000, // Set a higher z-index to appear above other elements
                                    }}
                                >
                                    {suggestions.map((suggestion, index) => (
                                        <ListGroupItem
                                            key={index}
                                            onMouseDown={() => handleSuggestionClick(suggestion)}
                                            active={selectedSuggestion === index}
                                            className="suggestion-item"
                                        >
                                            {suggestion.name}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                            <FormFeedback>
                                Ingredient Not Found!
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="cr-formgroup-amount">
                        <Label
                            className="cr-label cr-label-amount"
                            for="amount"
                            sm={2}
                        >
                            Amount
                        </Label>
                        <Col sm={10}>
                            <Input
                                placeholder="Amount..."
                                className="cr-input-amount"
                                id="amount"
                                multiple
                                name="amount"
                                type="number"
                                invalid={amountInputInvalid}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                            />
                            <FormFeedback>
                                No Value Given!
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="cr-formgroup-measurement">
                        <Label
                            className="cr-label cr-label-measurement"
                            for="measurement"
                            sm={2}
                        >
                            Measurement
                        </Label>
                        <Col sm={10}>
                            <Input
                                className="cr-input-measurement"
                                id="measurement"
                                name="measurement"
                                type="select"
                                onChange={(e) => {
                                    setMeasurement(measurements.find((m) => m.id === parseInt(e.target.value)))
                                }}
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

                    <Button className="cr-button-addingredient" type="button" onClick={handleAddRecipeIngredient} size="sm" color="success">Add Recipe Ingredient</Button>

                    <div className="cr-br"></div>

                    <FormGroup row className="cr-formgroup-body">
                        <Label
                            className="cr-label cr-label-body"
                            for="Body"
                            sm={2}
                        >
                            Directions
                        </Label>
                        <Col sm={10}>
                            <Input
                                className="cr-input-body"
                                id="Body"
                                name="body"
                                type="textarea"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </Col>
                    </FormGroup>


                    <FormGroup row className="cr-formgroup-fileupload">
                        <Label
                            className="cr-label cr-label-fileupload"
                            for="exampleFile"
                            sm={2}
                        >
                            Cover Image:
                        </Label>
                        <Col sm={10}>
                            <Input
                                className="cr-input-fileupload"
                                id="exampleFile"
                                name="file"
                                type="file"
                                onChange={handleImgChange}
                                accept="image/png, image/jpeg"
                            />
                            {/* <FormText className="cr-formtext-fileupload">
                                An image is not nessesary for subbmission, but showing off your recipe through a cover image is a great way to get people to try your stuff!
                            </FormText> */}
                        </Col>
                    </FormGroup>

                    <div className="cr-br"></div>


                    <FormGroup className="cr-formgroup-submit">
                        <Col>
                            <Button type="button" className="cr-button-submit" onClick={submitForm}>
                                Update
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </section>
            <section className="cr-section-table">
                <Card className="cr-card">
                    <CardHeader className="cr-card-header"><th>Recipe Ingredients</th></CardHeader>
                    <CardBody className="cr-card-body">
                        <Table className="cr-table-recipeingredients">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ingredient</th>
                                    <th>Amount</th>
                                    <th>Measurement</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipeIngredientArray.map((ri, index) => {
                                    return (
                                        <tr key={ri.ingredientName}>

                                            <th>{index + 1}</th>
                                            <td>{ri.ingredient.name}</td>
                                            <td>{ri.amount}</td>
                                            <td>{ri.measurement.type}</td>
                                            <td><Button value={index} onClick={() => handleRemoveIngredient(index)} color="danger"><strong>X</strong></Button></td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </section>
        </main>
    )
}