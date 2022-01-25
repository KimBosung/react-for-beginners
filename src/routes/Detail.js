import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
function Detail() {
    const { id } = useParams();
    const [loading, setLoding] = useState(true);
    const [movie, setMovie] = useState([]);
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoding(false);
    };
    useEffect(() => {
        getMovie();
    }, [])
    return (<div>
        {loading ? (
            <h1>Loding...</h1>
        ) : (
            <div id={movie.id}>
                <img src={movie.medium_cover_image} />
                <h2>{movie.title_long}</h2>
                <p>평점: {movie.rating} 길이: {movie.runtime}</p>
                <ul>카테고리
                    {movie.genres.map((g) => (
                        <li key={g}>{g}</li>
                    ))}
                </ul>
                <p>내용: {movie.description_full}</p>
                <Link to={"/"}>Go Home</Link>
            </div>
        )}
    </div >);
}

export default Detail;