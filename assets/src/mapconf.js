var mapconf = {
	url: 'http://{s}.tile.stamen.com/{id}/{z}/{x}/{y}.png',
	attr: 'one',
	year_labels: ["Total number of grants:", "Total number of semesters:", "Total number of residencies:"],
	filter_labels: [
		{countries: "Country:", g: "Grant program:", c: "Fields of activity:"},
		{countries: "Host countries:", g: "Scholars from:"},
		{countries: "Host country:", g: "Artist from:", c: "Discipline"},
	],
	graph_names: ["Grant programs", "Activity fields", "Countries"],
	visegrad: ["CZ", "HU", "PL", "SK"],
	subdomains: 'a.b.c.d'.split('.'),
	map_id: 'toner',
	min_z: 5,
	max_z: 10,
	min_radius: 10,
	max_radius: 60,
	v4_bounds: [
		[
			55.0721744,
			12.1004461
		],
		[
			45.7268402,
			24.1729511
		]
	],
	year_bounds: {
		min: 2000,
		max: 2015
	}
};
var mapid = 'map-main';