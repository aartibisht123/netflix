import React ,{useEffect, useRef, useState}from "react";
import './TitleCards.css'


import { Link } from "react-router-dom";




const TitleCards= ({title, category}) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGJkYjIyNTgwZGY4ZjI5NDMzM2UxYWNkYWY5OTljZCIsIm5iZiI6MTc0NTQ4NzQ1OC45NTEsInN1YiI6IjY4MGEwNjYyMTMwZjc2ZWIzYjlkMDVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B-CpM0uEfcYq0mnmBpdHM3JEH1eN3N_oj4lPr22Kuf0'
        }
      };
      
   


useEffect(()=>{

fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    
},[]);

    return(
        <div className="titlecard">
<h2>{title?title:"Popular on Netflix"}</h2>
<div className="card-list" ref={cardsRef}>
    {apiData.map((card, index)=>{
return <div><Link to={`/player/${card.id}`}
 className="card" key={index}>
    <img className="pic"src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
    <p>{card.original_title}</p>
</Link></div>
    })}
</div>
        </div>
    )
}



export default TitleCards;
