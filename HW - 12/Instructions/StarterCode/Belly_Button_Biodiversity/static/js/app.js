function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
    
  // Use `d3.json` to fetch the metadata for a sample
    
    // Use d3 to select the panel with id of `#sample-metadata`
   
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    var panel = d3.select("#sample-metadata");
    d3.json("/metadata/940").then((datum) => {
        //metaData.forEach((datum) => {
          data = Object.entries(datum)
          panel
            .html("")
            .append("option")
            .text(data[0])
            .append("option")
            .text(data[1])
            .append("option")
            .text(data[2])
            .append("option")
            .text(data[3])
            .append("option")
            .text(data[4])
            .append("option")
            .text(data[5])
            .append("option")
            .text(data[6]);
            
        //});
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  
    // @TODO: Build a Bubble Chart using the sample data
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json("/samples/940").then((data) => {
      pieValues = data.sample_values.slice(0, 11)
      pieLabels = data.otu_ids.slice(0, 11)
      pieHtext = data.otu_labels.slice(0, 11)
      var pieData =[{
        values: pieValues,
        labels: pieLabels,
        type: 'pie'
      },{
        hoverinfo: pieHtext,
        textinfo: 'none'
      }];
      var pieLayout = {
        height: 400,
        width: 500,
      };
      Plotly.newPlot('pie', pieData, pieLayout);

      xValues = data.otu_ids.slice(0, 11)
      yValues = data.sample_values.slice(0, 11)
      markerSize = data.sample_values.slice(0, 11)

      var trace1 = {
        x: xValues,
        y: yValues,
        mode: 'markers',
        marker: {
          size: markerSize,
          color: yValues,
        }
      };
       var data2 = [trace1];

       var layout2 = {
         title: 'Bubble Chart',
         showlegend: false,
         height: 600,
         width: 600
       };

       Plotly.newPlot('bubble', data2, layout2);

        });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
