import React,{useState, useEffect} from "react";
import '../style.css';
import Notebook from './Notebook';
function Home()
{
    const [ noteCategory,setNoteCategory ] = useState([]);

   useEffect(()=>{
      fetchCategory();
   },[]);

    const getRandomInt =(max)=>{
      return Math.floor(Math.random() * max);
    };

   const fetchCategory = async () => {
            var tokenData = {};
            tokenData["token"]=window.localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/noteCategory',{ method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(tokenData)});
            const data = await response.json();
            setNoteCategory(data);
   }

    return (

    <div className="main-content">
        <h1>
          Notebooks
          <small>Choose any notebook...</small>
        </h1>
           {
               noteCategory.length>0 && noteCategory.map((value,index2) => {
                   const color = ["","blue","yellow","green"];
                   const skin = ["","ruled","dotted","squared"];

                   return  (
                       <Notebook key={value.categoryName} name={value.categoryName} url={"/storeNote/list/"+value.categoryName} cover={color[getRandomInt(4)]} skin={skin[getRandomInt(4)]}/>
                   )

               })
           }
    </div>);

}


export default Home;
