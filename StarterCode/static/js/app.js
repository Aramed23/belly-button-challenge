let data = {}
// Load data from URL

function init() {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((init_data) => {
    data = init_data;
    let selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    let sampleNames = data.names;

    for (let i = 0; i < sampleNames.length; i++) {
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

  let metadata = data.metadata;
  let filter_results = metadata.filter(m => m.id == s);
  let saved = filter_results[0];
  let select_metadata = d3.select("#sample-metadata");
  select_metadata.html("");
  for (x in saved) {
    select_metadata.append("h6").text(`${x}: ${saved[x]}`);
  };
}

function optionChanged(click) {
  buildCharts(click);
  buildMetadata(click);

}





function buildCharts(v) {
  let samples = data.samples;
  let filter_results = samples.filter(m => m.id == v);
  console.log("filter_results");
  console.log(filter_results);


  let result = filter_results[0];

  let otu_ids = result.otu_ids;
  let otu_labels = result.otu_labels;
  let sample_values = result.sample_values;
  let barData = [
    {
      y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }
  ];

  let barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", barData, barLayout);


  // build a bubble chart 
  let bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
    margin: { t: 30 }
  };

  let bubbleData = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }
  ];

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);



  //  let saved_two = filter_results[0];
  //   let otuids = saved_two.slice(0, 10).reverse();
  //   let otulabels = saved_two.slice(0, 10).reverse();
  //   let samplevalues =saved_two.slice(0, 10).reverse();
  //   // Format y-axis labels
  //   let y_labels = otuids.map(id =>`OTU ${id}`)

  //   // Data array


  //   // Assign trace1 to bar chart

  //   let trace1 = {
  //     x: samplevalues,
  //     y: y_labels,
  //     text: otulabels,
  //     type: "bar",
  //     orientation: "h",

  //   };
  //   console.log(trace1)

  //   let barLayout = {
  //     title: "Top 10 Bacteria Cultures Found",
  //     margin: { t: 30, l: 150 }
  //   };

  // // Call plotly
  // Plotly.newPlot("bar", [trace1],barLayout)

};


init();

