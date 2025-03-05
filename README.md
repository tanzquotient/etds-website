# ETDS Schweiz Spring 2025

This repo contains the website for the 69th ETDS hosted by Tanzquotient in Switzerland.

The website is a fork of [the website](https://github.com/RomanovX/ETDS666) of the 66th ETDS in Seesen.

## Developing

This is a static website.

To run it, run `python3 -m http.server` in the repo root, then access it at http://localhost:8000/.

Note that simply opening the [index.html](index.html) does not work because then it would be served at `file://`, which puts some restrictions on web workers.
That's why it needs to be served over `http://`.
