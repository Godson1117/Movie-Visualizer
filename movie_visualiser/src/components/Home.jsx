import MovieChart from "./MovieChart";
import MovieTable from "./MovieTable";
import { useState, useEffect } from "react";
import axios from "axios";
import options from "../config";
import Chart from "./Chart";
import { PuffLoader } from "react-spinners";

export default function Home() {
    const [allMovies, setAllMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [uiPage, setUiPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 20;

    const fetchMoviesFromApi = async (apiPage) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${apiPage}`,
                options
            );
            console.log(response)

            setTotalResults(response.data.total_results);

            setAllMovies((prev) => {
                const newMovies = response.data.results.filter(
                    (newMovie) => !prev.some((existing) => existing.id === newMovie.id)
                );
                return [...prev, ...newMovies];
            });
        } catch (err) {
            console.error("Failed to fetch movies", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoviesFromApi(1);
    }, []);

    useEffect(() => {
        const totalFetched = allMovies.length;
        const requiredEndIndex = uiPage * itemsPerPage;
        if (totalFetched < requiredEndIndex) {
            const apiPage = Math.ceil(requiredEndIndex / 20);
            fetchMoviesFromApi(apiPage);
        }
    }, [uiPage]);

    const startIndex = (uiPage - 1) * itemsPerPage;
    const currentMovies = allMovies.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = 500;

    return (
        <div className="p-6 bg-black text-white relative min-h-screen font-sans">
            {loading && (
                <div className="inset-0 bg-black fixed z-50 flex items-center justify-center bg-opacity-70">
                    <PuffLoader color="#ff0000" size={100} />
                </div>
            )}

            <h1 className="mb-8 text-transparent from-pink-500 via-purple-500 to-indigo-500 bg-gradient-to-r bg-clip-text text-center text-5xl font-extrabold drop-shadow-lg">
                🎬 Popular Movies
            </h1>

            <div className="mt-10 bg-white/10 p-6 border-white/20 rounded-2xl border shadow-2xl backdrop-blur-md transition hover:scale-[1.01]">
                <h2 className="mb-4 text-yellow-300 text-xl font-bold tracking-wide">
                    📋 Movie Table
                </h2>
                <MovieTable data={currentMovies} />
            </div>

            <div className="bg-white/10 p-4 border-white/20 mt-5 height rounded-2xl border shadow-2xl backdrop-blur-md transition hover:scale-[1.02]">
                <h2 className="mb-2 text-green-300 text-xl font-bold tracking-wide">
                    ⭐ Ratings of Top Movies
                </h2>
                <MovieChart data={currentMovies} />
            </div>

            <div className="bg-white/10 p-4 border-white/20 mt-5 rounded-2xl border shadow-2xl backdrop-blur-md transition hover:scale-[1.02]">
                <h2 className="mb-2 text-cyan-300 text-xl font-bold tracking-wide">
                    📊 Rating vs Year
                </h2>
                <Chart data={currentMovies} />
            </div>

            <div className="mt-10 space-x-4 flex justify-center">
                <button
                    onClick={() => setUiPage((p) => Math.max(p - 1, 1))}
                    disabled={uiPage === 1}
                    className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 text-white font-semibold transition transform hover:scale-105 disabled:opacity-30"
                >
                    ← Prev
                </button>
                <span className="px-4 py-2 text-white/80 font-semibold tracking-wide">
                    Page {uiPage} of {totalPages}
                </span>
                <button
                    onClick={() => setUiPage((p) => p + 1)}
                    disabled={uiPage === totalPages}
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-white font-semibold transition transform hover:scale-105 disabled:opacity-30"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
