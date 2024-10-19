import axios from "axios";

const customFetch = axios.create({
    baseURL: "/api/v1",
});
export default customFetch;

// const customFetch = axios.create({
//     baseURL: 'http://localhost:3333/api/v1', // Set to your backend API URL
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default customFetch;