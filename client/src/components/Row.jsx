import axios from 'axios'; // Import axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Import React and its hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { MdLocalMovies } from 'react-icons/md'; // Import specific icons from react-icons
import { PiTelevisionFill } from 'react-icons/pi';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { addMovie, removeMovie } from '../redux/savedMoviesSlice'; // Import Redux actions

function Row({ title, fetchURL }) {
  const [movies, setMovies] = useState([]); // State to hold fetched movies
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies); // Access saved movies from Redux state

  // useEffect to fetch movie data when the component mounts or when fetchURL changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchURL); // Fetch data from the provided URL
        const results = response.data.results.map((item) => ({
          ...item,
          media_type: item.media_type || (item.name ? 'tv' : 'movie'), // Determine media type
        }));
        setMovies(results); // Set the fetched movies to the state
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      }
    };

    fetchData(); // Call the fetchData function
  }, [fetchURL]);

  // Handle navigation to movie or TV show details
  const handleClick = (id, media_Type) => {
    navigate(`/${media_Type}/${id}`); // Navigate to the detail page based on media type and ID
  };

  // Handle saving or removing a show
  const saveShow = (movie) => {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id); // Check if the movie is already saved
    if (isSaved) {
      dispatch(removeMovie(movie.id)); // Remove movie from saved movies if it is already saved
    } else {
      dispatch(addMovie(movie)); // Add movie to saved movies if it is not saved
    }
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2> {/* Row title */}
      <div className='relative flex flex-wrap flex-grow items-center p-4 '>
        <div id='slider' className="flex flex-wrap gap-4">
          {movies.map((item) => (
            <div
              key={item.id}
              className='w-[260px] md:w-[340px] lg:w-[330px] gap-4 inline-block cursor-pointer relative p-2'
              onClick={() => handleClick(item.id, item.media_type)}
            >
              {item.backdrop_path ? (
                <img
                  className='w-full h-35 md:h-40 lg:h-45 object-cover block object-top rounded-sm md:rounded-sm lg:rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt={item.title || item.name}
                />
              ) : (
                <img
                  className='w-full h-35 md:h-40 lg:h-45 block object-cover object-top rounded-sm md:rounded-sm lg:rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title || item.name}
                />
              )}
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item.title || item.name}
                </p>
                <p onClick={(e) => { e.stopPropagation(); saveShow(item); }}>
                  {savedMovies.some((savedMovie) => savedMovie.id === item.id) ? (
                    <IoBookmark className='absolute top-4 right-6 text-gray-300' />
                  ) : (
                    <IoBookmarkOutline className='absolute top-4 right-6 text-gray-300' />
                  )}
                </p>
              </div>
              <div className='flex flex-col mt-2 text-md text-white mx-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div>{item.media_type === 'movie' ? item.release_date : item.first_air_date}</div>
                  {item.media_type === 'movie' ? (
                    <>
                      <MdLocalMovies  />
                      <span >Movie</span>
                    </>
                  ) : (
                    <>
                      <PiTelevisionFill className='text-white' />
                      <span className='text-white'>TV Series</span>
                    </>
                  )}
                </div>
                <div className='truncate'>{item.title || item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Row;
