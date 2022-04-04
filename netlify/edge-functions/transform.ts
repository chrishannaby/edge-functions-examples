import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Look for the query parameter, and return if we don't find it
  if (url.searchParams.get("method") !== "transform") {
    return context.next();
  }

  console.log(`Transforming the response from this ${url}`);

  const response = await context.next();

  // Check to see if the response has already been modified.
  // If it has, return it.
  if (response.status === 304) {
    return response;
  }

  const text = await response.text();
  return new Response(text.toUpperCase(), response);
};
