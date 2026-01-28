// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const MyListings = () => {
//      // const live = import.meta.env.VITE_API_BASE_URL;
//     const live = 'http://localhost:3000';
//     const [listing, setListing] = useState([]);
//     const [name, setName] = useState('')

//     const token = localStorage.getItem('token');
    
//     useEffect(() => {
//         async function fetchListing(){
//             const result = await axios.get(`${live}/api/property/my_listings`, {
//                 params: {token: token}
//             })
//             setName(result.data.username);
//         }
//     }, [])

//   return (
//     <div>{name}</div>
//   )
// }

// export default MyListings