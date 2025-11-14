import "./CrudApi.css"

import CrudApiForm from "./CrudApiForm"
import CrudApiTable from "./CrudApiTable"

import { useState } from "react";

export function CrudApi() {
   const [technologies, setTechnologies] = useState([]);
   const [dataToEdit, setDataToEdit] = useState(null);

   const handleCreate = (newTechnology) => {
      const idTechnologies = technologies.map((tech) => tech.id)
      const nextId = idTechnologies.reduce((prev, current) => Math.max(prev, current)) + 1;

      newTechnology.id = nextId;
      setTechnologies([...technologies, newTechnology]);
   }

   const handleEdit = (technology) => {
      setDataToEdit(technology);
   }

   const handleUpdate = (updatedTechnology) => {
      setTechnologies(technologies.map((tech) =>
         tech.id === updatedTechnology.id ? updatedTechnology : tech));
      setDataToEdit(null);
   }

   const handleRemove = (id) => {
      setTechnologies(technologies.filter((tech) =>
         tech.id !== id
      ))
   }

   return (
      <section>
         <h2>CRUD API TECHNOLOGIES</h2>
         <hr />
         <CrudApiForm
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleEdit={handleEdit}
            dataToEdit={dataToEdit}
         />

         <CrudApiTable
            technologies={technologies}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
         />
      </section>
   )
}