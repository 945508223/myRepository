function parse_cc_xml(a,c){var e=[];var r=0,i=1;(a.match(tagregex)||[]).forEach(function(a){var c=parsexmltag(a);switch(c[0]){case"<?xml":break;case"<calcChain":case"<calcChain>":case"</calcChain>":break;case"<c":delete c[0];if(c.i)i=c.i;else c.i=i;e.push(c);break}});return e}function write_cc_xml(a,c){}