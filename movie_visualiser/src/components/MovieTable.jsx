import Card from "./Card";
import { useState } from "react";

export default function MovieTable({ data }) {
    const [display, setDisplay] = useState(false);
    const [movieId, setMovieId] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return "";
        return sortConfig.direction === "asc" ? "⬆️" : "⬇️";
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    return (
        <div className="border-white/20 bg-white/5 overflow-x-auto rounded-xl border shadow-2xl backdrop-blur-sm">
            <table className="text-white min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-white/10 text-blue-400 text-sm uppercase">
                        <th
                            className="px-4 py-3 border-white/20 cursor-pointer select-none border-b text-left"
                            onClick={() => handleSort("title")}
                        >
                            Title {getSortIcon("title")}
                        </th>
                        <th
                            className="px-4 py-3 border-white/20 cursor-pointer select-none border-b text-left"
                            onClick={() => handleSort("vote_average")}
                        >
                            Rating {getSortIcon("vote_average")}
                        </th>
                        <th
                            className="px-4 py-3 border-white/20 cursor-pointer select-none border-b text-left"
                            onClick={() => handleSort("release_date")}
                        >
                            Release Date {getSortIcon("release_date")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((movie, index) => (
                        <tr
                            key={movie.id}
                            className={`${index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                                } hover:bg-blue-900/30 transition duration-200 cursor-pointer`}
                        >
                            <td
                                className="px-4 py-3 border-white/10 border-b"
                                onClick={() => {
                                    setMovieId(movie.id);
                                    setDisplay(true);
                                }}
                            >
                                {movie.title}
                            </td>
                            <td className="px-4 py-3 border-white/10 border-b">{movie.vote_average}</td>
                            <td className="px-4 py-3 border-white/10 border-b">{movie.release_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {display && <Card display={display} setDisplay={setDisplay} movieId={movieId} />}
        </div>
    );
}
