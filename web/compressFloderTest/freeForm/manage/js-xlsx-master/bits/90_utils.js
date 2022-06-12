function decode_row(e){return parseInt(unfix_row(e),10)-1}function encode_row(e){return""+(e+1)}function fix_row(e){return e.replace(/([A-Z]|^)(\d+)$/,"$1$$$2")}function unfix_row(e){return e.replace(/\$(\d+)$/,"$1")}function decode_col(e){var r=unfix_col(e),n=0,o=0;for(;o!==r.length;++o)n=26*n+r.charCodeAt(o)-64;return n-1}function encode_col(e){var r="";for(++e;e;e=Math.floor((e-1)/26))r=String.fromCharCode((e-1)%26+65)+r;return r}function fix_col(e){return e.replace(/^([A-Z])/,"$$$1")}function unfix_col(e){return e.replace(/^\$([A-Z])/,"$1")}function split_cell(e){return e.replace(/(\$?[A-Z]*)(\$?\d*)/,"$1,$2").split(",")}function decode_cell(e){var r=split_cell(e);return{c:decode_col(r[0]),r:decode_row(r[1])}}function encode_cell(e){return encode_col(e.c)+encode_row(e.r)}function fix_cell(e){return fix_col(fix_row(e))}function unfix_cell(e){return unfix_col(unfix_row(e))}function decode_range(e){var r=e.split(":").map(decode_cell);return{s:r[0],e:r[r.length-1]}}function encode_range(e,r){if(r===undefined||typeof r==="number")return encode_range(e.s,e.e);if(typeof e!=="string")e=encode_cell(e);if(typeof r!=="string")r=encode_cell(r);return e==r?e:e+":"+r}function safe_decode_range(e){var r={s:{c:0,r:0},e:{c:0,r:0}};var n=0,o=0,c=0;var t=e.length;for(n=0;o<t;++o){if((c=e.charCodeAt(o)-64)<1||c>26)break;n=26*n+c}r.s.c=--n;for(n=0;o<t;++o){if((c=e.charCodeAt(o)-48)<0||c>9)break;n=10*n+c}r.s.r=--n;if(o===t||e.charCodeAt(++o)===58){r.e.c=r.s.c;r.e.r=r.s.r;return r}for(n=0;o!=t;++o){if((c=e.charCodeAt(o)-64)<1||c>26)break;n=26*n+c}r.e.c=--n;for(n=0;o!=t;++o){if((c=e.charCodeAt(o)-48)<0||c>9)break;n=10*n+c}r.e.r=--n;return r}function safe_format_cell(e,r){if(e.z!==undefined)try{return e.w=SSF.format(e.z,r)}catch(e){}if(!e.XF)return r;try{return e.w=SSF.format(e.XF.ifmt||0,r)}catch(e){return""+r}}function format_cell(e,r){if(e==null||e.t==null)return"";if(e.w!==undefined)return e.w;if(r===undefined)return safe_format_cell(e,e.v);return safe_format_cell(e,r)}function sheet_to_json(e,r){var n,o,c,t=0,f=1,a,_=[],l,d,u,i;var s=r!=null?r:{};var h=s.raw;if(e==null||e["!ref"]==null)return[];c=s.range!==undefined?s.range:e["!ref"];if(s.header===1)t=1;else if(s.header==="A")t=2;else if(Array.isArray(s.header))t=3;switch(typeof c){case"string":a=safe_decode_range(c);break;case"number":a=safe_decode_range(e["!ref"]);a.s.r=c;break;default:a=c}if(t>0)f=0;var v=encode_row(a.s.r);var w=new Array(a.e.c-a.s.c+1);var m=new Array(a.e.r-a.s.r-f+1);var g=0;for(u=a.s.c;u<=a.e.c;++u){w[u]=encode_col(u);n=e[w[u]+v];switch(t){case 1:_[u]=u;break;case 2:_[u]=w[u];break;case 3:_[u]=s.header[u-a.s.c];break;default:if(n===undefined)continue;_[u]=format_cell(n)}}for(d=a.s.r+f;d<=a.e.r;++d){v=encode_row(d);l=true;if(t===1)o=[];else{o={};if(Object.defineProperty)Object.defineProperty(o,"__rowNum__",{value:d,enumerable:false});else o.__rowNum__=d}for(u=a.s.c;u<=a.e.c;++u){n=e[w[u]+v];if(n===undefined||n.t===undefined)continue;i=n.v;switch(n.t){case"e":continue;case"s":break;case"b":case"n":break;default:throw"unrecognized type "+n.t}if(i!==undefined){o[_[u]]=h?i:format_cell(n,i);l=false}}if(l===false||t===1)m[g++]=o}m.length=g;return m}function sheet_to_row_object_array(e,r){return sheet_to_json(e,r!=null?r:{})}function sheet_to_csv(e,r){var n="",o="",c=/"/g;var t=r==null?{}:r;if(e==null||e["!ref"]==null)return"";var f=safe_decode_range(e["!ref"]);var a=t.FS!==undefined?t.FS:",",_=a.charCodeAt(0);var l=t.RS!==undefined?t.RS:"\n",d=l.charCodeAt(0);var u="",i="",s=[];var h=0,v=0,w;var m=0,g=0;for(g=f.s.c;g<=f.e.c;++g)s[g]=encode_col(g);for(m=f.s.r;m<=f.e.r;++m){u="";i=encode_row(m);for(g=f.s.c;g<=f.e.c;++g){w=e[s[g]+i];o=w!==undefined?""+format_cell(w):"";for(h=0,v=0;h!==o.length;++h)if((v=o.charCodeAt(h))===_||v===d||v===34){o='"'+o.replace(c,'""')+'"';break}u+=(g===f.s.c?"":a)+o}n+=u+l}return n}var make_csv=sheet_to_csv;function sheet_to_formulae(e){var r,n="",o,c="";if(e==null||e["!ref"]==null)return"";var t=safe_decode_range(e["!ref"]),f="",a=[],_;r=new Array((t.e.r-t.s.r+1)*(t.e.c-t.s.c+1));var l=0;for(_=t.s.c;_<=t.e.c;++_)a[_]=encode_col(_);for(var d=t.s.r;d<=t.e.r;++d){f=encode_row(d);for(_=t.s.c;_<=t.e.c;++_){n=a[_]+f;o=e[n];c="";if(o===undefined)continue;if(o.f!=null)c=o.f;else if(o.w!==undefined)c="'"+o.w;else if(o.v===undefined)continue;else c=""+o.v;r[l++]=n+"="+c}}r.length=l;return r}var utils={encode_col:encode_col,encode_row:encode_row,encode_cell:encode_cell,encode_range:encode_range,decode_col:decode_col,decode_row:decode_row,split_cell:split_cell,decode_cell:decode_cell,decode_range:decode_range,format_cell:format_cell,get_formulae:sheet_to_formulae,make_csv:sheet_to_csv,make_json:sheet_to_json,make_formulae:sheet_to_formulae,sheet_to_csv:sheet_to_csv,sheet_to_json:sheet_to_json,sheet_to_formulae:sheet_to_formulae,sheet_to_row_object_array:sheet_to_row_object_array};