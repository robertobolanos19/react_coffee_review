const Form = ({handleChange,handleSubmit})=>{
    return(
        <form onSubmit={handleSubmit}>
            <h3>Visited Coffee Shop :</h3><input type="text" name="name" onChange={handleChange}/>
            <h3>Username :</h3><input type="text" name="username" onChange={handleChange}/>
            <h3>Description :</h3><textarea name="description" onChange={handleChange}></textarea>
            <button type="submit">Submit review</button>
        </form>
    )
}

export default Form