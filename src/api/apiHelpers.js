const API_BASE = "http://localhost:5000/"

const request = async (endpoint, { method = "GET", headers = {}, body } = {}) => {
   const url = `${API_BASE}${endpoint}`;
   const options = {
      method,
      headers: { "Content-type": "application/json", ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
   }

   try {
      const res = await fetch(url, options);
      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      if (!res.ok) {
         const errBody = isJson ? await res.json() : await res.text();
         const message = errBody?.message || res.statusText || "Network error"
         throw { status: res.status, message, body: errBody }
      }

      return isJson ? await res.json() : null;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export const apiGet = (endpoint) => request(endpoint);
export const apiPost = (endpoint, body) => request(endpoint, { method: "POST", body });
export const apiPut = (endpoint, body) => request(endpoint, { method: "PUT", body });
export const apiDelete = (endpoint) => request(endpoint, { method: "DELETE" });

export default { request, apiGet, apiPost, apiPut, apiDelete };
