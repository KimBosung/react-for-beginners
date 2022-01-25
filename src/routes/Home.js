import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
    const [loading, setLoding] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimun_rating=8.8&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setLoding(false);
    }
    useEffect(() => {
        getMovies();
        console.log("ready");
    }, []);

    return (
        <div>
            {loading ? (
                <h1>Loding...</h1>
            ) : (
                <div>
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                            genres={movie.genres} />
                    ))}
                </div>
            )}
        </div >
    );
}

export default Home;