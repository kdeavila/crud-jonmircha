import "./SearchSong.css"

import SearchSongForm from "./SearchSongForm"
import SearchSongLyrics from "./SearchSongLyrics"
import SearchSongArtist from "./SearchSongArtist"
import useSearchSong from "../../hooks/useSearchSong"
import Loader from "../CrudApi/Loader"
import { useState } from "react"

export default function SearchSong() {
   const { artist, lyrics, loading, error, search } = useSearchSong();
   const [songName, setSongName] = useState("");

   const handleSearch = (data) => {
      search(data);
      setSongName(data.song);
   }

   return (
      <section>
         <h2>SEARCH ARTISTS AND SONGS</h2>
         <hr />

         <SearchSongForm handleSearch={handleSearch} />

         <section className="grid">
            {loading && <Loader />}
            {error?.artist && <p>{error.artist}</p>}
            {artist && <SearchSongArtist artist={artist} />}
            {error?.song && <p>{error.song}</p>}
            {lyrics && <SearchSongLyrics lyrics={lyrics} song={songName} />}
         </section>
      </section>
   );
}