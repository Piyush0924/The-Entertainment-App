import React from 'react';
import Row from '../components/Row'; // Import the Row component for displaying a list of movies or TV shows
import requests from '../Requests'; // Import the requests object which contains URLs for API requests
import Trending from '../components/Trending'; // Import the Trending component for displaying trending TV shows or movies

function Home() {
  return (
    <>
      {/* Trending section - shows trending movies or TV shows */}
      <Trending rowID='1' title='Trending' fetchURL={requests.requestTrending} />
      
      {/* Recommended for you section - displays recommended movies based on user preferences */}
      <Row rowID='2' title='Recommended for you' fetchURL={requests.requestTopRatedmovie} />
      
      {/* Top Rated section - shows top-rated movies or TV shows */}
      {/* <Row rowID='3' title='Top Rated' fetchURL={requests.requestTopRatedtv} /> */}
    </>
  );
}

export default React.memo(Home); // Wrap the Home component in React.memo to optimize performance by preventing unnecessary re-renders
