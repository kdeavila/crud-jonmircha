export default function SearchSongLyrics({ lyrics, song }) {
   return (
      <article>
         <h2>{song.toUpperCase()}</h2>
         <blockquote style={{ whiteSpace: "pre-wrap" }}>
            {lyrics}
         </blockquote>
      </article>
   );
}