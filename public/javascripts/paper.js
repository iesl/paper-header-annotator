/*
TODO change annot color based on label selection
TODO only display first-ish page
TODO cycle thru labels using tab key?
TODO display annotations somewhere for review
TODO "save doc" --> write annotations and etc out somewhere
 */

var labelColors = {
    "author": "red",
    "title": "blue",
    "email": "green",
    "abstract": "orange",
    "institution": "cyan",
    "address": "magenta"
};

var actions = [];

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

    /* toggle the color on mouseover */
    var currLabel;
    var stageStyle = "fill:gray;text-decoration:underline;";

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

    ///* Hit the keyboard or double click to commit annotation */
    //$(this).keypress(function() {
    //    var commitStyle = "fill:" + labelColors[currLabel] + ";text-decoration:none";
    //    d3.selectAll('.staged').attr('style', commitStyle).attr('class', 'selected').attr('id', currLabel);
    //    //var label = sel.attr('id');
    //    //var jq = '#'+label;
    //    //$(jq).append('<p>'+sel.text()+'</p>');
    //});
    $(this).dblclick(function() {
        if (currLabel == undefined) alert("select a label to annotate first");
        var commitStyle = "fill:" + labelColors[currLabel] + ";text-decoration:none";
        actions.push(d3.selectAll('.staged').attr('style', commitStyle).attr('class', 'selected').attr('id', currLabel));
        //actions.push(d3.selectAll('.selected'));
        //d3.selectAll('.staged').attr('class', 'selected').attr('id', currLabel);

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
    $('#undo-button').click(function() {
       var sel = actions.pop();
        console.log(sel[0][0]);
        d3.select(sel[0][0]).attr('style', null).attr('class', '');
    });
    $('form').submit(function() {
        var checked = $('input:radio:checked').val();
        currLabel = checked;
        var newTxt = '<div id=curr-label>annotating: <span class="inner" id="' + checked + '">' + checked + '</span></div>';
        $('#curr-label').replaceWith(newTxt);
        //console.log(newTxt);
        ////$('#curr-label').text("currently annotating: ");
        //console.log($('#curr-label.inner'));
        //$('#curr-label.inner').replaceWith(newTxt);
        $('#clear-button').click();
        return false;
    });

});
