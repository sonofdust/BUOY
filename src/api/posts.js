import axios from "axios";
// To run the server:
// npx json-server -p 3500 -w data/db.json
export default axios.create({baseURL: "http://localhost:3500"});
