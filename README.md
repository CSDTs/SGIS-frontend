SGIS 2.0
The Angular side (Front-end) of the GIS Social Justice CSDT for the 3Helix program 
===============================



Overview:
	Users are offered a drop-down list of data sources. These might be neighborhood medium incomes, gun ownership, IT accessibility, grocery stores,pollution  Users will be provided with an option to see the data sets on the map. I have implemented the NY state Farmer Market data and next step is to implement GeoJson data to add polygons on the ma
	Users will be able to tag information about stores on the map.

Angular JS:
	AngularJS is a new, powerful, client-side technology that provides a way of accomplishing really powerful things in a way that embraces and extends HTML, CSS and JavaScript, while shoring up some of its glaring deficiencies. It is what HTML would have been, had it been built for dynamic content.

Feature 1: Two Way Data-Binding
Feature 2: Templates
Feature 3: MVC
Feature 4: Dependency Injection
Feature 5: Directives


One-line install using npm:

npm install -g yo

What's Yeoman?

	Yeoman helps you kickstart new projects, prescribing best practices and tools to help you stay productive.The Yeoman workflow is comprised of three types of tools for improving your productivity and satisfaction when building a web app: the scaffolding tool (yo), the build tool (Grunt, Gulp, etc) and the package manager (like Bower and npm).

	1) yo scaffolds out a new application, writing your Grunt configuration and pulling in relevant Grunt tasks and Bower dependencies that you might need for your build.
	2) The Build System is used to build, preview and test your project. Grunt and Gulp are two popular options.
	    Bower, npm, etc
	3) The Package Manager is used for dependency management, so that you no longer have to manually download and manage your scripts. Bower and npm are two popular options.

Installation:

	To get started:

	1. Clone the repository and its submodules:

		git clone --recursive git@github.com:yeoman/yeoman.io.git
			cd yeoman.io

	2. Install all modules and needed tools

		npm install
		gem install bundler
		bundle install
		bower install

Now you're ready to do some work!	

Check out the website for various functionalities.

http://yeoman.io/

Running Application
	Preview your app in the browser
		Start the server
		grunt serve

		Stop the Server
		Ctrl + C
	Installing packages using bower
		List current packages
		bower list
		
		Search for packages
		bower search package-name
		
		Install packages
		bower install --save package-name		


