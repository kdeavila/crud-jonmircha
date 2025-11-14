import CrudTableRow from "./CrudTableRow";

export default function CrudTable({ technologies, handleEdit, handleRemove }) {
   return (
      <table>
         <thead>
            <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Link</th>
               <th>Actions</th>
            </tr>
         </thead>

         <tbody>
            {technologies.length !== 0 ? (
               technologies.map((tech) =>
                  <CrudTableRow
                     key={tech.id}
                     technology={tech}
                     handleEdit={handleEdit}
                     handleRemove={handleRemove}
                  />
               )
            ) : (
               <tr>
                  <td colSpan={3}>There's no data to show</td>
               </tr>
            )}
         </tbody>
      </table>
   )
}