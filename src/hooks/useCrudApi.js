import { useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../api/apiHelpers";
import { useEffect } from "react";

export default function useCrudApi(endpoint) {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      const get = async () => {
         setLoading(true);
         setError(null);

         try {
            const res = await apiGet(endpoint);
            console.log("Datos obtenidos:", res);
            setData(res || []);
         } catch (err) {
            console.error("Error en get:", err);
            setError(err);
         } finally {
            setLoading(false);
         }
      };

      get();
   }, [endpoint])

   const create = async (item) => {
      setLoading(true);
      setError(null);

      try {
         const res = await apiPost(endpoint, item);
         setData((prev) => [...prev, res]);
         return res;
      } catch (error) {
         setError(error);
      } finally {
         setLoading(false);
      }
   }

   const update = async (id, updates) => {
      setLoading(true);
      setError(null);

      try {
         const res = await apiPut(`${endpoint}/${id}`, updates);
         setData((prev) => prev.map((p) => p.id === id ? res : p));
         return res;
      } catch (error) {
         setError(error);
      } finally {
         setLoading(false);
      }
   }

   const remove = async (id) => {
      setLoading(true);
      setError(null);

      try {
         await apiDelete(`${endpoint}/${id}`);
         setData((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
         setError(error);
      } finally {
         setLoading(false);
      }
   }

   return { data, loading, error, create, update, remove }
}