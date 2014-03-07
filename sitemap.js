/*global require*/
/*global console*/

var fs = require('fs'),
	i = 0,
	pages = [];
	xml = '<?xml version="1.0" encoding="UTF-8"?>' + "\r\n" + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "\r\n",
	d = new Date(),
	currentDate = d.getFullYear() + '-';

if (Number(d.getMonth() + 1) < 10) {
	currentDate += '0';
}
currentDate += d.getMonth() + 1 + '-';
if (Number(d.getDate()) < 10) {
	currentDate += '0';
}
currentDate += d.getDate();

fs.readdir('./', function (err, list) {
	'use strict';
	if (err) throw err;
	for (i = 0; i < list.length; i++) {
		if (list[i].indexOf('.html') !== -1 || list[i].indexOf('.php') !== -1) {
			if (list[i] === 'index.html' || list[i] === 'index.php') {
				pages.push('');
			} else {
				pages.push(list[i]);
			}
		}
	}
	for (i = 0; i < pages.length; i++) {
		xml += "\t" + '<url>' + "\r\n\t\t" + '<loc>http://replace-with-your-sitename.com/' + pages[i] + '</loc>' + "\r\n";
		xml += "\t\t" + '<lastmod>' + currentDate + '</lastmod>' + "\r\n";
		xml += "\t\t" + '<changefreq>weekly</changefreq>' + "\r\n";
		xml += "\t\t" + '<priority>0.5</priority>' + "\r\n\t" + '</url>' + "\r\n";
	}
	xml += '</urlset>';
	fs.writeFile('sitemap.xml', xml, function (err) {
		if (err) throw err;
		console.log('Sitemap saved!');
	});
});