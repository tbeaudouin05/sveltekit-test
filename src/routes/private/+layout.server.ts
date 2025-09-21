/**
 * This file ensures routes under /private are treated as dynamic and
 * execute on the server, so our hooks.server.ts guard runs.
 */
export const prerender = false;
