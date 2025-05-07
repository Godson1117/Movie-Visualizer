import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const movie = payload[0].payload;
        return (
            <div className="bg-black/70 text-white p-2 border-white/20 rounded border shadow-lg">
                <p className="text-red-700 font-bold">{movie.name}</p>
                <p>Rating: {movie.Rating}</p>
            </div>
        );
    }

    return null;
};



export default function MovieChart({ data }) {
    const chartData = data.map((movie) => ({
        name: movie.title.slice(0, 10),
        Rating: movie.vote_average.toFixed(2),
    })).sort((a,b)=>a.Rating - b.Rating);

    return (
        <div className="h-96 mt-8 w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    {/*<XAxis dataKey="name" stroke="#ccc" angle={-45} textAnchor="end" />*/}
                    <XAxis
                        dataKey="name"
                        stroke="#ccc"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={90}
                        
                    />

                    <YAxis domain={[0, 10]} stroke="#ccc" ticks={[0, 2, 4, 6, 8, 10]} />
                    <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} content={<CustomTooltip />} />
                    <Bar dataKey="Rating" fill="#a569bd" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}
