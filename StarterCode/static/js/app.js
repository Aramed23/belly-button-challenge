// Load data from URL
function init() {
d3.json(" https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
console.log(data);
//  get data from Json
var names = data.names;
var samples = data.samples
};
 // dropdown menu with sample IDs
 var dropdown = d3.select("#selDataset");
 names.forEach(Function(names){
    dropdown.append("option").text(names).property("value",names)
});
//Function to update charts
function updateChart(selectedName) {
//  find selected name 
var selectedSample =samples.find(function(sample) {
    return sample.id === selectedName;

});
