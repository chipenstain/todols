module.exports = function(grunt) {
	grunt.initConfig({
		pug: {
			debug: {
				options: {
					data: {
						debug: true
					}
				},
				files: {
					'debug.html': 'test.pug'
				}
			},
			release: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'release.html': 'test.pug'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-electron');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', []);
};
