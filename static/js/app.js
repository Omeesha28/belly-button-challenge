// Create URL in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Create the Dropdown Test Subject ID No.
function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
                let id_names = data.names;
        id_names.forEach((id) => {
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });
        let sample = id_names[0];

        console.log(sample);

        // Build the initial plots
        buildMetadata(sample);
        buildBarChart(sample);
        buildBubbleChart(sample);
    });
};

// Function that builds the bar chart
function buildBarChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the result of the sample
        let result = sampleInfo.filter(item => item.id == sample);

        let resultsdata = result[0];

        // Define the otu_ids, lables, and sample values
        let otu_ids = resultsdata.otu_ids;
        let otu_labels = resultsdata.otu_labels;
        let sample_values = resultsdata.sample_values;

        console.log(otu_ids,otu_labels,sample_values);

        // Set top ten items to display in descending order
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: labels,
            type: "bar",
            marker: {
                color: sample_values.slice(0,10).reverse(),
                colorscale: "Portland",
                colorbar: {
                    title: 'Sample Values'
                }             
            },
            orientation: "h"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the result of the sample
        let result = sampleInfo.filter(result => result.id == sample);

        let resultsdata = result[0];

        // Define the otu_ids, lables, and sample values
        let otu_ids = resultsdata.otu_ids;
        let otu_labels = resultsdata.otu_labels;
        let sample_values = resultsdata.sample_values;

        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Jet"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace2], layout)
    });
};

// Function that populates metadata info
function buildMetadata(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter based on the result of the sample
      let result = metadata.filter(item => item.id == sample);

      console.log(result)

      let resultsdata = result[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      Object.entries(resultsdata).forEach(([key,value]) => {
          console.log(key,value);

          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};

// Function that updates dashboard when sample is changed
function optionChanged(result) { 

    // Log the new value
    console.log(result); 

    // Call all functions 
    buildMetadata(result);
    buildBarChart(result);
    buildBubbleChart(result);
};

// Call the initialize function
init();