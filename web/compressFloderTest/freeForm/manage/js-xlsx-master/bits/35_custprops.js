XMLNS.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";RELS.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";var custregex=/<[^>]+>[^<]*/g;function parse_cust_props(e,r){var t={},s;var a=e.match(custregex);if(a)for(var c=0;c!=a.length;++c){var n=a[c],o=parsexmltag(n);switch(o[0]){case"<?xml":break;case"<Properties":if(o.xmlns!==XMLNS.CUST_PROPS)throw"unrecognized xmlns "+o.xmlns;if(o.xmlnsvt&&o.xmlnsvt!==XMLNS.vt)throw"unrecognized vt "+o.xmlnsvt;break;case"<property":s=o.name;break;case"</property>":s=null;break;default:if(n.indexOf("<vt:")===0){var i=n.split(">");var l=i[0].substring(4),p=i[1];switch(l){case"lpstr":case"lpwstr":case"bstr":case"lpwstr":t[s]=unescapexml(p);break;case"bool":t[s]=parsexmlbool(p,"<vt:bool>");break;case"i1":case"i2":case"i4":case"i8":case"int":case"uint":t[s]=parseInt(p,10);break;case"r4":case"r8":case"decimal":t[s]=parseFloat(p);break;case"filetime":case"date":t[s]=new Date(p);break;case"cy":case"error":t[s]=unescapexml(p);break;default:if(typeof console!=="undefined")console.warn("Unexpected",n,l,i)}}else if(n.substr(0,2)==="</"){}else if(r.WTF)throw new Error(n)}}return t}var CUST_PROPS_XML_ROOT=writextag("Properties",null,{xmlns:XMLNS.CUST_PROPS,"xmlns:vt":XMLNS.vt});function write_cust_props(e,r){var t=[XML_HEADER,CUST_PROPS_XML_ROOT];if(!e)return t.join("");var s=1;keys(e).forEach(function r(a){++s;t[t.length]=writextag("property",write_vt(e[a]),{fmtid:"{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",pid:s,name:a})});if(t.length>2){t[t.length]="</Properties>";t[1]=t[1].replace("/>",">")}return t.join("")}