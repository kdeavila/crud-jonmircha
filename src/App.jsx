import CrudApi from "./components/CrudApi/CrudApi";
import CrudApp from "./components/CrudApp/CrudApp";
import SearchSong from "./components/SearchSong/SearchSong";

export default function App() {
   return (
      <main>
         <SearchSong />
         <hr />
         <CrudApi />
         <hr />
         <CrudApp />

         <footer>
            © 2025 – Built with ♥️ by Keyner de Ávila
         </footer>
      </main>
   )
}