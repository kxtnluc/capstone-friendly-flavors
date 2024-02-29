import { useEffect, useState } from "react"
import { Form, Button, Col, FormGroup, Input, Label, ListGroup, ListGroupItem, Table, FormFeedback, Card, CardBody, CardHeader } from "reactstrap"
import { getAllIngredients, getIngredientByName } from "../../managers/ingredientManager";
import "./CreateRecipe.css"
import { getMeasurements } from "../../managers/measurementManager";
import { getCookBookByUserId } from "../../managers/cookBookManager";
import { deleteRIs, getRecipeById, postCompositeRecipe, updateRecipe } from "../../managers/recipeManager";
import { useNavigate, useParams } from "react-router-dom";

export const EditRecipe = ({ loggedInUser }) => {

    const navigate = useNavigate();                                         //navigate stuff
    const {recipeid} = useParams();                                         //gets the id from the url

    const [recipeToEdit, setRecipeToEdit] = useState({})                    //an object to hold the recipe which is to be edited

    const [ingredientTextInput, setIngredientTextInput] = useState('')      //a string for the ingredient input
    const [suggestions, setSuggestions] = useState([]);                     //an array of ingredients that filter bassed on what the user types into the input bar, which uses the state above ^
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);     //whatever the user clicks from the array provided above ^
    const [ingredients, setIngredients] = useState([]);                     //the whole list of the databases ingredients
    const [measurements, setMeasurements] = useState([])                    //the whole list of measurements from the database
    const [amount, setAmount] = useState(0.0)                               //a variable that holds an amount input by the user
    const [measurement, setMeasurement] = useState({})                      //UNLIKE measurementS, this one represents what measurement object the user selects from the array measurmentS above ^
    const [cookbook, setCookbook] = useState({});                           //the users cookbook
    const [recipeIngredientArray, setRecipeIngredientArray] = useState([]); //an array of recipeIngredients 
    const [title, setTitle] = useState('')                                  //input title for the recipe
    const [body, setBody] = useState('')                                    //input body for the recipe
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')                            //optional image input for the recipe
    const [cookTime, setCookTime] = useState(0)                             //cooktime input
    const [complexity, setComplexity] = useState(0)                         //complexity inpout

    const [ingredientInputInvalid, setIngredientInputInvalid] = useState(false) //boolean to check if user put in valid ingredient
    const [amountInputInvalid, setAmountInputInvalid] = useState(false)         //boolean to check if user put in a valid amount
    
    let ingredientId = 0;   //this is supposed to hold the ingredient id, but honestly im not really sure if its nessesary up here

    const [isActive, setIsActive] = useState(false)

    const handleActive=()=>{
        if(/Android|iPhone/i.test(navigator.userAgent))
        {
            setIsActive(!isActive)
        }
    }

    //stuff to add for editing:
    const [oldRIArray, setOldRIArray] = useState([])                        //an unchanging array of the old recipeIngredient array to be compared against when making changes
    const [recipeIngredientArrayOfRemoval, setRIAOR] = useState([])         //an array of recipe ingredients that were removed from the array above
    const [recipeIngredientArrayToAdd, setRIATA] = useState([])             //an array of recipe ingredients that are added

    
    
    useEffect(() => {

        getCookBookByUserId(loggedInUser.id).then(setCookbook)              //gets&sets cookbook
        getAllIngredients().then(setIngredients)                            //gets&sets ingredients
        getMeasurements().then(setMeasurements)                             //gets&sets measurments
        getRecipeById(recipeid).then((rObj) => {                            //gets recipe obj
            setRecipeToEdit(rObj)                                       //sets recipe to edit
            setTitle(rObj.title)                                        //sets recipe title
            setBody(rObj.body)                                          //sets recipe body
            setImageUrl(rObj.coverImageUrl)                             //sets cover img
            setCookTime(rObj.cookTime)                                  //sets cooktime
            setComplexity(rObj.complexity)                              //sets complexity value
            for (const ri of rObj.recipeIngredients) {                  //loops through each ri in the recipe
                ri.ingredientName = ri.ingredient.name              //adds an ingredientName value to the parent object to be used later in the table
                ri.measurementName = ri.measurement.type            //same as above but for measurement type ^
            }
            setRecipeIngredientArray(rObj.recipeIngredients)        //sets the initial, changable recipe ingredient array
            setOldRIArray(rObj.recipeIngredients)                   //sets the old, unchanging recipe ingredient array
        })

    }, [loggedInUser, recipeid])
    
    const getSuggestions = (input) => {                             //gets a list of suggestions bassed on what was typed into the ingredient input bar
        // Replace this with your actual database or API call
        const filteredSuggestions = ingredients.filter((i) => i.name.toLowerCase().includes(input.toLowerCase()));
        
        return filteredSuggestions.slice(0, 5);
    };

    const handleInputBlur = () => { //if user clicks off of the input bar, the suggestions will dissapear
        setSuggestions([]);
    };

    const handleIngredientInputChange = (e) => {                    //changes the value of the ingredient input bar, and sets suggestion filter using function above^

        const value = e.target.value
        setIngredientTextInput(value)

        // Filter suggestions based on user input
        const filteredSuggestions = getSuggestions(value);
        setSuggestions(filteredSuggestions);
    }

    const handleSuggestionClick = (suggestion) => {                 //auto fills the ingredient input by the cliicked on item from the filtered suggestion list

        setIngredientTextInput(suggestion.name);
        setSuggestions([]); // Clear suggestions
        setSelectedSuggestion(null);
    };

    const handleImgChange = (e) => {                                //creates an imageURL from the files chosen on the local machine to then be set as the coverImgUrl             
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

    const handleAddRecipeIngredient = async (e) =>                  //handles the addition of an ingredient recipe
    {

        e.preventDefault(); //prevents reload because Form

        if(ingredients.some((i) => i.name === ingredientTextInput)) setIngredientInputInvalid(false) //checks if ingredient name exists in database
        else setIngredientInputInvalid(true)

        if(amount > 0) setAmountInputInvalid(false) //checks if amount input is > 0
        else setAmountInputInvalid(true)

        // console.log(ingredientTextInput);

        // console.log(measurement)
        // console.log(measurement.id)
        // console.log(measurement.type)

        if (ingredientTextInput === '' || isNaN(measurement.id) || measurement.type === undefined || amount <= 0) { //makes sure all the data is valid before adding to array
            console.log('try again shmucko') //maybe put a window prompt?
        }
        else {
            try {
                const iObj = await getIngredientByName(ingredientTextInput); //gets the ingredientObj from the database bassed on the name placed into the input
                ingredientId = iObj.id; //not sure if this is a nessesary step

                const newRecipeIngredientWithNames = {  //creates a clean ri object with extra details.
                    ingredientId: ingredientId,
                    measurementId: parseInt(measurement.id),
                    amount: amount,
                    ingredientName: ingredientTextInput,
                    measurementName: measurement.type
                }

                setRecipeIngredientArray((prevArray) => [...prevArray, newRecipeIngredientWithNames]); //adds the clean ri object to the ri array
                setRIATA((prevArray) => [...prevArray, newRecipeIngredientWithNames]);                  //adds the clean ri object to the ri array of additions!

                console.log(recipeIngredientArray); // Log the updated array here

                setIngredientTextInput('')  //clears the input bar

            } catch (error) {
                console.error('Error fetching ingredient:', error);
            }
        }

    };

    const handleRemoveIngredient = (indexToRemove, recipeIngredientToRemove) => { //removes an ri bassed on index in the array

        console.log(indexToRemove) //logs index

        setRecipeIngredientArray((prevArray) => { //REMOVES ri using on its index
          // Use filter to create a new array excluding the item with the specified index
          return prevArray.filter((_, index) => index !== indexToRemove);
        });
        if(oldRIArray.includes(recipeIngredientToRemove)) //if the ri trying to be removed was part of the intial recipe, then it is set to the REMOVE array
        {
            console.log("adding to removal array...")
            setRIAOR((prevArray) => [...prevArray, recipeIngredientToRemove]); //this remove DOES NOT use index
        }
        if(recipeIngredientArrayToAdd.includes(recipeIngredientToRemove)) //if the ri trying to be removed was added to the riAdd array, it will remove it from that array
        {
            console.log("adding to removal array from add array...")
            setRIATA((prevArray) => {
                // Use filter to create a new array excluding the item with the specified ids
                return prevArray.filter((item) => 
                  item.ingredientId !== recipeIngredientToRemove.ingredientId || item.measurementId !== recipeIngredientToRemove.measurementId //THIS COULD CAUSE ERRORS, because its only finding the correct item bassed on its measurement and ingredient
                );
              });
        }
      };



    const submitForm = () => { //UPDATE RECIPE FORM BUTTON 
        // console.log("=====cookbookId=====")
        // console.log(cookbook.id)
        // console.log("=====recipeIngredientArray=====")
        // console.log(recipeIngredientArray)
        // console.log("=====title=====")
        // console.log(title)
        // console.log("=====cooktime=====")
        // console.log(cookTime)
        // console.log("=====complexity=====")
        // console.log(complexity)
        // console.log("=====body=====")
        // console.log(body)
        // console.log("=====imageUrl=====")
        // console.log(imageUrl)
        console.log(description)

        if (recipeIngredientArray.length >= 1 && title !== '' && body !== '' && cookbook.id !== null) { //checks to make sure everything has a value before adding
            console.log("adding recipe...")
            //first create the perfectly formated JSON package that has both the recipe as well as all its recipeIngredients
            const recipeData = {
                id: recipeToEdit.id,
                cookBookId: recipeToEdit.cookBookId,
                title: title,
                body: body,
                cookTime: cookTime,
                complexity: complexity,
                description: description,
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

                const riAddDeleteCompositeObj = {
                    riAdd: [],
                    riDelete: []
                }

                for (const ri of recipeIngredientArrayOfRemoval) {
                    delete ri.measurementName
                    delete ri.measurement
                    delete ri.ingredientName
                    delete ri.ingredient
                    ri.recipeId = parseInt(recipeid)
                    riAddDeleteCompositeObj.riDelete.push(ri)
                }
                
                for (const ri of recipeIngredientArrayToAdd) {
                    delete ri.measurementName
                    delete ri.measurement
                    delete ri.ingredientName
                    delete ri.ingredient
                    ri.recipeId = parseInt(recipeid)
                    riAddDeleteCompositeObj.riAdd.push(ri)
                }

                console.log("===Add Array===")
                console.log(recipeIngredientArrayToAdd)
                console.log("===Remove Array===")
                console.log(recipeIngredientArrayOfRemoval)
                console.log("=========COMPOSITE=========")
                console.log(riAddDeleteCompositeObj)


                deleteRIs(riAddDeleteCompositeObj)

                updateRecipe(recipeData).then((newRecipeObj) => {
                    console.log(newRecipeObj);
                    navigate(`/recipes/${recipeData.id}`)
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