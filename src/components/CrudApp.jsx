import { useState } from "react";

import CrudForm from "./CrudForm"
import CrudTable from "./CrudTable"

const initialTechnologies = [
   {
      id: 1,
      name: "React",
      link: "https://react.dev",
   },
   {
      id: 2,
      name: "Vitest",
      link: "https://vitest.dev/",
   },
   {
      id: 3,
      name: "Angular",
      link: "https://angular.dev/",
   },
   {
      id: 4,
      name: "Vue",
      link: "https://vuejs.org/",
   },
   {
      id: 5,
      name: "Solid",
      link: "https://www.solidjs.com/",
   },
   {
      id: 6,
      name: "Svelte",
      link: "https://svelte.dev/",
   },
   {
      id: 7,
      name: "Prect",
      link: "https://preactjs.com/",
   },
];

export default function CrudApp() {
   const [technologies, setTechnologies] = useState(initialTechnologies);
   const [dataToEdit, setDataToEdit] = useState(null);

   const handleCreate = (newTechnology) => {
      const nextId = technologies.length + 1;
      newTechnology.id = nextId;
      setTechnologies([...technologies, newTechnology]);
   }

   const handleEdit = (technology) => {
      setDataToEdit(technology);
   }

   const handleUpdate = (updatedTechnology) => {
      setTechnologies(technologies.map((tech) => {
         tech.id === updatedTechnology ? updatedTechnology : tech
      }));
      setDataToEdit(null);
   }

   const handleRemove = (e) => {
      console.log("Removiendo...", e);
   }

   return (
      <section>
         <h2>CRUD TECHNOLOGIES</h2>
         <hr />
         <CrudForm
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            dataToEdit={dataToEdit}
         />

         <CrudTable
            technologies={technologies}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
         />
      </section>
   )
}