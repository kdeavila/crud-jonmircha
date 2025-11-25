export default async function helpFetch(url, options = {}) {
   const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json"
   };

   const controller = new AbortController();
   options.signal = controller.signal;

   options.method = options.method || "GET";
   options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

   options.body = JSON.stringify(options.body) || false;
   if (!options.body) delete options.body;

   setTimeout(() => {
      controller.abort();
   }, 3000);

   try {
      const res = await fetch(url, options);

      if (!res.ok) {
         throw new Error(`Request failed with status ${res.status}`);
      }

      return await res.json();
   } catch (err) {
      console.error(err);
      return { err: true, status: err.message || "Unexpected error" }
   }
}