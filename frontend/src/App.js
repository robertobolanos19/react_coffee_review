import { useState,useEffect } from 'react';
import './App.css';
import shopServices from "./services/shops.js"
import StarRating from "./components/StarRating";
//<StarRating/>
import Shop from './components/Shop';
import Form from './components/Form';
import Notification from './components/Notification';

const App = () =>
{
  const [shops,updateShops]=useState([])
  const [showAll,setShowAll]=useState(true)
  //*inputs
  const [nameInputField,setNameInputField]=useState('')
  const [userNameInputField,setUsernameInputField]=useState('')
  const [descriptionInputField,setDescriptionInputField]=useState('')
  const [starsInputField, setStarsInputField]=useState(null)
  //*notifcations 
  const [notification, setNotification]=useState(null)
  //*if notification type === 'error' new style is added through Notification, else success is added
  //*if notification type === null then no style is added
  const [notificationType,setNotificationType]=useState(null)
  
  const handleNameInputChange=(e)=>{
    setNameInputField(e.target.value)
  }

  const handleUsernameInputChange=(e)=>{
    setUsernameInputField(e.target.value)
  }

  const handleDescriptionInputChange=(e)=>{
    setDescriptionInputField(e.target.value)
  }

  const handleStarInputChange=(e)=>{
    setStarsInputField(e.target.value)
  }

  const handleDeleteShop = (shop)=>{
    window.confirm(`Delete ${shop.name}?`)
    &&shopServices.deleteShop(shop.id)
    .then(response=>{
      updateShops(shops.filter(s=>s.id !== shop.id))
      setNotification(`${nameInputField} has just been deleted!`)
          setNotificationType(null)
          setTimeout(()=>{
            setNotification(null)
      },5000)
    })
    .catch(response=> {
      setNotificationType('error')
        setNotification(`${nameInputField} can't be deleted since it was already deleted`)
        setTimeout(()=>{
          setNotification(null)
        },5000)
    })
  }

  useEffect(()=>{
    shopServices.getAll()
    .then(initialShops => {
      updateShops(initialShops)
    })
  },[])

  

  const shopsToShow = showAll?shops:shops.filter(shop=> shop.star >=3) 
  //*this useEffect is being used to get all the data by using the imported shopServices.get() method
  //*if its successful then the data is passed into initialShops, it then updates the updateShops value and sets the new 
  //*values into shops since updateShops(initialShops) is used to update the current value

  const handleSubmit = (e)=>{
    e.preventDefault()
   // console.log(newDetails)
   const shopObject = {
      name:nameInputField,
      username:userNameInputField,
      description:descriptionInputField,
      stars:starsInputField
   }
    if(shops.map((s)=>s.name).includes(nameInputField)
      &&shops.map((s)=>s.username).includes(userNameInputField))
    {
      window.confirm(`${userNameInputField} has already left a review for ${nameInputField}, replace old review?`)
      &&
      shopServices
      .update(shops.filter(shop=>shop.username === userNameInputField)[0].id, shopObject)
      .then(response => {
        shopServices.getAll()
        .then(response => {
          updateShops(response)
          setNameInputField('')
          setUsernameInputField('')
          setDescriptionInputField('')
          setStarsInputField(null)

          setNotification(`Changed the review for ${nameInputField}!`)
          setNotificationType(null)
          setTimeout(()=>{
            setNotification(null)
          },5000)
        })
      })
      .catch(error=>{
        console.log(error)
        setNotificationType('error')
        setNotification(`${nameInputField} was already deleted`)
        setTimeout(()=>{
          setNotification(null)
        },5000)
      })
      return
    }
    else if(nameInputField===""||userNameInputField===""||descriptionInputField==="")
    {
      setNotificationType('error')
        setNotification('All fields must be used')
        setTimeout(()=>{
          setNotification(null)
      },5000)
      return
    }
    shopServices.create(shopObject)
    .then(returnedShop=>{
      updateShops(shops.concat(returnedShop))
      setNameInputField('')
      setUsernameInputField('')
      setDescriptionInputField('')
      setStarsInputField(null)
      setNotificationType('success')
        setNotification(`${nameInputField}'s review has been added!`)
        setTimeout(()=>{
          setNotification(null)
        },5000)
    })
  }

  return (
    <>
    <h1>Coffee Shops!</h1>
    <h3>Here are some reviewed coffee shops</h3>
    <ul>
      {shopsToShow.map(shop => <Shop key={shop.id} shop={shop} del={handleDeleteShop}/>)}
    </ul>
    <Notification message={notification} type={notificationType}/>
    <Form
    handleNameInputChange={handleNameInputChange}
    nameVal={nameInputField}
    handleDescriptionInputChange={handleDescriptionInputChange}
    descVal={descriptionInputField}
    handleUsernameInputChange={handleUsernameInputChange}
    usernameVal={userNameInputField}
    handleSubmit={handleSubmit}
    handleStarInputChange={handleStarInputChange}
    starVal={starsInputField}
    />
    </>
  )
}

export default App;
