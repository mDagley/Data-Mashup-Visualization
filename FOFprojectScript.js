 google.charts.load('current', {
        callback: drawMap,
        packages:['geochart','table','corechart']
    });
   
var chartwidth1 = $('#leftContent1').width();
var chartwidth2 = $('#leftContent5').width();
    //var data = null;
    var chartData = null;

    // The 'drawMap' callback function to setup all visualizations on load initalization and reprocess on other calls...
    function drawMap() {
        // Query, service, and url
        var container = document.getElementById('leftContent1');
        container.innerHTML = '<img src="https://data-gov.tw.rpi.edu/images/ajax-loader.gif" /><br /><br />Please wait... The query may take some time to complete.';
        clear_td();
        var container = document.getElementById('leftContent2');
        container.innerHTML = '<img src="https://data-gov.tw.rpi.edu/images/ajax-loader.gif" /><br /><br />Please wait... The query may take some time to complete.';
        clear_td();
        var container = document.getElementById('leftContent3');
        container.innerHTML = '<img src="https://data-gov.tw.rpi.edu/images/ajax-loader.gif" /><br /><br />Please wait... The query may take some time to complete.';
        clear_td();
        var container = document.getElementById('leftContent4');
        container.innerHTML = '<img src="https://data-gov.tw.rpi.edu/images/ajax-loader.gif" /><br /><br />Please wait... The query may take some time to complete.';
        clear_td();
        var container = document.getElementById('leftContent5');
        container.innerHTML = '<img src="https://data-gov.tw.rpi.edu/images/ajax-loader.gif" /><br /><br />Please wait... The query may take some time to complete.';
        clear_td();
        var container = document.getElementById('leftContent6');
        container.innerHTML = '<img src="https://data-gov.tw.rpi.edu/images/ajax-loader.gif" /><br /><br />Please wait... The query may take some time to complete.';
        clear_td();
        

        //------------------------------------------------------------
        // Query Strings
        //------------------------------------------------------------

        

        var querytxt1 = "PREFIX ds353:  <http://data-gov.tw.rpi.edu/vocab/p/353/>" +
		 	            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" + 
		 	            "SELECT ?state_abbrv ?number_of_books " + 
		 	            "WHERE { " + 
			  	        "         ?entry ds353:phys_st ?state_abbrv ." + 
			  	        "         ?entry ds353:bkservol ?number_of_books ." + 
 			            "} order by ?state_abbrv";
        
        var querytxt2 = "PREFIX ds353: <http://data-gov.tw.rpi.edu/vocab/p/353/>" + 
		 	            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" + 
			            "SELECT ?state_abbrv ?number_of_books ?state_population " +
 			            "WHERE { " +
 			 	        "         ?entry ds353:phys_st ?state_abbrv ." + 
                        "         ?entry ds353:bkservol ?number_of_books ." +
 			 	        "         ?entry ds353:popu_st ?state_population ." +     
 			            "} order by ?state_abbrv ";
        
        var querytxt3 =  "PREFIX ds1356: <http://data-gov.tw.rpi.edu/vocab/p/1356/>" + 
			             "SELECT ?state_abbrv ?adj_gross_inc " + 
			             "WHERE { " + 
				         "      ?s ds1356:county_code '000' ." + 
				         "      ?s ds1356:year '2007' ." + 
				         "      ?s ds1356:state_abbrv ?state_abbrv ." + 
				         "      ?s ds1356:agi ?adj_gross_inc ." + 
			             "} order by ?state_abbrv ";
        
        var querytxt4 = "PREFIX ds353: <http://data-gov.tw.rpi.edu/vocab/p/353/>" + 
		  	            "PREFIX ds1356: <http://data-gov.tw.rpi.edu/vocab/p/1356/>" + 
			            "SELECT ?state_abbrv ?adj_gross_inc  ?state_population " + 
			            "WHERE { " + 
				        "       ?entry ds353:phys_st ?state_abbrv ." + 
				        "       ?entry ds353:popu_st ?state_population ." + 
				        "       ?entry ds353:bkservol ?num_books_per_state ." + 
				        "       ?s ds1356:county_code '000' ." + 
				        "       ?s ds1356:year '2007' ." + 
				        "       ?s ds1356:state_abbrv ?state_abbrv ." + 
				        "       ?s ds1356:agi ?adj_gross_inc ." + 
			            "} order by ?state_abbrv "; 
        
        var querytxt5 = "PREFIX ds353: <http://data-gov.tw.rpi.edu/vocab/p/353/>" + 
		  	            "PREFIX ds1356: <http://data-gov.tw.rpi.edu/vocab/p/1356/>" + 
                        "PREFIX ds10035: <http://data-gov.tw.rpi.edu/vocab/p/10035/> " +    
			            "SELECT ?state_abbrv ?adj_gross_inc ?state_population ?num_lib_visits ?poverty_percent " + 
			            "WHERE { " + 
				        "       ?entry ds353:phys_st ?state_abbrv ." + 
				        "       ?entry ds353:popu_st ?state_population ." + 
				        "       ?entry ds353:libvists ?num_lib_visits ." + 
				        "       ?s ds1356:county_code '000' ." + 
				        "       ?s ds1356:year '2007' ." + 
				        "       ?s ds1356:state_abbrv ?state_abbrv ." + 
				        "       ?s ds1356:agi ?adj_gross_inc ." + 
                        "       ?q ds10035:state_abbrv ?state_abbrv ." +
                        "       ?q ds10035:below_100_of_poverty_percent ?poverty_percent ." +
			            "} order by ?state_abbrv "; 
        
        var querytxt6 = "PREFIX ds353: <http://data-gov.tw.rpi.edu/vocab/p/353/>" + 
		  	            "PREFIX ds1356: <http://data-gov.tw.rpi.edu/vocab/p/1356/>" + 
			            "SELECT ?state_abbrv ?adj_gross_inc  ?state_aid_to_lib ?state_population " + 
			            "WHERE { " + 
				        "       ?entry ds353:phys_st ?state_abbrv ." + 
				        "       ?entry ds353:popu_st ?state_population ." + 
				        "       ?entry ds353:siaidlib ?state_aid_to_lib ." + 
				        "       ?s ds1356:county_code '000' ." + 
				        "       ?s ds1356:year '2007' ." + 
				        "       ?s ds1356:state_abbrv ?state_abbrv ." + 
				        "       ?s ds1356:agi ?adj_gross_inc ." + 
			            "} order by ?state_abbrv "; 
        
        //Send each query to the xmlquery function to convert to JSON and process
        xmlquery(querytxt1, 1);
        xmlquery(querytxt2, 2);
        xmlquery(querytxt3, 3);
        xmlquery(querytxt4, 4);
        xmlquery(querytxt5, 5);
        xmlquery(querytxt6, 6);

     function xmlquery(querytxt, id){
        var queryurl = "http://localhost:3030/ds/query?output=xml&" +
                        "query=" + encodeURIComponent(querytxt);
        var xmlquery = new XMLHttpRequest(); // ...AJAX object instantiation

        xmlquery.open('GET', queryurl);

        // probably need these headers
        xmlquery.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
        xmlquery.setRequestHeader ("Accept", "application/sparql-results+xml");

        // Set up callback to get the response asynchronously...
        xmlquery.onreadystatechange = function () {
            if (xmlquery.readyState == 4) {
                if (xmlquery.status == 200) {
                    // Results are in a string in 'xmlhttp.responseText', but we can't return it from this sub-function,
                    //   so work on it here...
                    strRespQ1 = new XMLSerializer().serializeToString( convertXML2GVDS( xmlquery.responseXML ) );
                    strJSON = strRespQ1.replace(/(^google\.visualization\.Query\.setResponse\(|\)$)/g,'');
                    objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g; // ...look for object names
                    strJSONnew = strJSON.replace( objKeysRegex, "$1\"$2\":" ); // ...all object names should be double quoted
                    strJSON = strJSONnew.replace(/\'/g, "\""); // ...replace single quote with double quote
                    strJSONnew = strJSON.replace(/(:|\{)0+([1-9][0-9]*|0)/g, "\$1\$2"); // ...remove leading 0s from integer values
                    strJSONnew = strJSONnew.replace(/\\n/g, "\\n")  
                                            .replace(/\\'/g, "\\'")
                                            .replace(/\\"/g, '\\"')
                                            .replace(/\\&/g, "\\&")
                                            .replace(/\\r/g, "\\r")
                                            .replace(/\\t/g, "\\t")
                                            .replace(/\\b/g, "\\b")
                                            .replace(/\\f/g, "\\f")
                                            .replace(/[\u0000-\u0019]+/g,"");
                    //alert(strJSONnew);
                    objJSON = JSON.parse( strJSONnew ) ;
                    data = new google.visualization.DataTable( objJSON.table );
                    //alert( data.toJSON() );
                    if(id == 1){
                    handleQuery1Response( data );
                    }
                    if(id == 2){
                    handleQuery2Response( data );
                    }
                    if(id == 3){
                    handleQuery3Response( data );
                    }
                    if(id == 4){
                    handleQuery4Response( data );
                    }
                    if(id == 5){
                    handleQuery5Response( data );
                        //alert( data.toJSON() );
                    }
                    if(id == 6){
                    handleQuery6Response( data );
                        //alert( data.toJSON() );
                    }
                }
                else {
                    // Some kind of error occurred...
                    alert("Sparql query error: " + xmlquery.status + " " + xmlquery.responseText);
                }
            }
        }

        // Send the query to the endpoint.
        xmlquery.send();
     }
        };
    
      
      function clear_td() {
        var tds = document.getElementsByTagName('div.leftContent');
        var num = tds.length;
        for(var i = 0; i < num; i++) {
            tds[i].setAttribute('style','');
        }
    };

function handleQuery1Response(data) {
        // Make sure our data isn't empty.
        if (null == data)
            return;
        var rows = data.getNumberOfRows();
        if (rows == 0)
            return;
        //alert( data.toJSON() );

        var container = document.getElementById('leftContent1');
        var newdata = new google.visualization.DataTable();
        newdata.addColumn('string', 'State');
        newdata.addColumn('number', 'Books Per State');
        var state_temp = data.getValue(0,0);
        var number_of_books = 0;
        

        for (var i = 0; i < rows; i++ )
        {
            if (state_temp == data.getValue(i,0)) {
                number_of_books += data.getValue(i,1);
                
            }
            else {
                var name = stateLookup(state_temp);
                newdata.addRow([name,(number_of_books)]);

                state_temp = data.getValue(i,0);
                number_of_books = 0;
                number_of_books += data.getValue(i,1);
                
            }
        }
        var name = stateLookup(state_temp);
        newdata.addRow([name,(number_of_books)]);

        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            width: chartwidth1,
            height: '400',
            colorAxis: {colors:
                [	'#FF0000','#FF1100','#FF2200','#FF3300','#FF4400',
                    '#FF5500','#FF6600','#FF7700','#FF8800','#FF9900',
                    '#FFAA00','#FFBB00','#FFCC00','#FFDD00','#FFEE00',
                    '#FFFF00','#EEFF00','#DDFF00','#CCFF00','#BBFF00',
                    '#AAFF00','#99FF00','#88FF00','#77FF00','#66FF00',
                    '#55FF00','#44FF00','#33FF00','#22FF00','#11FF00',
                    '#00FF00'
                ]},
            };

        var geomap = new google.visualization.GeoChart(container);
        //alert(newdata.toJSON());
        geomap.draw(newdata, options);

        

    }
      
      
    function handleQuery2Response(data) {
        // Make sure our data isn't empty.
        if (null == data)
            return;
        var rows = data.getNumberOfRows();
        if (rows == 0)
            return;
        //alert( data.toJSON() );

        var container = document.getElementById('leftContent2');
        var newdata = new google.visualization.DataTable();
        newdata.addColumn('string', 'State');
        newdata.addColumn('number', 'Books Per State');
        var state_temp = data.getValue(0,0);
        var number_of_books = 0;
        var state_population = 0;

        for (var i = 0; i < rows; i++ )
        {
            if (state_temp == data.getValue(i,0)) {
                number_of_books += data.getValue(i,1);
                state_population += data.getValue(i,2);
            }
            else {
                var name = stateLookup(state_temp);
                newdata.addRow([name,(number_of_books / state_population)]);

                state_temp = data.getValue(i,0);
                state_population = 0;
                number_of_books = 0;
                number_of_books += data.getValue(i,1);
                state_population += data.getValue(i,2);
            }
        }
        var name = stateLookup(state_temp);
        newdata.addRow([name,(number_of_books /state_population)]);

        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            width: chartwidth1,
            height: '400',
            colorAxis: {colors:
                [	'#FF0000','#FF1100','#FF2200','#FF3300','#FF4400',
                    '#FF5500','#FF6600','#FF7700','#FF8800','#FF9900',
                    '#FFAA00','#FFBB00','#FFCC00','#FFDD00','#FFEE00',
                    '#FFFF00','#EEFF00','#DDFF00','#CCFF00','#BBFF00',
                    '#AAFF00','#99FF00','#88FF00','#77FF00','#66FF00',
                    '#55FF00','#44FF00','#33FF00','#22FF00','#11FF00',
                    '#00FF00'
                ]},
            };

        var geomap = new google.visualization.GeoChart(container);
        //alert(newdata.toJSON());
        geomap.draw(newdata, options);

        

    }
      
      //QUERY RESPONSE 3 HANDLER
      function handleQuery3Response(data) {
        // Make sure our data isn't empty.
        if (null == data)
            return;
        var rows = data.getNumberOfRows();
        if (rows == 0)
            return;
        //alert( data.toJSON() );

        var container = document.getElementById('leftContent3');
        var newdata = new google.visualization.DataTable();
        newdata.addColumn('string', 'State');
        newdata.addColumn('number', 'Adjusted Gross Income');
        var state_temp = data.getValue(0,0);
        var adj_gross_income = 0;
        

        for (var i = 0; i < rows; i++ )
        {
            if (state_temp == data.getValue(i,0)) {
                adj_gross_income += data.getValue(i,1);
                
            }
            else {
                var name = stateLookup(state_temp);
                newdata.addRow([name,(adj_gross_income)]);

                state_temp = data.getValue(i,0);
                adj_gross_income = 0;
                adj_gross_income += data.getValue(i,1);
                
            }
        }
        var name = stateLookup(state_temp);
        newdata.addRow([name,(adj_gross_income)]);

        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            width: chartwidth1,
            height: '400',
            colorAxis: {colors:
                [	'#FF0000','#FF1100','#FF2200','#FF3300','#FF4400',
                    '#FF5500','#FF6600','#FF7700','#FF8800','#FF9900',
                    '#FFAA00','#FFBB00','#FFCC00','#FFDD00','#FFEE00',
                    '#FFFF00','#EEFF00','#DDFF00','#CCFF00','#BBFF00',
                    '#AAFF00','#99FF00','#88FF00','#77FF00','#66FF00',
                    '#55FF00','#44FF00','#33FF00','#22FF00','#11FF00',
                    '#00FF00'
                ]},
            };

        var geomap = new google.visualization.GeoChart(container);
        //alert(newdata.toJSON());
        geomap.draw(newdata, options);

        

    }
      
    //QUERY RESPONSE 4 HANDLER
      
    function handleQuery4Response(data) {
        // Make sure our data isn't empty.
        if (null == data)
            return;
        var rows = data.getNumberOfRows();
        if (rows == 0)
            return;
        //alert( data.toJSON() );

        var container = document.getElementById('leftContent4');
        var newdata = new google.visualization.DataTable();
        newdata.addColumn('string', 'State');
        newdata.addColumn('number', 'Adjusted Gross Income Per State Reading Population');
        var state_temp = data.getValue(0,0);
        var adj_gross_income = 0;
        var state_population = 0;

        for (var i = 0; i < rows; i++ )
        {
            if (state_temp == data.getValue(i,0)) {
                adj_gross_income += data.getValue(i,1);
                state_population += data.getValue(i,2);
            }
            else {
                var name = stateLookup(state_temp);
                newdata.addRow([name,(adj_gross_income / state_population)]);

                state_temp = data.getValue(i,0);
                state_population = 0;
                adj_gross_income = 0;
                adj_gross_income += data.getValue(i,1);
                state_population += data.getValue(i,2);
            }
        }
        var name = stateLookup(state_temp);
        newdata.addRow([name,(adj_gross_income /state_population)]);

        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            width: chartwidth1,
            height: '400',
            colorAxis: {colors:
                [	'#FF0000','#FF1100','#FF2200','#FF3300','#FF4400',
                    '#FF5500','#FF6600','#FF7700','#FF8800','#FF9900',
                    '#FFAA00','#FFBB00','#FFCC00','#FFDD00','#FFEE00',
                    '#FFFF00','#EEFF00','#DDFF00','#CCFF00','#BBFF00',
                    '#AAFF00','#99FF00','#88FF00','#77FF00','#66FF00',
                    '#55FF00','#44FF00','#33FF00','#22FF00','#11FF00',
                    '#00FF00'
                ]},
            
            };

        var geomap = new google.visualization.GeoChart(container);
        //alert(newdata.toJSON());
        geomap.draw(newdata, options);

        

    }
      
      //QUERY RESPONSE 5 HANDLER
      
    function handleQuery5Response(data) {
        // Make sure our data isn't empty.
        if (null == data)
            return;
        var rows = data.getNumberOfRows();
        if (rows == 0)
            return;
        //alert( data.toJSON() );

        var container = document.getElementById('leftContent5');
        var newdata = new google.visualization.DataTable();
        newdata.addColumn('string', 'State');
        newdata.addColumn('number', 'Adjusted Gross Income Per State Reading Population');
        newdata.addColumn('number', 'Library Visits Per Reading Population');
        newdata.addColumn('number', 'Poverty Percent Below 100');
        var state_temp = data.getValue(0,0);
        var adj_gross_income = 0;
        var state_population = 0;
        var num_lib_visits = 0;
        var poverty_percent = 0;

        for (var i = 0; i < rows; i++ )
        {
            if (state_temp == data.getValue(i,0)) {
                adj_gross_income += data.getValue(i,1);
                state_population += data.getValue(i,2);
                num_lib_visits += data.getValue(i, 3);
                poverty_percent += data.getValue(i, 4);
            }
            else {
                var name = stateLookup(state_temp);
                newdata.addRow([name,(adj_gross_income / state_population), ((num_lib_visits / state_population) * 100), poverty_percent]);
                state_temp = data.getValue(i,0);
                state_population = 0;
                adj_gross_income = 0;
                num_lib_visits = 0;
                poverty_percent = 0;
                adj_gross_income += data.getValue(i,1);
                state_population += data.getValue(i,2);
                num_lib_visits += data.getValue(i, 3);
                poverty_percent += data.getValue(i, 4);
            }
        }
        var name = stateLookup(state_temp);
          newdata.addRow([name,(adj_gross_income / state_population), ((num_lib_visits / state_population) * 100), poverty_percent]);

     var options = {
         
          title: 'Library Visiting Percent VS Adjusted Gross Income and Poverty Rates',
          
          legend: { position: 'right' },
          hAxis: {
              showTextEvery: 2,
              slantedText: true,
              slantedTextAngle: 30,},
         
         width: chartwidth2,
         height: 600,
         
        };

        var chart = new google.visualization.LineChart(container);

        chart.draw(newdata, options);


    }
      
       //QUERY RESPONSE 6 HANDLER
      
    function handleQuery6Response(data) {
        // Make sure our data isn't empty.
        if (null == data)
            return;
        var rows = data.getNumberOfRows();
        if (rows == 0)
            return;
        //alert( data.toJSON() );

        var container = document.getElementById('leftContent6');
        var newdata = new google.visualization.DataTable();
        newdata.addColumn('string', 'State');
        newdata.addColumn('number', 'Adjusted Gross Income');
        newdata.addColumn('number', 'State Aid to Library');
        newdata.addColumn('number', 'State Population');
        var state_temp = data.getValue(0,0);
        var adj_gross_income = 0;
        var state_population = 0;
        var state_aid_to_lib = 0;
        for (var i = 0; i < rows; i++ )
        {
            if (state_temp == data.getValue(i,0)) {
                adj_gross_income += data.getValue(i,1);
                state_aid_to_lib += data.getValue(i,2);
                state_population += data.getValue(i,3);
            }
            else {
                var name = stateLookup(state_temp);
                newdata.addRow([name,(adj_gross_income), (state_aid_to_lib), state_population]);
                state_temp = data.getValue(i,0);
                adj_gross_income = 0;
                state_aid_to_lib = 0;
                state_population = 0;
                adj_gross_income += data.getValue(i,1);
                state_aid_to_lib += data.getValue(i,2);
                state_population += data.getValue(i,3);
            }
        }
        var name = stateLookup(state_temp);
          newdata.addRow([name,(adj_gross_income), (state_aid_to_lib), state_population]);

     var options = {
         
          title: 'State Aid to Libraries VS Adjusted Gross Income',
          
          legend: { position: 'right' },
         hAxis: {
              showTextEvery: 2,
              slantedText: true,
              slantedTextAngle: 30,},
         
         
         width: chartwidth2,
         height: 600,
        };

        var chart = new google.visualization.LineChart(container);

        chart.draw(newdata, options);


    }
      
            function stateLookup(code) 
		{
			var map= {
				'AL': 'Alabama',
				'AK': 'Alaska',
				'AZ': 'Arizona',
				'AR': 'Arkansas',
				'CA': 'California',
				'CO': 'Colorado',
				'CT': 'Connecticut',
				'DE': 'Delaware',
				'DC': 'District Of Columbia',
				'FL': 'Florida',
				'GA': 'Georgia',
				'HI': 'Hawaii',
				'ID': 'Idaho',
				'IL': 'Illinois', 
				'IN': 'Indiana',
				'IA': 'Iowa',
				'KS': 'Kansas',
				'KY': 'Kentucky',
				'LA': 'Louisiana',
				'ME': 'Maine',
				'MD': 'Maryland',
				'MA': 'Massachusetts',
				'MI': 'Michigan',
				'MN': 'Minnesota',
				'MS': 'Mississippi',
				'MO': 'Missouri',
				'MT': 'Montana',
				'NE': 'Nebraska',
				'NV': 'Nevada',
				'NH': 'New Hampshire',
				'NJ': 'New Jersey',
				'NM': 'New Mexico',
				'NY': 'New York',
				'NC': 'North Carolina',
				'ND': 'North Dakota',
				'OH': 'Ohio',
				'OK': 'Oklahoma',
				'OR': 'Oregon',
				'PA': 'Pennsylvania',
				'RI': 'Rhode Island',
				'SC': 'South Carolina',
				'SD': 'South Dakota',
				'TN': 'Tennessee',
				'TX': 'Texas',
				'UT': 'Utah',
				'VT': 'Vermont',
				'VA': 'Virginia',
				'WA': 'Washington',
				'WV': 'West Virginia',
				'WI': 'Wisconsin',
				'WY': 'Wyoming',
				'YT': 'Yukon Territory',
			} 
			
			return map[code];
		};

// ================================================================================
// == Convert XML to Google Visualization                                        ==
// ================================================================================

    function convertXML2GVDS(xml) {
        // NOTE: See the XSLT Stylesheet Transform below this function
        //       It is used to transform the SPARQL XML results into Google Visualization JSON
        domParser = new DOMParser();
        xsl = domParser.parseFromString(sparql2json.innerHTML, "text/xml");

        // Code for IE...
        if (window.ActiveXObject)
        {
            resultDocument = xml.transformNode(xsl);
        }
        // Code for Chrome, Firefox, Opera, etc...
        else
        {
            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            resultDocument = xsltProcessor.transformToFragment(xml, document);
        }
        return resultDocument;
    }



  