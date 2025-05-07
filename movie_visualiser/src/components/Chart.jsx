import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function Chart({ data }) {

    let formattedData = data.map((item) => (
        {
            name: item.original_title,
            year: item.release_date.split("-")[0],
            rating: item.vote_average
        }
    ))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="year"
                    name="Release Year"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                />
                <YAxis
                    dataKey="rating"
                    name="IMDb Rating"
                    type="number"
                    domain={[0, 10]}
                />
                <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            const movie = payload[0].payload; // access full data object
                            return (
                                <div className="bg-white text-black p-3 rounded-lg shadow-lg">
                                    <p className="text-red-700 font-bold">{movie.name}</p>
                                    <p>Release Year: {movie.year}</p>
                                    <p>IMDb Rating: {movie.rating}</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />

                <Scatter name="Movies" data={formattedData} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    )
}