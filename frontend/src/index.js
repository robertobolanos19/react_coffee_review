import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

axios.get('http://localhost:3001/coffeeShops').then(response => {
  const shops = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App shops={shops} />)
  console.log('No issues with connecting to frontend folder!')
  console.log(shops)
})
.catch(error => {
  console.log('There was an error!')
  console.log(error.message)
})