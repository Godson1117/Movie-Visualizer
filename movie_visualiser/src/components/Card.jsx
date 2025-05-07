import axios from "axios";
import { useEffect, useState } from "react";
import options from '../config'

const Card = ({ display, setDisplay, movieId }) => {

    const [data, setData] = useState({})

    useEffect(() => {
        async function fetchDetails() {
            let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            setData(res.data)
            console.log(data)
        }

        fetchDetails()
    }, []);


    return (

        <div className="inset-0 bg-black/70 fixed z-50 flex items-center justify-center">
            <div className="w-80 p-4 border-white/30 bg-white/10 text-white animate-scaleIn relative rounded-2xl border shadow-xl backdrop-blur-md">
                <button
                    className="top-2 right-2 absolute hover:scale-110"
                    onClick={() => setDisplay(false)}
                >
                    ❌
                </button>

                <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt={data.original_title}
                    className="mb-4 h-48 w-full rounded-xl object-cover"
                />

                <h2 className="mb-1 text-xl font-bold">{data.original_title}</h2>

                <div className="mb-2 text-yellow-400 bg-white/20 px-3 py-1 inline-block rounded-full text-sm font-semibold backdrop-blur-sm">
                    ⭐ IMDb: {data.vote_average}
                </div>

                <p className="text-white/80 text-sm">{data.overview}</p>
            </div>
        </div>

    );
};

export default Card;
