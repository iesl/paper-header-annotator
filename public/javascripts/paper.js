$(document).ready(function() {
    function printMe(selection) {
        console.log(selection[0].length);
        for (var i = 0; i < selection[0].length; i++) {
            var sel = d3.select(selection[0][i]);
            console.log(sel.text());
            console.log(sel.attr('x'));
            //console.log(sel);
            //console.log(sel.html());
            //console.log(sel.attr('id'));
            //var label = sel.attr('id');
            //annots[label].push(sel);

        }
    }

    /* toggle the color on mouseover
     * TODO change color based on label selection
     * */
    var currLabel = "author";
    var stageStyle = "fill:gray;text-decoration:underline;";
    var commitStyle = "fill:red;text-decoration:none";
    d3.selectAll('svg tspan')
        .on('mouseover', function() {
            var sel = d3.select(this);
            //sel.append('svg:rect')
            //    .attr('x', sel.attr('x'))
            //    .attr('y', sel.attr('y'))
            //    .attr('width', sel.attr('textLength'))
            //    .attr('style', 'fill:red;');
            var currStyle = sel.attr('style');
            if (currStyle == null) {
                sel.attr('style', stageStyle).attr('class', 'staged')
            } else if (currStyle == stageStyle) {
                sel.attr('style', null).attr('class', '');
            }
        });

    /* Hit the keyboard to double click to commit annotation */
    $(this).keypress(function() {
        d3.selectAll('.staged').attr('style', commitStyle).attr('class', 'selected').attr('id', currLabel);
        //var label = sel.attr('id');
        //var jq = '#'+label;
        //$(jq).append('<p>'+sel.text()+'</p>');
    });
    $(this).dblclick(function() {
        d3.selectAll('.staged').attr('style', commitStyle).attr('class', 'selected').attr('id', currLabel);
    });

    /* buttons */
    $('#list-button').click(function() {
        d3.selectAll('.selected').call(printMe);
    });
    $('#clear-button').click(function() {
        d3.selectAll('.staged').attr('style', null).attr('class', '');
    });
    $('#refresh-button').click(function() {
        d3.selectAll('.staged').attr('style', null).attr('class', '');
        d3.selectAll('.selected').attr('style', null).attr('class', '');
    });

});
