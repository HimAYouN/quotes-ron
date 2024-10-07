
import { useEffect, useState } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';


import './App.css'
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [quote, setQuote] = useState();
  const [favirotes, setFavirotes] = useState(["No Favirotes Added"]);
  const [favirotesMenu, setFavirotesMenu] = useState(false);



/// Fetching the data ..
  const fetchData = async () => {
    const response = await toast.promise(
      fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes"),
      {
        pending: 'Finding Nemo',
        success: 'Here we Go',
        error: 'OPPS! something went wrong'
      },{position: "top-center", autoClose:1000}
  );
    const data = await response.json();
    setQuote(data[0]); 
  };


useEffect(() => {
  fetchData();
}, []);


///Adding to the favirote....
useEffect(() => {
  
}, [favirotes])

function addFavi(quote) {
  toast.success("Added to favorites", { autoClose: 500 , position: "top-center"});

  // Retrieve the existing data from localStorage
  const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Add the new item 
  existingFavorites.push(quote);

  // Storing the updated array back in localStorage
  localStorage.setItem('favorites', JSON.stringify(existingFavorites));

  // console.log(`${quote} has been added to localStorage`);
  const saved = JSON.parse(localStorage.getItem('favorites')) || [];
  setFavirotes(saved)
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
  toast.success("Deleted!", {autoClose:500, position:'top-center'})
  const updatedFavorites = favirotes.filter((_, i) => i !== index);
  setFavirotes(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};


  return (
    <>
      <div className='shadow-md shadow-black rounded-lg p-10 backdrop-blur-md mt-20'>
          <p>{quote}</p>
      </div>
      <div className='m-5 flex justify-center gap-7 '>
        <button className='text-pink-400 shadow-sm shadow-pink-600  hover:text-pink-900 hover:shadow-pink-700 transition duration-300 ease-in-out'  onClick={()=>{addFavi(quote)}}><MdFavoriteBorder /></button>
        <button className='text-blue-400 shadow-sm shadow-blue-600 hover:text-blue-900 hover:shadow-blue-700 transition duration-300 ease-in-out' onClick={fetchData}><MdNavigateNext /> </button>
      </div>
      <div className='mt-10'>
        <button className='text-orange-400 shadow-sm shadow-orange-600 hover:text-orange-900 hover:shadow-orange-700 transition duration-300 ease-in-out' onClick={allFavi}>Favorites</button>
      </div>
      <div>
      { 
    favirotesMenu &&
    <div>
      { 
        favirotes.map((fav, index) => (
          <div className='shadow-md shadow-black rounded-lg p-4 text-left flex justify-between ' key={index}>
            <p  > {fav}</p>
            <button onClick={()=>{deleteFavorite(index)}}>Delete</button>
          </div>
        ))
      }
    </div>
  }
      </div>
      <ToastContainer/>
    </>
  )
}

export default App
