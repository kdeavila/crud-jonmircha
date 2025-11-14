import { CrudApi } from "./components/CrudApi/CrudApi"
import CrudApp from "./components/CrudApp/CrudApp"

export default function App() {
   return (
      <main>
         <CrudApi />
         <hr />
         <CrudApp />

         <footer>
            © 2025 – Built with ♥️ by Keyner de Ávila
         </footer>
      </main>
   )
}