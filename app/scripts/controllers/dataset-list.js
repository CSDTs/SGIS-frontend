'use strict';

/**
 * @ngdoc function
 * @name sgisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sgisApp
 */
angular.module('sgisApp')
  .controller('DatasetListController', function () {
  	this.datasets = [
        {
            "id": 6, 
            "name": "Food Service Inspections", 
            "cached": "2014-10-17T17:44:58.039Z", 
            "field1_en": "", 
            "field2_en": "", 
            "field3_en": "", 
            "tags":  ["fastfood","pizza"]
        }, 
        {
            "id": 1, 
            "name": "Retail Food Stores", 
            "cached": "2014-10-17T17:46:35.783Z", 
            "field1_en": "Entity Name", 
            "field2_en": "", 
            "field3_en": "", 
            "tags":  ["grocery","fruits","vegetables","freshfruits"]
        }, 
        {
            "id": 2, 
            "name": "Farmers Markets", 
            "cached": "2014-10-17T17:46:43.241Z", 
            "field1_en": "Market Link", 
            "field2_en": "EBT/SNAP Status", 
            "field3_en": "Operation Season", 
            "tags":  ["fruits"]
        }, 
        {
            "id": 9, 
            "name": "2010 Census Tracts", 
            "cached": "2014-10-17T17:49:51.648Z", 
            "field1_en": "Land Area", 
            "field2_en": "Water Area", 
            "field3_en": "", 
            "tags": []
        }, 
        {
            "id": 10, 
            "name": "test set", 
            "cached": null, 
            "field1_en": "", 
            "field2_en": "", 
            "field3_en": "", 
            "tags":  ["stuff","new","old","great","awesome","fantastic","not bad","grandiose","cool"]
        }, 
        {
            "id": 11, 
            "name": "Hazardous Waste Sites 2011", 
            "cached": "2014-11-24T22:15:57.634Z", 
            "field1_en": "Generator Status", 
            "field2_en": "Biennial Report Link", 
            "field3_en": "", 
            "tags": []
        }, 
        {
            "id": 12, 
            "name": "Hazardous Waste Sites 2001", 
            "cached": "2014-11-24T22:16:04.859Z", 
            "field1_en": "Generator Status", 
            "field2_en": "Biennial Report Link", 
            "field3_en": "", 
            "tags": []
        }
    ];
    var temp = {};
    var temp2 = {};
    this.datasets.map(function (value, index){
    	temp[value.id] = value;
    	temp2[value.id] = false;
    	delete temp[value.id].id;
    });
    this.datasets = temp;
  	this.activeDatasets = temp2;
  	this.count = Object.keys(this.datasets).length;
  	this.activeTags = [];
  	this.here = false;


  	this.setActiveTags = function(){
  		this.activeTags = [];
  		for (var k in this.activeDatasets){
  			if(this.activeDatasets[k]){
  				this.activeTags = this.activeTags.concat(this.datasets[k].tags);
  			}
  		}
  	};

  	this.toggleActivatedDataset = function (datasetId){
  		if (this.activeDatasets[datasetId]) {
  				this.here=true;
  		/*just activated, this is tied to checkbox*/
  			this.activeTags = this.activeTags.concat(this.datasets[datasetId].tags);
	  	} else {
	  		this.setActiveTags();
	  	}
  	}

  });
