
import React, { useEffect, useState } from "react";
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom";
const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate();

const [apiData, setApiData] = useState({
    name:  "",
    key: "",
    published_at: "",
    typeof: ""

})

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGJkYjIyNTgwZGY4ZjI5NDMzM2UxYWNkYWY5OTljZCIsIm5iZiI6MTc0NTQ4NzQ1OC45NTEsInN1YiI6IjY4MGEwNjYyMTMwZjc2ZWIzYjlkMDVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B-CpM0uEfcYq0mnmBpdHM3JEH1eN3N_oj4lPr22Kuf0'
        }
      };

      useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));

      },[])
      
      fetch('https://api.themoviedb.org/3/movie/1197306/videos?language=en-US', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));






    return(
        <div className="player"> 
<img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
<iframe width='90%' height='90%'src={`https://www.youtube.com/embed/${apiData.key}`}title='trailer' frameborder="0" allowFullScreen></iframe>

<div className="player_info">
    <p>{apiData.published_at.slice(0,10)}</p>
    <p>{apiData.name}</p>
    <p>{apiData.type}</p>
</div>
        </div>
    )
}

export default Player
