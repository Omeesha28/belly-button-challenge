const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    

     // Function to create dropdown menu options
     function createDropdownOptions(data) {
      return data.map(obj => {
          return {
              method: 'update',
              args: [{'x': [obj.sample_values], 'y': [`OTU ${obj.otu_ids}`], 'text': [obj.otu_labels]}],
              label: obj.id
          };
      });
  }

    // Sort the data by otu_ids descending
    let sortedData = data.sample.sort((a, b) => b.otu_ids - a.otu_ids);

    // Slice the first 10 objects for plotting
    let top10 = sortedData.slice(0, 10);

    // Reverse the array to accommodate Plotly's defaults
    top10.reverse();

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);
  
    // Function called by DOM changes
    function getData() {
      let dropdownMenu = d3.select("#selDataset");
    
      // Assign the value of the dropdown menu option to a letiable
      let dataset = dropdownMenu.property("value");
      // Initialize an empty array for the data
      let data = [];
    }

    // Trace1 
    let trace1 = {
      x: top10.map(obj => obj.sample_values),
      y: top10.map(obj => `OTU ${obj.otu_ids}`),
      type: "bar",
      orientation: "h"
    };

    // Data array
    let plotData = [trace1];

    // Apply a title to the layout
    let layout = {
      title: "Top 10 OTUs",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      },
      // Create the dropdown menu
      updatemenus: [{
        buttons: dropdownOptions,
        direction: 'down',
        showActive: true,
        x: 0.5,
        y: 1.2
    }]
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", plotData, layout);
});