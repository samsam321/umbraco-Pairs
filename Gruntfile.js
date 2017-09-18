module.exports = function(grunt) {

    // Load the package JSON file
    var pkg = grunt.file.readJSON('package.json');

    // get the root path of the project
    var projectRoot = 'src/App_Plugins/' + pkg.name + '/';
	var destRoot = 'files/';

    // Load information about the assembly
    var assembly = grunt.file.readJSON('config/meta.json');

    // Get the version of the package
    var version = assembly.informationalVersion ? assembly.informationalVersion : assembly.version;

    grunt.initConfig({
        pkg: pkg,
		clean: {
            files: [
                destRoot + '**/*.*'
            ]
        },
        copy: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: projectRoot,
                        src: ['**/*.*'],
                        dest: destRoot
                    }
                ]
            }
        },
		zip: {
			release: {
				cwd: destRoot,
				src: [
					destRoot + '**/*.*'
				],
				dest: 'releases/github/' + pkg.name + '.v' + version + '.zip'
			}
		},
		umbracoPackage: {
			dist: {
				src: destRoot,
				dest: 'releases/umbraco',
				options: {
					name: pkg.name,
					version: version,
					url: pkg.url,
					license: pkg.license.name,
					licenseUrl: pkg.license.url,
					author: pkg.author.name,
					authorUrl: pkg.author.url,
					readme: pkg.readme,
					outputName: pkg.name + '.v' + version + '.zip',
					manifest: 'package.xml'
				}
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nuget');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-umbraco-package');

    grunt.registerTask('dev', ['clean', 'copy', 'umbracoPackage']);
    grunt.registerTask('default', ['dev']);

};