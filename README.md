# Node sitemap generator

A sitemap generator

---

My first node.js attempt, this will check the directory that this file is placed in and then take all the .html or .php files that are found there and generate a `sitemap.xml` file and a `robots.txt` file.

*   index will be replaced with / and have a `<priority>` set to 1.0 (default is 0.5)
*   `<lastmod>` will be set to the file's last modify date.
*   `<changefreq>` defaults to weekly
*   default sitename is set to `change-to-your-sitename.com` will prompt you to add your own sitename

## Installation

node.js must be installed in the same directory as sitemap.js then go to the command line and in the directory of sitemap.js  `npm sitemap` then type the name of your site

## Licence

WTFPL