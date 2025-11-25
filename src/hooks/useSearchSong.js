import { useState } from "react";
import helpFetch from "../api/apiHelpers";

export default function useSearchSong() {
   const [artist, setArtist] = useState(null);
   const [lyrics, setLyrics] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const search = async ({ artist: artistName, song: songName }) => {
      setLoading(true);
      setError(null);
      setArtist(null);
      setLyrics(null);

      try {
         const artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artistName)}`;
         const lyricsUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artistName)}/${encodeURIComponent(songName)}`;

         const [artistRes, lyricsRes] = await Promise.all([
            helpFetch(artistUrl),
            helpFetch(lyricsUrl)
         ]);
         
         if (artistRes.artists) {
            setArtist(artistRes.artists[0]);
         } else {
            setError((prev) => ({ ...prev, artist: "Artist not found" }));
         }

         if (lyricsRes.lyrics) {
            setLyrics(lyricsRes.lyrics);
         } else {
            setError((prev) => ({ ...prev, song: "Song not found" }));
         }
      } catch (err) {
         setError({ common: "Unexpected error fetching data" });
      } finally {
         setLoading(false);
      }
   };

   return { artist, lyrics, loading, error, search };
}