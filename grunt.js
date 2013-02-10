/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    clean: 'build',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    coffee: {
  	  client: {
  	    src   : ['public/coffee/**/*.coffee'],
  	    dest  : 'public/javascripts',
  	    options: {
  	    	preserve_dirs: true,
  	        base_path: 'public/coffee'
  	    }
  	  },
      server: {
        src   : ['*.coffee', 'routes/*.coffee'],
        dest  : './',
        options: {
          preserve_dirs: true,
            base_path: './'
        }
      },
  	  test:{
  	    src : ['test/spec_coffee/**/*.coffee'],
  	    dest: 'test/spec/',
  	    options: {
  	        preserve_dirs: true,
  	        base_path: 'test/spec_coffee'
  	    }
  	  }
  	},
    bower: {
      dev: {
        dest: 'public/javascripts/lib'
      }
    },
    compass: {
      files: ['public/sass/**/*.scss'],
      dev: {
        // importPath: '/../..',
        src: 'public/sass',
        dest: 'public/stylesheets',
        linecomments: true,
        forcecompile: false,
        debugsass: false,
        relativeassets: true
      }
    },
    // sass: { 
    //     dev: {
    //         files: { 
    //             'public/stylesheets/style.css': 'public/sass/style.scss'
    //         }
    //     }
    // },
  	watch: {
      coffee: {
        files: ['<config:coffee.client.src>', '<config:coffee.server.src>', '<config:coffee.test.src>'],
        tasks: 'coffee'
      },
      compass: {
        files: ['<config:compass.files>'],
        tasks: 'compass'
      // },
      // sass: {
      //   files: ['<config:sass.dev.files>'],
      //   tasks: 'sass'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {},
    requirejs: {
        js : {
        	clearTarget: false,
        	dir: 'public',
            appDir: '',
            baseUrl: 'javascripts',
            modules: [{
            	name: 'client'
            }],
           //  paths: {
           //      underscore: 'lib/underscore/underscore',
           //      jquery    : 'lib/jquery/jquery.min',
           //      easing: 'lib/jquery/jquery.easing.1.3',
           //      backbone  : 'lib/backbone/backbone',
           //      require: 'lib/require/require',
           //      text: 'lib/require/text'
           //  },
           //  shim: {
	          //   underscore: {
	          //   exports: "_"
	          // },
	          //   backbone: {
	          //   deps: ['underscore', 'jquery'],
	          //   exports: 'Backbone'
	          // },
	          //   'backbone.localStorage': {
	          //   deps: ['backbone'],
	          //   exports: 'Backbone'
	          // }
	        },
          pragmas: {
              doExclude: true
          },
          skipModuleInsertion: false,
          optimizeAllPluginResources: false,
          findNestedDependencies: false
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-bower');

  // Default task.
//  grunt.registerTask('default', 'lint qunit concat min');
  grunt.registerTask('default', 'watch');

};
