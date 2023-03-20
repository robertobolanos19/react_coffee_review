import StarRating from "./StarRating"

const Form = ({handleSubmit, handleNameInputChange,nameVal,handleDescriptionInputChange,descVal,handleUsernameInputChange,usernameVal, handleStarInputChange,starVal})=>{
    return(
        <form onSubmit={handleSubmit}>
            <h3>Visited Coffee Shop :</h3><input type="text" onChange={handleNameInputChange} value={nameVal}/>
            <h3>Username :</h3><input type="text" onChange={handleUsernameInputChange} value={usernameVal}/>
            <h3>Description :</h3><textarea onChange={handleDescriptionInputChange} value={descVal}></textarea>
            <StarRating onClick={handleStarInputChange} starVal={starVal}/>
            <br></br>
            <br></br>
            <button type="submit">Submit review</button>
        </form>
    )
}

//<h3>Stars Rating:</h3><input type="radio" onChange={handleStarInputChange} value={starVal} max="5"/>

export default Form