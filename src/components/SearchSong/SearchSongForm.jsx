import { useState } from "react";

const initialForm = {
   artist: "",
   song: ""
}
const errorStyles = {
   fontSize: "15px",
   color: "red",
   textAlign: "center"
}

export default function SearchSongForm({ handleSearch }) {
   const [formData, setFormData] = useState(initialForm);
   const [error, setError] = useState(null);

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!formData.artist) {
         setError("Artist is required");
         return;
      }

      if (!formData.song) {
         setError("Song is required");
         return;
      }

      handleSearch(formData);
   }

   const handleReset = () => {
      setFormData(initialForm);
   }

   const handlechange = (e) => {
      setError(null);
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   return (
      <form>
         {error && (
            <p style={errorStyles}>
               {error}
            </p>
         )}

         <div>
            <label htmlFor="artist">Artist name:</label>
            <input
               value={formData.artist}
               onChange={handlechange}
               id="artist"
               name="artist"
               placeholder="Shakira, Travis Scott..."
               type="text"
            />
         </div>

         <div>
            <label htmlFor="song">Song name:</label>
            <input
               value={formData.song}
               onChange={handlechange}
               id="song"
               name="song"
               type="text"
               placeholder="Highest in the room..."
            />
         </div>

         <div>
            <button
               type="reset"
               onClick={handleReset}
            >
               Reset
            </button>

            <button
               type="submit"
               onClick={handleSubmit}
            >
               Search
            </button>
         </div>
      </form>
   );
}