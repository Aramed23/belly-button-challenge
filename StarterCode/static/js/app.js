let data = {}
// Load data from URL

function init() {
 d3.json(" https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((init_data) => {
 data = init_data;
 let selector = d3.select("#selDataset");
 // Use the list of sample names to populate the select options
    let sampleNames = data.names;

    for (let i = 0; i < sampleNames.length; i++){
      selector
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
    };


    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);

});
}



// create a function 
function buildMetadata(s) {
    
    let metadata= data.metadata;
    let filter_results = metadata.filter(m => m.id==s);
    let saved =filter_results[0];
    let select_metadata =d3.select("#sample-metadata");
    select_metadata.html("");
    for (x in saved){
      select_metadata.append("h6").text(`${x}: ${saved[x]}`);
    };

 


}

  function buildCharts(v) {

      let samplevalues=data.samples.slice(0,10).reverse();
      let otuids=data.metadata.slice(0,10).reverse();
      let otulabels=data.names.slice(0,10).reverse();
  
      // Format y-axis labels
      let y_labels=otuids.map(id=>"OTU ${id}");
      // Data array
       

      // Assign trace1 to bar chart
      let trace1 = {
          x: samplevalues,
          y: y_labels,
          text: otulabels,
          type: "bar",
          orientation: "h",
      
        };
        console.log(x,y,text,type,)
      // Call plotly
      Plotly.newPlot("bar",[trace1])
  };

  init();

