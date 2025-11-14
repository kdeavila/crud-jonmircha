import { useState, useEffect } from "react";

const initialformData = { id: null, name: "", link: "", };
const errorStyles = { fontSize: "14px", color: "red", textAlign: "center" };

export default function CrudForm({ handleCreate, handleUpdate, handleEdit, dataToEdit }) {
   const [formData, setFormData] = useState(initialformData);
   const [error, setError] = useState(null);

   const isEditing = formData.id !== null;

   useEffect(() => {
      if (dataToEdit) {
         setFormData(dataToEdit);
         return;
      };
      setFormData(initialformData);

   }, [dataToEdit]);

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!formData.name) {
         setError("Name is required");
         return;
      }

      if (!formData.link) {
         setError("Link is required");
         return;
      }

      if (formData.id === null) {
         handleCreate(formData);
         handleReset();
      } else {
         handleUpdate(formData);
      }
   }

   const handleReset = () => {
      setFormData(initialformData);
      handleEdit(null);
   }

   const handleChange = (e) => {
      setError(null);
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   }

   return (
      <form onSubmit={handleSubmit}>
         {error && (
            <p style={errorStyles}>
               {error}
            </p>
         )}

         <div>
            <label htmlFor="name">Technology name</label>
            <input
               onChange={handleChange}
               value={formData.name}
               type="text"
               id="name"
               name="name"
               placeholder="React, Angular..."
            />
         </div>

         <div>
            <label htmlFor="link">Website</label>
            <input
               onChange={handleChange}
               value={formData.link}
               type="text"
               id="link"
               name="link"
               placeholder="https://example.com"
            />
         </div>

         <div>
            <button
               type="reset"
               onClick={handleReset}
            >
               Reset
            </button>

            <button type="submit">
               {isEditing ? "Update" : "Create"}
            </button>
         </div>
      </form>
   )
}