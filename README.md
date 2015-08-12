# INSPIRE Polygons Mapper

This is a node script intended to making the downloading and mapping of land registry INSPIRE polygons as simple as possible. 

## Usage

The intended use is:

```
node mapper.js {Areas} {FromDate}
```

## Arguments

### Areas

* Type: Date
* Format: 'Area1, Area2, Area3, Are4' 
* Default value: null
* Required: Yes

Comma delimited list of areas which match the format of http://data.inspire.landregistry.gov.uk/{Area}.zip. 

### FromDate

* Type: Date
* Format: 'YYYY-MM-DD' 
* Default value: null
* Required: No

Filters the polygons down to only include polygons where the from date is equal to or after the passed in date. 

[INSPIRE polygons](https://www.gov.uk/government/collections/download-inspire-index-polygons) conditions of use can be found [here](https://www.gov.uk/inspire-index-polygons-spatial-data#conditions-of-use).
