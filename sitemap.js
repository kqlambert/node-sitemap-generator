/*global require*/
/*global console*/

var fs = require('fs'),
	i = 0,
	pages = [];
	xml = '<?xml version="1.0" encoding="UTF-8"?>' + "\r\n" + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "\r\n",
	site = 'change-to-your-sitename.com';

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
		var mtdate = new Date(fs.statSync('./' + pages[i]).mtime),
			currentDate = mtdate.getFullYear() + '-';
		if (Number(mtdate.getMonth() + 1) < 10) {
			currentDate += '0';
		}
		currentDate += mtdate.getMonth() + 1 + '-';
		if (Number(mtdate.getDate()) < 10) {
			currentDate += '0';
		}
		currentDate += mtdate.getDate();
		xml += "\t" + '<url>' + "\r\n\t\t" + '<loc>http://' + site + '/' + pages[i] + '</loc>' + "\r\n";
		xml += "\t\t" + '<lastmod>' + currentDate + '</lastmod>' + "\r\n";
		xml += "\t\t" + '<changefreq>weekly</changefreq>' + "\r\n";
		var priority = parseFloat(0.5);
		if (pages[i] === '') {
			priority = parseFloat(1.0);
		}
		xml += "\t\t" + '<priority>' + priority.toFixed(1) + '</priority>' + "\r\n\t" + '</url>' + "\r\n";
	}
	xml += '</urlset>';
	fs.writeFile('sitemap.xml', xml, function (err) {
		if (err) throw err;
		console.log('sitemap.xml has been saved!');
	});
	var robots = 'User-agent: *' + "\r\n";
	robots += 'Allow: *' + "\r\n";
	robots += 'Sitemap: http://' + site + '/sitemap.xml';
	fs.writeFile('robots.txt', robots, function (err) {
		if (err) throw err;
		console.log('robotx.txt has been saved!');
	});
});