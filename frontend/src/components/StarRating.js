import { useState } from "react";
import {FaStar} from 'react-icons/fa'

const StarRating = ()=>{

    const [rating,setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return(
        <div>
            <h4>Have you visiting this coffee shop before? Leave a rating!</h4>
            {[...Array(5)].map((star, i)=>
            { 
                const ratingValue = i+1;
                return(
                    <label>
                        <input 
                        type="radio" 
                        name='rating' 
                        value={ratingValue} 
                        onClick={()=>setRating(ratingValue)}
                        />
                         <FaStar 
                         className="star" 
                         color={ratingValue <= (hover || rating) ? "yellow" : "gray"} size="50px"
                         onMouseEnter={()=>setHover(ratingValue)}
                         onMouseLeave={()=>setHover(null)}
                         />
                    </label>
                )
            })}
        </div>
    )
}

export default StarRating