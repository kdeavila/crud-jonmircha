export default function CrudTableRow({ technology, handleEdit, handleRemove }) {
   const { id, name, link } = technology;

   return (
      <tr>
         <td>{id}</td>
         <td>{name}</td>
         <td>{link}</td>
         <td>
            <button onClick={() => handleEdit(technology)}>✏️</button>
            <button onClick={(e) => handleRemove(e.target)}>🗑️</button>
         </td>
      </tr>
   )
}