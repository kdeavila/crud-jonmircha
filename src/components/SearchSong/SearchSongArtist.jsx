export default function SearchSongArtist({ artist }) {
   return (
      <article>
         <h2>{artist.strArtist}</h2>
         <img
            src={artist.strArtistThumb}
            alt={artist.strArtist}
            style={{ maxWidth: "100%" }}
         />
         <p>{artist.strBiographyEN}</p>
      </article>
   );
}