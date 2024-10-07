
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState();
  const [favirotes, setFavirotes] = useState(["no quote"]);
  const [favirotesMenu, setFavirotesMenu] = useState(false);



/// Fetching the data ..
  const fetchData = async () => {
    const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
    const data = await response.json();
    setQuote(data[0]); 
  };


useEffect(() => {
  fetchData();
}, []);


///Adding to the favirote....

function addFavi(quote) {
  // Retrieve the existing data from localStorage
  const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Add the new item 
  existingFavorites.push(quote);

  // Storing the updated array back in localStorage
  localStorage.setItem('favorites', JSON.stringify(existingFavorites));

  // console.log(`${quote} has been added to localStorage`);
  allFavi()
}



//Displaying Alll favorite quotes

const allFavi = ()=>{
  setFavirotesMenu(!favirotesMenu)
  const saved = JSON.parse(localStorage.getItem('favorites')) || [];
  setFavirotes(saved)
  // console.log(favirotes);

}


//DELETING 
const deleteFavorite = (index) => {
  const updatedFavorites = favirotes.filter((_, i) => i !== index);
  setFavirotes(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};


  return (
    <>
      <div className='shadow-md shadow-black rounded-lg p-10 '>
          <p>{quote}</p>
      </div>
      <div className='m-5 flex justify-center gap-7 '>
        <button className='text-pink-400 shadow-sm shadow-pink-600  hover:text-pink-900 hover:shadow-pink-700 transition duration-300 ease-in-out'  onClick={()=>{addFavi(quote)}}>Favorite</button>
        <button className='text-blue-400 shadow-sm shadow-blue-600 hover:text-blue-900 hover:shadow-blue-700 transition duration-300 ease-in-out' onClick={fetchData}>Next </button>

      </div>
      <div className='mt-10'>
        <button className='text-orange-400 shadow-sm shadow-orange-600 hover:text-orange-900 hover:shadow-orange-700 transition duration-300 ease-in-out' onClick={allFavi}>Favroties</button>
      </div>
      <div>
      { 
    favirotesMenu &&
    <div>
      { 
        favirotes.map((fav, index) => (
          <p className='shadow-md shadow-black rounded-lg p-4 text-left' key={index}>
            {fav}
            <button onClick={()=>{deleteFavorite(index)}}>Delete</button>
          </p>
        ))
      }
    </div>
  }
      </div>
    </>
  )
}

export default App
