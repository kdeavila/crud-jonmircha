import "./CrudApi.css"

import Loader from "./Loader"
import CrudApiForm from "./CrudApiForm"
import CrudApiTable from "./CrudApiTable"
import useCrudApi from "../../hooks/useCrudApi"

import { useState } from "react";
import { useEffect } from "react";

const errorStyles = { fontSize: "14px", color: "red", textAlign: "center" };

export default function CrudApi() {
   const { data, loading, error, create, update, remove } = useCrudApi("frameworks");

   const [technologies, setTechnologies] = useState([]);
   const [dataToEdit, setDataToEdit] = useState(null);

   useEffect(() => {
      setTechnologies(data);
   }, [data])

   const handleCreate = (newTechnology) => {
      const idTechnologies = technologies.map((tech) => Number(tech.id))
      const nextId = idTechnologies.reduce((prev, current) => Math.max(prev, current), 0) + 1;

      newTechnology.id = nextId.toString();
      create(newTechnology);
   }

   const handleEdit = (technology) => {
      setDataToEdit(technology);
   }

   const handleUpdate = (updatedTechnology) => {
      update(updatedTechnology.id, updatedTechnology);
      setDataToEdit(null);
   }

   const handleRemove = (id) => {
      const isConfirm = confirm("Are you sure you want to delete the resource?");
      if (!isConfirm) return;

      setDataToEdit(null);
      remove(id);
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

         {error && <p style={errorStyles}>Error {error.status}: {error.message}</p>}

         {loading ? (
            <Loader />
         ) : (
            <CrudApiTable
               technologies={technologies}
               handleEdit={handleEdit}
               handleRemove={handleRemove}
            />
         )}

      </section>
   )
}