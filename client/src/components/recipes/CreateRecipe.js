import { useEffect, useState } from "react"
import { Form, Button, Col, FormGroup, Input, Label, ListGroup, ListGroupItem, Table, FormFeedback, Card, CardBody, CardHeader } from "reactstrap"
import { getAllIngredients, getIngredientByName } from "../../managers/ingredientManager";
import "./CreateRecipe.css"
import { getMeasurements } from "../../managers/measurementManager";
import { getCookBookByUserId } from "../../managers/cookBookManager";
import { postCompositeRecipe } from "../../managers/recipeManager";
import { useNavigate } from "react-router-dom";
import { Loading } from "../constants/Loading";

export const CreateRecipe = ({ loggedInUser }) => { //if you want comments on how everything works, checkout the editRecipe.js

    const navigate = useNavigate();

    const [loadPage, setLoadPage] = useState(false);
    const [submitError, setSubmitError] = useState(false)

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
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [cookTime, setCookTime] = useState(0)
    const [complexity, setComplexity] = useState(0)
    const [ingredientInputInvalid, setIngredientInputInvalid] = useState(false)
    const [amountInputInvalid, setAmountInputInvalid] = useState(false)

    const [isActive, setIsActive] = useState(false)

    const handleActive=()=>{
        if(/Android|iPhone/i.test(navigator.userAgent))
        {
            setIsActive(!isActive)
        }
    }
    
    let ingredientId = 0;
    
    useEffect(() => {
        getCookBookByUserId(loggedInUser.id).then((cObj) => {
            if (cObj.title === "Not Found") {
                navigate("/cookbook")
            }
            else
            {
                setCookbook(cObj);
                setLoadPage(true);
            }
        })
        getAllIngredients().then(setIngredients)
        getMeasurements().then(setMeasurements)
    }, [])

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

        //console.log(measurement)
        //console.log(measurement.id)
        console.log(measurement.type)

        if (!ingredients.some((i) => i.name === ingredientTextInput) || isNaN(measurement.id) || measurement.type === undefined || amount <= 0) {
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

    const submitForm = async () => {
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

        if (recipeIngredientArray.length >= 1 && title !== '' && body !== '' && cookbook.id !== null && complexity !== 0 && cookTime !== 0) {
            console.log("adding recipe...")
            //first create the perfectly formated JSON package that has both the recipe as well as all its recipeIngredients
            const compositeJSONPackage =
            {
                recipeData:
                {
                    cookBookId: cookbook.id,
                    title: title,
                    body: body,
                    cookTime: cookTime,
                    complexity: complexity,
                    coverImageUrl: imageUrl,
                    description: description
                },
                recipeIngredientData: []
            }

            for (const ria of recipeIngredientArray) {
                compositeJSONPackage.recipeIngredientData.push(ria)
            }

            console.log("=======the full thingy========")
            console.log(compositeJSONPackage)
            console.log("=======/the full thingy========")
            //then post that one JSON Composite Package using the endpoint

            if (compositeJSONPackage !== null) {
                await postCompositeRecipe(compositeJSONPackage)
                console.log(compositeJSONPackage)
                navigate(`/recipes`)
            }
        }
        else {
            console.log("invalid inputs, try again.")
            setSubmitError(true);
        }

    }

    if (loadPage) {
        return (
            <main className="cr-main">
                <section className="cr-section-header">
                    <h1 className="cr-header">{cookbook.title}</h1>
                </section>
                <section className="cr-section-form">
                    <h3>New Recipe</h3>
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

                        <FormGroup row className="cr-formgroup-description">
                            <Label
                                className="cr-label cr-label-description"
                                for="Body"
                                sm={2}
                            >
                                Description:
                            </Label>
                            <Col sm={10}>
                                <Input
                                    maxLength={180}
                                    className="cr-input-description"
                                    placeholder="Short Description..."
                                    id="Description"
                                    name="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

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
                                    placeholder="Recipe Instructions..."
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
                                    Submit
                                </Button>
                                {submitError ? (<div style={{ color: "red", fontWeight: "bold", marginTop: "1rem", fontSize: "1rem", textAlign: "center" }}>Required Input Fields Missing</div>) : ("")}
                            </Col>
                        </FormGroup>
                    </Form>

                </section>
                <section className="cr-section-table">
                    <Card onClick={handleActive} className={isActive ? 'cr-card-active' : 'cr-card'}>
                        <CardHeader className="cr-card-header"><th>Recipe Ingredients</th></CardHeader>
                        <CardBody className="cr-card-body">
                            <Table className="cr-table-recipeingredients">
                                <thead className="cr-thead">
                                    <tr className="cr-thead-row">
                                        <th className="cr-th">#</th>
                                        <th className="cr-thead-th">Ingredient</th>
                                        <th className="cr-thead-th">Amount</th>
                                        <th className="cr-thead-th">Measurement</th>
                                        <th className="cr-thead-th"></th>
                                    </tr>
                                </thead>
                                <tbody className="cr-tbody">
                                    {recipeIngredientArray.map((ri, index) => {
                                        return (
                                            <tr className="cr-tbody-row" key={ri.ingredientName}>

                                                <th className="cr-tbody-td">{index + 1}</th>
                                                <td className="cr-tbody-td">{ri.ingredientName}</td>
                                                <td className="cr-tbody-td">{ri.amount}</td>
                                                <td className="cr-tbody-td">{ri.measurementName}</td>
                                                <td className="cr-tbody-td"><button className="cr-remove-btn" value={index} onClick={() => handleRemoveIngredient(index)} color="danger">X</button></td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </section>
                <div className="cr-br">-</div>
            </main>
        )
    }
    return <Loading/>
}