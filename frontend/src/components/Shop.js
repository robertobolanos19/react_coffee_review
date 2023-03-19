// import StarRating from "./StarRating"
// import {rating} from "./StarRating"
//        <div><StarRating/></div>

const Shop = ({shop,amountOfShops})=>
{
    return(
        <>
        <div>
            <li className="shop">
                <h3>Coffee Shop:{shop.name}</h3>
            </li>
            <h3>Rating: {shop.stars}</h3>
        </div>

        </>
    )
}

export default Shop