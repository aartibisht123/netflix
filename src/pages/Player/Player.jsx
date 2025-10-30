import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGJkYjIyNTgwZGY4ZjI5NDMzM2UxYWNkYWY5OTljZCIsIm5iZiI6MTc0NTQ4NzQ1OC45NTEsInN1YiI6IjY4MGEwNjYyMTMwZjc2ZWIzYjlkMDVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B-CpM0uEfcYq0mnmBpdHM3JEH1eN3N_oj4lPr22Kuf0",
    },
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          setError("No videos found for this movie.");
          return;
        }

        // ✅ Find the first YouTube trailer or teaser
        const trailer = data.results.find(
          (vid) =>
            vid.site === "YouTube" &&
            (vid.type === "Trailer" || vid.type === "Teaser")
        );

        if (trailer) {
          setApiData(trailer);
        } else {
          setError("No YouTube trailer available for this movie.");
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to load trailer. Please try again.");
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Go Back"
        className="back-btn"
        onClick={() => navigate(-1)}
      />

      {apiData && apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: "white", marginTop: "20px" }}>
          {error || "Loading trailer..."}
        </p>
      )}

      {apiData && (
        <div className="player_info">
          <p>{apiData.published_at?.slice(0, 10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      )}
    </div>
  );
};

export default Player;


// import React, { useEffect, useState } from "react";
// import './Player.css'
// import back_arrow_icon from '../../assets/back_arrow_icon.png'
// import { useNavigate, useParams } from "react-router-dom";
// const Player = () => {

//     const {id} = useParams();
//     const navigate = useNavigate();

// const [apiData, setApiData] = useState({
//     name:  "",
//     key: "",
//     published_at: "",
//     typeof: ""

// })

//     const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGJkYjIyNTgwZGY4ZjI5NDMzM2UxYWNkYWY5OTljZCIsIm5iZiI6MTc0NTQ4NzQ1OC45NTEsInN1YiI6IjY4MGEwNjYyMTMwZjc2ZWIzYjlkMDVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B-CpM0uEfcYq0mnmBpdHM3JEH1eN3N_oj4lPr22Kuf0'
//         }
//       };

//       useEffect(()=>{
//         fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
//         .then(res => res.json())
//         .then(res => setApiData(res.results[0]))
//         .catch(err => console.error(err));

//       },[])
      
//       fetch('https://api.themoviedb.org/3/movie/1197306/videos?language=en-US', options)
//         .then(res => res.json())
//         .then(res => console.log(res))
//         .catch(err => console.error(err));






//     return(
//         <div className="player"> 
// <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
// <iframe width='90%' height='90%'src={`https://www.youtube.com/embed/${apiData.key}`}title='trailer' frameborder="0" allowFullScreen></iframe>

// <div className="player_info">
//     <p>{apiData.published_at.slice(0,10)}</p>
//     <p>{apiData.name}</p>
//     <p>{apiData.type}</p>
// </div>
//         </div>
//     )
// }

// export default Player
