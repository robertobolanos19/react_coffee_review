const Form = ({handleSubmit, handleNameInputChange,nameVal,handleDescriptionInputChange,descVal,handleUsernameInputChange,usernameVal})=>{
    return(
        <form onSubmit={handleSubmit}>
            <h3>Visited Coffee Shop :</h3><input type="text" onChange={handleNameInputChange} value={nameVal}/>
            <h3>Username :</h3><input type="text" onChange={handleUsernameInputChange} value={usernameVal}/>
            <h3>Description :</h3><textarea onChange={handleDescriptionInputChange} value={descVal}></textarea>
            <button type="submit">Submit review</button>
        </form>
    )
}

/*
const Form = ({handleChange,handleSubmit, handleNameInputChange,nameInputValue })=>{
    return(
        <form onSubmit={handleSubmit}>
            <h3>Visited Coffee Shop :</h3><input type="text" name="name" onChange={handleChange} />
            <h3>Username :</h3><input type="text" name="username" onChange={handleChange}/>
            <h3>Description :</h3><textarea name="description" onChange={handleChange}></textarea>
            <button type="submit">Submit review</button>
        </form>
    )
}
*/

export default Form