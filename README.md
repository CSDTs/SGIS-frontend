
SGIS 2.0: FrontEnd of the 3Helix Program
========================================
* Backend is available at [gis_csdt]

**Goal :
Geographical Information System(GIS) application for school kids:**

>The basic idea is to provide students with different data sources that might be interesting for the kids in measuring different datasets such as neighborhood medium incomes, gun ownership, IT accessibility, grocery stores, pollution. Kids will be able to measure their neighborhood and will learn generative justice in the class by comparing how prosperous their neighborhood is. Other primary goal is to make it useful for teachers teaching kids. We will be making our system as eClassroom where teachers and students will be able to login and teachers will be able to see what tags kids have added.

Users of the system:
===================

>Anyone who wants to compare his neighborhood in the state of New York will be able to use this application to add his own custom tags. It is also helpful for teachers teaching kids about generative justice. Additionally, kids will be able to compare neighborhood in the class by looking at the interactive charts corresponding to their neighborhood. 

Technology Used:
================
    -FrontEnd: I am using Angular with Google Maps.
    -BackEnd: Python Django.
    -PostGreSQL Database

Installation
--------------

For Ubuntu 14.04

```
First, there are a few essentials for installing node
	Needed for Node:
	>sudo apt-get install node
	>sudo apt-get install npm
	Needed for Grunt
	>sudo npm install -g grunt-cli
	Needed for Bower
	>npm install -g bower
```

Cloning into the code
	>git clone https://github.com/gouravjeet/SGIS-2.0.git
	>cd SGIS-2.0/

Now, you need to install the project dependencies
```
Needed for Bower Packages:
	>bower install 
It will then ask for angular and bootstrap packages	
	please select 3.1.1 for bootstrap and 1.2.16 for angular
```
```
Needed for Grunt Packages:
	>sudo npm install --save
	The --save option instructs NPM to include the package inside of the dependencies section of your package.json automatically, thus saving you an additional step.
```

```
Running the Application	
	>grunt serve 
```

Technologies Used
-----------

SGIS uses a number of open source projects to work properly:

* bower	- Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for.

* grunt - Jabascript task zRunner
* yeoman - Yeoman helps you kickstart new projects, prescribing best practices and tools to help you stay productive.
* [Ace Editor] - awesome web-based text editor
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [jQuery] - Javascript library

[gis_csdt]:https://github.com/kathleentully/gis_csdt



