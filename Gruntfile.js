module.exports = function (grunt)
{
	grunt.initConfig(
		{
			concat: {
				app_js: {
					src: [
						'assets/src/*.js'
					],
					dest: 'assets/js/app.src.js'
				},
				app_css: {
					src: ['assets/css/MooComplete.css','assets/css/fonts.css', 'assets/css/colors.css', 'assets/css/page.css'],
					dest: 'assets/app.src.css'
				},
				dist_js: {
					src: [
						'bower_components/lunr/lunr.min.js',
						'bower_components/chartist/dist/chartist.min.js',
						'bower_components/leaflet/dist/leaflet.js',
						'bower_components/mootools-core/dist/mootools-core.min.js',
						'bower_components/mootools-more/mootools-more-nocompat.js',
						'bower_components/mootools-more/Array.sortOn.js',
						'nino-data/countries.js',
						'assets/js/app.src.js'
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
						'assets/app.src.css'
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
			},
			watch: {
				concat: {
					tasks: ['default'],
					files: ['assets/css/*.css', 'assets/js/src/*.js'],
					options: {
						spawn: true,
						event: ['all'],
						reload: true
					}
				}
			}
		});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);
}