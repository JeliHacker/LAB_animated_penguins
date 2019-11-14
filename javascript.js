var screen = {width: 400, height: 500}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var penguinPromise = d3.json("penguins/classData.json")


penguinPromise.then(
    function(data){
        console.log("this code is blowing my mind broh", data)
        setup(data)
    },
    
    function(err)
    {
        console.log("this code... oh boy... needs work bud", err)
    }
)




var setup = function(array2D)
{
    
    d3.select("svg")
        .attr("width", screen.width)
        .attr("height", screen.height)
        .append("g")
        .attr("id", "graph")
        .attr("transform", "translate(" + margins.left + ","+margins.top+")");
    
    var width= screen.width - margins.left-margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                    .domain([0, 38])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                    .domain([0, 10])
                    .range([height, 0])

    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("svg")
        .append("g")
        .classed("axis", true)
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate(" + margins.left + "," + (margins.top+height) + ")")
        .call(xAxis)
    
      d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(25," + margins.top + ")")
        .call(yAxis)
    
       var quizzes = d3.select("#graph")
        .selectAll("g")
        .data(array2D[0].quizes)
       .enter()
        //.attr("transform", "translate(25)")
    
        quizzes.append("circle")
        .attr("fill", "black")
        .attr("cx", function(num, index)
             {
            return xScale(index)
        })
        .attr("cy", function(num)
             {
            console.log("num", num.grade);
            return yScale(num.grade)
        })
        .attr("r", 3)

    
    
    
    d3.select(".imgs")
        .selectAll("img")
        .data(array2D)
        .enter()
        .append("img")
        .attr("src", function(penguin){
        console.log("penguin", penguin)
        return "penguins/" + penguin.picture 
    }) 
    
    
        .on("click", function(penguin, index)
        {
            d3.selectAll("#graph g")
                .remove()
            console.log("click")
        console.log("index", index)
        
        
            drawArray(array2D, xScale, yScale, index)
             
            })
       /* var quizzes = d3.select("#graph")
        .selectAll("g")
        .data(array2D[index].quizes)
        .enter()
        .append("g")
        //.attr("transform", "translate(25)")
    
        quizzes.append("circle")
        .attr("fill", "black")
        .attr("cx", function(num, index)
             {
            return xScale(index)
        })
        .attr("cy", function(num)
             {
            console.log("num", num.grade);
            return yScale(num.grade)
        })
        .attr("r", 3)
        */
        
    
   // drawArray(array2D, xScale, yScale, 0)
     drawArray(array2D, xScale, yScale, 0)
    
}




var drawArray = function(array2D, xScale, yScale, index)
{
    //d3.selectAll("circle")
    //.remove()
    var quizzes = d3.select("#graph")
        .selectAll("circle")
        .data(array2D[index].quizes)
        //.attr("transform", "translate(25)")
        .transition()
       
        .attr("fill", "black")
        .attr("cx", function(num, index)
             {
            return xScale(index)
        })
        .attr("cy", function(num)
             {
            console.log("num", num.grade);
            return yScale(num.grade)
        })
        .attr("r", 3)
}

