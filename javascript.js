var screen = {width: 600, height: 500}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var svg = d3.select("svg")

var penguinNoise = document.getElementById("penguinSound")

var playPenguinNoise = penguinNoise.play();

var selectedShape = prompt("Would you like the data to be displayed in circles or images? Type 'circle' or 'image'", "circle");

if (document.getElementById('circleSelected').checked) {
  selectedShape = document.getElementById('circleSelected').value;
}
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
    if (document.getElementById('circleSelected').checked == true) 
    {
        selectedShape = "circle"
    }
    console.log("selectedshape", selectedShape)
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
    
        quizzes.append(selectedShape)
        .attr("href", "star.jpeg")
        .attr("height", "12px")
        .attr("fill", "black")
        .attr("x", function(num, index)
             {
            return xScale(index) - 100
        })
        .attr("y", function(num)
             {
            
            return yScale(num.grade)
        })
        .attr("cx", function(num, index)
             {
            return xScale(index)
        })
        .attr("cy", function(num)
             {
            //console.log("num", num.grade);
            return yScale(num.grade)
        })
        .attr("r", 13)
    
        .on("mouseover", function(quiz, index)
            {
                //console.log("grade", quiz.grade)
                //console.log("day", quiz.day)
                
                
                svg.selectAll("#info")  
                    .remove()
            
                svg.selectAll("text")                           .data(array2D[0].quizes)
                    .enter()
                    .append("text")
                    .text("Day: " + quiz.day + " " + "Grade: " + quiz.grade)
                    .attr("style", "font-size: 10px")
                    .attr("id", "info")
                    .attr("x", xScale(quiz.day))
                    .attr("y", function(){
                    if(quiz.grade < 10){    
                    return yScale(quiz.grade)
                    }else{
                        return yScale(quiz.grade) + 30
                    }
                                         })
                    //.text(quiz.day)
            })
        
    
        //an attempt at getting images in the svg
        /*d3.select("svg").append("image")
            .attr("href", "star.jpeg")
            .attr("height", "15px")
            */
    
    
    
    d3.select(".imgs")
        .selectAll("img")
        .data(array2D)
        .enter()
        .append("img")
        .attr("src", function(penguin){
        //console.log("penguin", penguin)
        return "penguins/" + penguin.picture 
        }) 
    
    
        .on("click", function(penguin, index)
        {
            svg.selectAll("#info")  
                    .remove()
        
            var sound1 = document.getElementById("selectSound");
            sound1.play();
        
            if (document.getElementById('circleSelected').checked == true) 
            {
        selectedShape = "circle"
            }
            console.log("selectedshape", selectedShape)
        
        
            d3.selectAll("#graph g")
                .remove()
        
        
            console.log("click", penguin)
            console.log("index", index)
        
        
            drawArray(array2D, xScale, yScale, index)
             
        
        
            d3.selectAll(".selectPenguin img")
                .remove()
        
//            d3.select(".selectPenguin")
//                .append("img")
//                .attr("src", "penguins/" + penguin.picture)
        
            drawSelectedPenguin(penguin)
          })
     drawArray(array2D, xScale, yScale, 0)
    
}




var drawArray = function(array2D, xScale, yScale, index)
{
    //d3.selectAll("circle")
    //.remove()
    
    
    var quizzes = d3.select("#graph")
        .selectAll(selectedShape)
        .data(array2D[index].quizes)
        //.attr("transform", "translate(25)")
        .transition()
        .duration(500)
        .attr("fill", "black")
        .attr("cx", function(num, index)
             {
            return xScale(index)
        })
        .attr("cy", function(num)
             {
            //console.log("num", num.grade);
            return yScale(num.grade)
        })
        .attr("x", function(num, index)
             {
            return xScale(index)
        })
        .attr("y", function(num)
             {
            //console.log("num", num.grade);
            return yScale(num.grade) - 5 //-5 so that they are centered vertically 
        })
        .attr("r", 5)
}

var drawSelectedPenguin = function(penguin){
    
    
    d3.select(".selectPenguin")
                .append("img")
                .on("click", function(){
                penguinNoise.play()
        })
                .attr("src", "penguins/" + penguin.picture)
                 
            
}