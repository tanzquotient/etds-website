# ETDS Schweiz Spring 2025

This repo contains the website for the 69th ETDS hosted by Tanzquotient in Switzerland.

The website is a fork of [the website](https://github.com/RomanovX/ETDS666) of the 66th ETDS in Seesen.

## Developing

This is a static website.

To run it, run `python3 -m http.server` in the repo root, then access it at <http://localhost:8000/>.

Note that simply opening the [index.html](index.html) does not work because then it would
be served at `file://`, which puts some restrictions on web workers.
That's why it needs to be served over `http://`.

## Architecture

The website (or rather: web app) is built using jQuery and [Sammy](https://github.com/quirkey/sammy),
"a tiny javascript framework built on top of jQuery".

As a starting point, see [index.html](index.html) and [assets/js/init.js](assets/js/init.js).

Whenever you navigate to a page, Sammy will take the URL fragment (`#/dances`) and use it as a "route".
From the route/fragment string it will load the respective HTML,
and inject it into the DOM, replacing what is already there (see `this.partial(...)`).

Note that this injection means that any `<script>` contained in the HTML snippets
will be re-run as the user navigates around the app!
So in order to avoid re-definitions, global variables/functions should be placed directly in `index.html`.
