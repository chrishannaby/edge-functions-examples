import repoLink from "../../components/repo-link.js";

export default {
  title: "Proxy requests to another source (handling wildcard paths)",
  metaDescription: "Make requests to other sources via an Edge Function",
  page: function () {
    return `
    <section>
      <h1>Proxy requests to another source</h1>
      <p>You can use <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch" target="_BLANK" rel=noopener>fetch()</a> to make requests to other sources via an Edge Function.</p>
      <pre><code>import { Context } from "netlify:edge";

const pathRegex = /^.*\/proxy\//;

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "");
  const response = await fetch("https://my.api.com/" + path, {
    headers: {
      Accept: "application/json",
      "x-custom-header": "Hello world",
    },
  });
  const jsonData = await response.json();
  return context.json(jsonData);
};</code></pre>
      <h2>See this in action</h2>
      <ul>
        <li><a href="/proxy">Proxy via an Edge Function</a></li>
        <li>${repoLink("proxy-requests-wildcard.ts")}</li>
      </ul>

      <div class="protip">
        <h2>Pro tip!</h2>
        <p>Curious about <code>context.json()</code> in the code example above? Check out how you can return a <a href="/example/json">JSON response</a> using Edge Functions.</p>
      </div>
    </section>
`;
  },
};
