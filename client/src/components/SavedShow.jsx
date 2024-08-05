import React from 'react'; // Import React
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'; // Import specific icons from react-icons
import { AiOutlineClose } from 'react-icons/ai';
import { removeMovie } from '../redux/savedMoviesSlice'; // Import removeMovie action
import { PiTelevisionFill } from 'react-icons/pi';
import { MdLocalMovies } from 'react-icons/md';

const SavedShow = () => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies); // Access saved movies from Redux state

  // Function to scroll the slider to the left
  const slideLeft = () => {
    const slider = document.getElementById('slider'); // Access the slider element by its ID
    slider.scrollLeft = slider.scrollLeft - 500; // Adjust scroll position to the left by 500 pixels
  };

  // Function to scroll the slider to the right
  const slideRight = () => {
    const slider = document.getElementById('slider'); // Access the slider element by its ID
    slider.scrollLeft = slider.scrollLeft + 500; // Adjust scroll position to the right by 500 pixels
  };

  // Function to remove a show from saved movies
  const deleteShow = (movieId) => {
    dispatch(removeMovie(movieId)); // Dispatch the removeMovie action
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>Bookmarked Shows</h2> {/* Title for saved shows */}
      <div className='relative flex items-center group'>
        {/* Left arrow for scrolling */}
        <MdChevronLeft
          onClick={slideLeft} // Call slideLeft on click
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id='slider' // ID for the slider
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative custom-scrollbar-hide'
        >
          {/* Map over saved movies to display each item */}
          {savedMovies.map((item) => (
            <div
              key={item.id} // Unique key for each movie item
              className='w-full sm:w-[280px] md:w-[280px] lg:w-[330px] inline-block cursor-pointer relative p-2'
            >
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} // Display movie image
                alt={item?.title} // Alt text for the image
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>
                {/* Close icon to remove a show */}
                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'>
                  <AiOutlineClose />
                </p>
              </div>
              <div className='flex items-center mt-2'>
                {item.media_type === 'movie' ? (
                  <div className='flex items-center'>
                    <MdLocalMovies className='text-white' />
                    <span className='text-white'>Movie</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <PiTelevisionFill className='text-white' />
                    <span className='text-white'>TV</span>
                  </div>
                )}
              </div>
                <ul className='text-white flex gap-4 mr-4'>
                  <li>{item?.title || item?.name}</li>
                </ul>
            </div>
          ))}
        </div>
        {/* Right arrow for scrolling */}
        <MdChevronRight
          onClick={slideRight} // Call slideRight on click
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShow;
