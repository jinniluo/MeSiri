var margin = {t:50,l:50,b:50,r:50},
    width = document.getElementById('plot').clientWidth-margin.l-margin.r,
    height = document.getElementById('plot').clientHeight-margin.t-margin.b;

var svg = d3.select('#plot')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b);



d3.queue()
    .defer(d3.csv, "./data/siri.csv",parseData)
    .defer(d3.csv, "./data/allo.csv",parseData)
    .await(function(error,siri, allo){
    
        if (error) throw error;
//        function go(){$( "#go" ).on("click",function(){draw(siri),console.log("go")});}
//        go()    
//            $( "#stop" ).on("click",function(){go().stop()});
        draw(siri,allo);
    });





function draw(siri,allo){   

        function go(i){$( "#go" ).click(function() {$( ".canvas" ).animate(initRounds(0,20) , 0 );console.log("go")});}
        go();
//        function stop(i){$( "#stop" ).on("click",function(){$( ".canvas" ).stop(go(i));console.log("stop")});}
//        stop();
    
//        $( "#stop" ).click(function() {go().stop();console.log("stop")});
//    
//        $( "#go" ).on("click",function(){$( ".canvas" ).animate(initRounds(0,20) , 0 ),console.log("go")});
//        $( "#stop" ).on("click",function(){$( ".canvas" ).stop(console.log("stop"))});
//    
//          
//*****************************************typed.js**********************************************//  
    
        
        //create div inside .user class with id #userTyped
        //iterate over the data and append 22 div under user
    
        for (i=0;i<siri.length;i++){
        if(i%2==0){
                    $(".user").append('<span id="userTyped'+i/2+'"></span>');
                    $(".user").append('<div id="userTyped-strings'+i/2+'"><p>'+siri[i].original+'</p></div>');}
        else{
                    $(".chatbot").append('<span id="botTyped'+Math.floor(i/2)+'"></span>');
                    $(".chatbot").append('<div id="botTyped-strings'+Math.floor(i/2)+'"><p>'+siri[i].original+'</p></div>');}        
        }

        //append div #emoji containing 5 images and set the transparency to 0
        $(".user")
        .append("<div class='emoji'><div id='joy'><img src='./graphs/joy.png'></div><div id='sad'><img src='./graphs/sad.png'></div><div id='anger'><img src='./graphs/anger.png'></div><div id='fear'><img src='./graphs/fear.png'></div><div id='disgust'><img src='./graphs/disgust.png'></div></div>"); 
    
        $(".chatbot")
        .append("<div class='emoji1'><div id='joy1'><img src='./graphs/joy.png'></div><div id='sad1'><img src='./graphs/sad.png'></div><div id='anger1'><img src='./graphs/anger.png'></div><div id='fear1'><img src='./graphs/fear.png'></div><div id='disgust1'><img src='./graphs/disgust.png'></div></div>");
    
        $("#joy").css("opacity",0);
        $("#sad").css("opacity",0);
        $("#anger").css("opacity",0);
        $("#fear").css("opacity",0);
        $("#disgust").css("opacity",0);   
    
    
        $("#joy1").css("opacity",0);
        $("#sad1").css("opacity",0);
        $("#anger1").css("opacity",0);
        $("#fear1").css("opacity",0);
        $("#disgust1").css("opacity",0); 
    

        console.log(siri);
    
//***************************************for loop****************************************************************//    
            function initRounds(i, end){
                console.log("gets started")
                

                    var round = i; 
                    function userTyped(tg, j){ 
                    console.log("user typed", tg,j)
                                ind = j*2;
                                $(tg).typed({
                                    stringsElement: $("#userTyped-strings"+j),
                                    startDelay:2000,
                                    typeSpeed: 30,
                                    backDelay: 0,
                                    loop: false,
                                    contentType: 'html', 
                                    cursorChar: "",
                                    loopCount: false,
                                    preStringTyped: function() {$("#userTyped"+(+j-1)).remove()
                                                                $(".sentiment").eq(2*j-1).css("opacity",.5)
                                                                $(".sentiment").eq(2*j).css("opacity",1)
                                                                $("#joy").animate({opacity:(Math.round(siri[ind].joy*10*2))/10},300,function(){}),
                                                                  $("#sad").animate({opacity: (Math.round(siri[ind].sadness*10*2))/10},300,function(){}),
                                                                  $("#anger").animate({opacity: (Math.round(siri[ind].anger*10*2))/10},300,function(){}),
                                                                  $("#fear").animate({opacity: (Math.round(siri[ind].fear*10*2))/10},300,function(){}),
                                                                  $("#disgust").animate({opacity: (Math.round(siri[ind].disgust*10*2))/10},300,function(){})},
//                                    onStringTyped: function(d,i){ 
//                                                                  },
                                    callback: function(){ botTyped(j); }

                                });  
                
                  }
                
                     function botTyped(e){ 
                            $("#botTyped"+e).typed({
                                stringsElement: $("#botTyped-strings"+e),
                                startDelay:2000,
                                typeSpeed: 30,
                                backDelay: 0,
                                loop: false,
                                contentType: 'html', 
                                cursorChar: "",
                                loopCount: false,
                                preStringTyped: function() {$("#botTyped"+(+e-1)).remove()
                                                            $(".sentiment").eq(2*e).css("opacity",.5)
                                                            $(".sentiment").eq(2*e + 1).css("opacity",1)
                                                            $("#joy1").animate({opacity: (Math.round(siri[3].joy*10*2))/10},300,function(){}),
                                                              $("#sad1").animate({opacity: (Math.round(siri[1+e*2].sadness*10*2))/10},300,function(){}),
                                                              $("#anger1").animate({opacity: (Math.round(siri[1+e*2].anger*10*2))/10},300,function(){}),
                                                              $("#fear1").animate({opacity: (Math.round(siri[1+e*2].fear*10*2))/10},300,function(){}),
                                                              $("#disgust1").animate({opacity: (Math.round(siri[1+e*2].disgust*10*2))/10},300,function(){})},
//                                onStringTyped: function(d,i){ $("#joy1").animate({opacity: (Math.round(siri[3].joy*10*2))/10},300,function(){}),
//                                                              $("#sad1").animate({opacity: (Math.round(siri[1+e*2].sadness*10*2))/10},300,function(){}),
//                                                              $("#anger1").animate({opacity: (Math.round(siri[1+e*2].anger*10*2))/10},300,function(){}),
//                                                              $("#fear1").animate({opacity: (Math.round(siri[1+e*2].fear*10*2))/10},300,function(){}),
//                                                              $("#disgust1").animate({opacity: (Math.round(siri[1+e*2].disgust*10*2))/10},300,function(){})},
                                callback: function(){ 
                                    console.log(e)
                                        userTyped("#userTyped" + (+e+1), e+1); 
                                    
                                }   
                            });  
                        }
                                  
                userTyped("#userTyped"+round,round);
                           
            }    
//    initRounds(0, 20);
 
  
    
//*****************************************d3.js*************************************************//    


//scale
            var xScale=d3.scaleLinear().domain([0,siri.length]).range([0,width-margin.l-margin.r]);
            var yScale=d3.scaleLinear().domain([-1,1]).range([0,150]);
    
           
            var Siri=svg.append('g').attr("class","siri");  
            var siri_line=svg.append('g').attr("class","siri line");

    
//sentiment questions    
            var tooltip = d3.select('#tooltip');
    
    
                        Siri
                        .selectAll('.circle').append('g').data(siri).enter()
                        .append('circle')
                        .attr("class","sentiment")
                        .attr('cx',function(d,i){if (i%2==0) {return xScale(i);} else {return xScale(i-1);}})
                        .attr('cy',function(d){return yScale(0-d.sentiment)})
                        .attr('r',function(d){if (d.type=="Questions") {return 5}else{return 8} })
                        .attr("transform","translate(" + 3*margin.l +"," + height/2+ ")")
                        .style("fill","none")
                        .style('opacity',0)
                        .style('stroke',function(d){if (d.type=="Questions") {return "#EE5C5C"}else{return "blue"} })
                        .style("stroke-width",4)
                        .on("mouseenter",function(d,i){  
                        
                                console.log(siri[i].type);
                                d3.select(this).transition().style("opacity",.9);
                                tooltip.transition().style("visibility","visible");
                                tooltip.select('#sentiment').html(d.sentiment);
                                tooltip.select('#original').html(d.original);
                                tooltip.select('#type').html(d.type);

//******************************change font style/color based on it's type********** to be solved****************//
//                                $('#original').attr("class",function(d,i){
//                                    if (this){return "questions"}
//                                    else{return "answers"}
//                                })
                            
                            })
                        .on("mousemove",function(d){

                                var xy = d3.mouse(document.getElementById('plot'));
                                tooltip
                                    .style('left',xy[0]+70+'px')
                                    .style('top',(xy[1])+1.5*height+50+'px');

                            })
                        .on("mouseleave",function(d){
                                d3.select(this).transition().style("opacity",.3);
                                tooltip
                                    .transition()
                                    .style("visibility","hidden");
                            
                                $("#original").removeAttr("class","change fonts")
                            });

                         

  
//******************************add line graphs to the dots********** to be solved****************//                      

           
                        var sentiment_neutral=siri_line
                        .append('line')
                        .attr("class","ticks")
                        .attr('x1',0)
                        .attr('y1',function(d){return yScale(0)})
                        .attr('x2',width+40)
                        .attr('y2',function(d){return yScale(0)})
                        .style('stroke','white')
                        .style('opacity',.8)
                        .attr("transform","translate(" + 2*margin.l +"," + height/2+ ")")
      
                        var sentiment_text=siri_line
                        .append('text')
                        .attr("class","ticks main")
                        .text("Sentiment")
                        .attr("x",-40)
                        .attr('y',function(d){return yScale(0)-60})
                        .style('opacity',.8)
                        .style('fill','white')
                        .attr("transform","translate(" + margin.l +"," + height/2 + ")");
    
                        var sentiment_positive=siri_line
                        .append('text')
                        .attr("class","ticks")
                        .text("Positive")
                        .attr("x",-30)
                        .attr('y',function(d){return yScale(0)-30})
                        .style('opacity',.8)
                        .style('fill','white')
                        .attr("transform","translate(" + margin.l +"," + height/2 + ")");
    
                        var sentiment_negative=siri_line
                        .append('text')
                        .attr("class","ticks")
                        .text("Negative")
                        .attr("x",-30)
                        .attr('y',function(d){return yScale(0)+34})
                        .style('opacity',.8)
                        .style('fill','white')
                        .attr("transform","translate(" + margin.l +"," + height/2 + ")");
                        
                        var sentiment_score=siri_line
                        .append('text')
                        .attr("class","ticks")
                        .text("Neutral")
                        .attr("x",-30)
                        .attr('y',function(d){return yScale(0)+4})
                        .style('opacity',.8)
                        .style('fill','white')
                        .attr("transform","translate(" + margin.l +"," + height/2 + ")");

          
      
}

function parseData(d){
    
     return{
//        id:+d.id,
        anger:+d.anger,
        disgust:+d.disgust,
        fear:+d.fear,
        joy:+d.joy,
        sadness:+d.sadness,
        relevance:+d.keywordRelevance,
        sentiment:+d.keywordSentimentScore,
        type:d.text_type,
        keyword:d.keywordText,
        original:d.originalText,
        lead:+d.lead}
    
    }