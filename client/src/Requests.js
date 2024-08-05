
const key = 'eb9e79328c96ae3c8b25a9cf788bfd67'//from the tmdb after the signup
//for authorization
export {key} 

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page={page}`,
    requestTopRatedmovie: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestMovie: `https://api.themoviedb.org/3/movie/?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=2`,
    requestComedy: `https://api.themoviedb.org/3/movie/multi?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
     requestUpcoming: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`,
    requesttvshows:`https://api.themoviedb.org/3/trending/tv/day?api_key=${key}&language=en-US&page=1`,
    requestTopRatedtv:`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`
  };

  
  


  export default requests

