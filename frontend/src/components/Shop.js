const Shop = ({shop,amountOfShops,del})=>
{
    return(
        <>
        <div>
            <li className="shop">
                <h3>Coffee Shop:{shop.name}</h3>
                <button onClick={()=>del(shop)}>Delete review</button>
            </li>
            <h3>Rating: {shop.stars}</h3>
        </div>

        </>
    )
}

export default Shop