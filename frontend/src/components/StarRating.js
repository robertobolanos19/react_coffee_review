import { useState } from "react";
import {FaStar} from 'react-icons/fa'

const StarRating = ({onClick,starVal})=>{

    const [hover,setHover]=useState(null)

    return(
        <div>
            <h4>Leave a star rating!:</h4>
            {[...Array(5)].map((star,i)=>{
                const ratingValue = i+1
                return(
                    <label key={ratingValue}>
                        <input
                        key={ratingValue}
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={onClick}
                        />
                        <FaStar 
                        className="star"
                        color={ratingValue<=(hover||starVal)?"yellow":"gray"}
                        size="50px"
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