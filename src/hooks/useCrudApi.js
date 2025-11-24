import apiHelper from "../api/apiHelpers";
import { useState, useEffect } from "react";

export default function useCrudApi(endpoint) {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      const get = async () => {
         setLoading(true);
         setError(null);

         try {
            const res = await apiHelper.apiGet(endpoint);
            setData(res || []);
         } catch (err) {
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
         const res = await apiHelper.apiPost(endpoint, item);
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
         const res = await apiHelper.apiPut(`${endpoint}/${id}`, updates);
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
         await apiHelper.apiDelete(`${endpoint}/${id}`);
         setData((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
         setError(error);
      } finally {
         setLoading(false);
      }
   }

   return { data, loading, error, create, update, remove }
}