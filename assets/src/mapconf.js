var mapconf = {
	url: 'http://map.visegradfund.org/{id}/{z}/{x}/{y}.png',
	attr: 'one',
	year_labels: ["Total number of grants:", "Total number of semesters:", "Total number of residencies:"],
	filter_labels: [
		{countries: "Country:", g: "Grant program:", c: "Fields of activity:"},
		{countries: "Host countries:", g: "Scholars from:"},
		{countries: "Artist from:", g: "Host country:", c: "Discipline"},
	],
	graph_names: [
		["Grant programs:", "Activity fields:", "Countries:"],
		["Participant countries:", "", ""],
		["Host countries:", "Disciplines:", "Artist from:"]
	],
	visegrad: ["CZ", "HU", "PL", "SK"],
	subdomains: ''.split('.'),
	map_id: 'toner',
	min_z: 3,
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
