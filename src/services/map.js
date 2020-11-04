import * as d3 from "d3";
import us_data from '../data/us.json'



export const drawMap = (votes) => {
  var sum = 0;

  votes.forEach((vote)=>{
    sum += vote.votes
  })

  var dem = 0;
  var rep = sum;

  console.log('sum', sum)
  var chart_width = 800;
  var chart_height = 400;

  //to position and scale the map
  var projection = d3.geoAlbersUsa()
    .scale([chart_width])
    .translate([chart_width/2, chart_height/2]);


  var path = d3.geoPath()
    .projection(projection);
  
  var svg = d3.select('.map-container')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height)

  
  

  us_data.features.forEach((us_e, us_i) => {
    votes.forEach((v_e, v_i) => {
      if (us_e.properties.name !== v_e.state) {
        return null;
      }
      us_data.features[us_i].properties.votes = parseFloat(v_e.votes);
      us_data.features[us_i].properties.default_party = "Republican";
      us_data.features[us_i].properties.abbr = v_e.abbr;
    }
   )
 })

  console.log(votes)
  us_data.features.forEach((state) => {
    console.log(state.properties.name)
  }
  )

  svg.selectAll('path')
    .data(us_data.features)
    .enter()
    .append('path')
    .attr("d", path)
    .text(function (d) {
      return d.properties.name
    })
    .attr('class', function (d) {

      return d.properties.default_party
    })
    .attr('id', function (d) {
      return d.properties.votes
    })
    .on('click', function (d) {
      console.log(d3.select(this).attr('id'))
      if (d3.select(this).attr('class') == "Republican") {
        d3.select(this).attr('class', "Democrat")
        dem += parseInt(d3.select(this).attr('id'))
        rep -= parseInt(d3.select(this).attr('id'))
        d3.select('#Democrat')
          .text(`Biden: ${dem}`)
        d3.select('#Republican')
          .text(`Trump: ${rep}`)
      }
      else {
        d3.select(this).attr('class', "Republican")
        dem -= parseInt(d3.select(this).attr('id'))
        rep += parseInt(d3.select(this).attr('id'))
        d3.select('#Democrat')
          .text(`Biden: ${dem}`)
        d3.select('#Republican')
          .text(`Trump: ${rep}`)
      }
    })
    .attr('stroke', '#212d36')
    .attr('stroke-width', 2)
  
  svg.selectAll('p')
    .data(us_data.features)
    .enter()
    .append('text')
    .text(function (d) {
      return d.properties.abbr
    })
    .attr("x", function (d) {
      return path.centroid(d)[0];
    })
    .attr("y", function (d) {
      return path.centroid(d)[1];
    })
    .attr("text-anchor", "middle")
    .attr('fill', 'white')
    .attr("font-size", "10px")
    .attr("font-weight", "bold");
}

