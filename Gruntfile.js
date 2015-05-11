module.exports = function (grunt)
{
	grunt.initConfig(
		{
			concat: {
				dist_js: {
					src: [
						'bower_components/chartist/dist/chartist.min.js',
						'bower_components/leaflet/dist/leaflet.js',
						'bower_components/mootools-core/dist/mootools-core.min.js',
						'bower_components/mootools-more/mootools-more-nocompat.js',
						'bower_components/mootools-more/Array.sortOn.js',
						'nino-data/countries.js',
						'assets/js/app.js'
					],
					dest: 'dist/app.js'
				},
				dist_css: {
					src: [
						'bower_components/pure/pure-min.css',
						'bower_components/pure/grids-responsive-min.css',
						'bower_components/chartist/dist/chartist.min.css',
						'bower_components/leaflet/dist/leaflet.css',
						'bower_components/elusive-icons-2.0.0/css/elusive-icons.min.css',
						'assets/css/fonts.css',
						'assets/css/colors.css',
						'assets/css/page.css'
					],
					dest: 'dist/app.css'
				}
			},
			cssmin: {
				target: {
					files: {
						'dist/app.min.css': ['dist/app.css']
					}
				}
			},
			uglify: {
				options: {
					mangle: false,
					compress: true
				},
				deploy_js: {
					files: {
						'dist/app.min.js': ['dist/app.js']
					}
				}
			}
		});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
}