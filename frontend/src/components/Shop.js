const Shop = ({shop,amountOfShops,del})=>
{
    return(
        <>
        <div>
            <li className="shop">
                <h3>Coffee Shop: {shop.name}</h3>
                <h3>Review from {shop.username}: {shop.description}</h3>
                <button onClick={()=>del(shop)}>Delete review</button>
            </li>
            <h3>Star Rating: {shop.stars}</h3>
        </div>

        </>
    )
}

export default Shop