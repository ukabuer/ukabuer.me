import glob from "fast-glob";
import fetch from 'isomorphic-unfetch';

export async function prerender() {
  const pages = await glob("site/routes/*.tsx");
  const apis = await glob("site/routes/*.ts");
  const urls = pages.concat(apis).filter(url => !url.match(/[\s+]/));

  // start server with rendering mode

  const unresolved = [...urls];
  const resolved = new Set();

  while (unresolved.length > 0) {
    const url = unresolved.shift();
    if (resolved.has(url))
    {
      continue;
    }
    
    // request url & get response
    const response = await fetch(url);
    const text = await response.text();
    console.log(text);
    
    // save to file
    // maybe should save to file at server side

    // parse to find more url

    resolved.add(url);
  }  
}
