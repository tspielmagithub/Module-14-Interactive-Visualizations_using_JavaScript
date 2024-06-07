// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log (data.names)
    // Get the names field
    let dem_ids = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset")
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (const ID of dem_ids) {
      dropdown.append("option").text(ID)
    }
    
    // Get the first sample from the list
    let first_dem_ids = dem_ids [0]
    
    

    // Build charts and metadata panel with the first sample
      optionChanged(first_dem_ids)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
buildMetadata(newSample)
buildCharts(newSample)


}


// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata
    
    // Filter the metadata for the object with the desired sample number

    metadata=metadata.find((item)=>item.id==sample)
  
    //console.log("buildMatadata: ", metadata)
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let card = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    card.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (const key in metadata) {
      let value = metadata[key]
        //console.log(`${key}: ${value}`)
        card.append("div").text(`${key}: ${value}`)
      }
    
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let current_sample = data.samples

    // Filter the samples for the object with the desired sample number
    current_sample = current_sample.find((item)=>item.id==sample)

    console.log("buildCharts: ",current_sample)
  

    // Get the otu_ids, otu_labels, and sample_values

    let current_otu_ids = current_sample.otu_ids
    let current_otu_labels = current_sample.otu_labels
    let sample_values = current_sample.sample_values


    // Build a Bubble Chart
    
    var bubble_trace = {
      x: current_otu_ids,
      y: sample_values,
      text: current_otu_labels,
      mode: 'markers',
      marker: {
        color: current_otu_ids,
        size: sample_values
      }
    };
    
    var bubble_data = [bubble_trace];
    
    var bubble_layout = {
      title: 'Bacteria Cultures per sample',
      showlegend: false,
      // height: 600,
      // width: 600
      };
      // Render the Bubble Chart
      Plotly.newPlot('bubble',bubble_data, bubble_layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Don't forget to slice and reverse the input data appropriately
    var bar_trace = [{
      type: 'bar',
      x: sample_values.slice(0, 10).reverse(),
      y: current_otu_ids.slice(0,10).reverse().map(int => "OTU " + int.toString()),
      text: current_otu_labels.slice(1,10).reverse(),
      orientation: 'h'
    }];
    
    var bar_data = [bar_trace];
    
    var bar_layout = {
      title: 'Top 10 Bacteria Cultures Found',
      showlegend: false,
      
      };
      
      // Render the Bar Chart
      Plotly.newPlot('bar', bar_trace, bar_layout);

  });
}



// Initialize the dashboard
init();
