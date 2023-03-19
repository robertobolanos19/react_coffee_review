import { useState,useEffect } from 'react';
import './App.css';
import shopServices from "./services/shops.js"
import StarRating from "./components/StarRating";
//<StarRating/>
import Shop from './components/Shop';
import Form from './components/Form';

const App = () =>
{
  const [shops,updateShops]=useState([])
  const [showAll,setShowAll]=useState(true)
  const [newDetails,setDetails]=useState({
    name:"",
    username:"",
    description:"",
    stars:1,
  })

  useEffect(()=>{
    shopServices.getAll()
    .then(initialShops => {
      updateShops(initialShops)
    })
  })

  

  const shopsToShow = showAll?shops:shops.filter(shop=> shop.star >=3) 
  //*this useEffect is being used to get all the data by using the imported shopServices.get() method
  //*if its successful then the data is passed into initialShops, it then updates the updateShops value and sets the new 
  //*values into shops since updateShops(initialShops) is used to update the current value

  //*
  const handleChange= (e)=>{
    //console.log(e.target)
    const {name,value}=e.target
    // const name = e.target.name
    // const value = e.target.value
    // const infoObject = {name,value}
    // console.log(infoObject)
    setDetails((previousValue)=>{
      return {...previousValue, [name]:value}
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(newDetails)

    if(shops.map((s)=>s.username.toLowerCase()).includes(newDetails.username.toLowerCase())
      &&shops.map((s)=>s.name.toLowerCase()).includes(newDetails.name.toLowerCase()))
    {
      window.confirm(`${newDetails.username} has already left a review for ${newDetails.name}, replace old review?`)
      &&
      shopServices
      .update(shops.filter(shop=>shop.username === newDetails.username)[0].id,newDetails)
      .then(response=>{
        shopServices.getAll()
        .then(response=>{
          updateShops(response)
          setDetails({})
        })
      })
      .catch(error=>{
        console.log(error)
      })
      return
    }

    shopServices.create(newDetails)
    .then(returnedDetails=>{
      console.log(returnedDetails)
      updateShops(shops.concat(returnedDetails))
      setDetails({
        name:"",
        username:"",
        description:"",
        stars:1
      })
    })
  }

  return (
    <>
    <h1>Coffee Shops!</h1>
    <h3>Here are some reviewed coffee shops</h3>
    <ul>
      {shopsToShow.map(shop => <Shop key={shop.id} shop={shop}/>)}
    </ul>
    <Form
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    />
    </>
  )







  // //*handleSubmit is being used for when a user enters a submission via the input field.
  // const handleSubmit = (e)=>{
  //   //*we use e.preventDefault to prevent the page from reloading when we submit.
  //   e.preventDefault()
  //   //*we are creating a new object based on the user input which we will then we saving later in this function.
  //   const shopObject = 
  //   {
  //     name:newShop,
  //     stars:1,
  //     wifi:true,
  //     user:newUserName
  //   }
  //   /*
  //   this if-statement is based on if the value is true or not. 
  //   the value we are checking if its true or not is based on shop.map.include
  //   we first map all the shops with s as the parameter and then save all the s.name's
  //   then we check if any name match newShop and newUserName using the includes method.
  //   if its true it means there is a match and the if-statement is executed, if not we continue pass this statements.
  //   */
  //   if(shops.map((s)=>s.name).includes(newShop)&&shops.map((s)=>s.user).includes(newUserName))
  //   {
  //     window.confirm(`${newUserName} has already made a review for ${newShop}`)&&
  //     shopServices
  //     .update(shops.filter(s=>s.name === newShop)[0].id, shopObject)
  //     .then(response=>{
  //       shopServices.getAll()
  //       .then(response=>{
  //         updateShops(response)
  //         setNewShop('')
  //         setNewUser('')
  //       })
  //     })
  //     return
  //   }

  //   shopServices.create(shopObject)
  //   .then(returnedShop=>{
  //     updateShops(shops.concat(returnedShop))
  //     setNewShop('')
  //     setNewUser('')
  //   })
  // }

  // const addShop = (e)=> {
  //   e.preventDefault()
  //   const shopObject = 
  //   {
  //     name:newShop,
  //     stars:1,
  //     wifi:true
  //   }
  //   shopServices.create(shopObject)
  //   .then(returnedShop=>{
  //     updateShops(shops.concat(returnedShop))
  //     setNewShop('')
  //   })
  // }

  // const handleShopNameInput = (e) =>{
  //   setNewShop(e.target.value)
  // }

  // const handleUserNameInput = (e)=>{
  //   setNewUser(e.target.value)
  // }


}

export default App;

// import './App.css';
// import { useState,useEffect } from 'react';
// import shopsService from './services/shops';
// import Shop from './components/Shop';
// import StarRating from './components/StarRating';

// function App() {
//   const [shops,updateShops]=useState([])
//   const [newShopName, setNewShop]=useState('')
//   const [addStars, setNewStars]=useState(0)
//   const [showAll,setShowAll]=useState(true)
//   const [errorMessage,setErrorMessage]=useState(null)
//   const shopsLength = shops.length
//   // const shopsLength = shops.map(shop=>shop)
//   // console.log(shopsLength)

//   const shopsToShow = 
//   showAll
//   shops
//   :
//   shops.filter(shop => shop.wifi === true) 

//   useEffect(()=>{
//     shopsService.getAll()
//     .then(initialShops =>{
//       updateShops(initialShops)
//     })
//   },[])

//   const addShop = (e)=>
//   {
//     e.preventDefault()
//     const shopObject = {
//       name:newShopName,
//       stars:addStars,
//     }
//   }

//   const handleInputChange = (e)=>{
//     setNewShop(e.target.value)
//   }

//   return (
//     <>
//       <h1>Coffee Shops!</h1>
//       <h3>Here are some reviewed coffee shops</h3>
//       <button onClick={()=> setShowAll(!showAll)}>
//         Show coffee shops with free-wifi
//       </button>
//       <ul>
//         {shopsToShow.map(shop =>
//           <Shop key={shop.id} shop={shop} amountOfShops={shopsLength}/>,
//           <StarRating key={shops.id}/>
//         )}
        
//       </ul>
//       <form onSubmit={addShop}>
//         <input/>
//       </form>
//     </>
//   );
// }

// export default App;

