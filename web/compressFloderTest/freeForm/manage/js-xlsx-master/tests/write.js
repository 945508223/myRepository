var data=[[1,2,3],[true,false,null,"sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"),"0.3"],["baz",null,"qux"]];var ws_name="SheetJS";var wscols=[{wch:6},{wch:7},{wch:10},{wch:20}];console.log("Sheet Name: "+ws_name);console.log("Data: ");for(var i=0;i!=data.length;++i)console.log(data[i]);console.log("Columns :");for(i=0;i!=wscols.length;++i)console.log(wscols[i]);if(typeof XLSX==="undefined"){try{XLSX=require("./")}catch(e){XLSX=require("../")}}function Workbook(){if(!(this instanceof Workbook))return new Workbook;this.SheetNames=[];this.Sheets={}}var wb=new Workbook;function datenum(e,o){if(o)e+=1462;var r=Date.parse(e);return(r-new Date(Date.UTC(1899,11,30)))/(24*60*60*1e3)}function sheet_from_array_of_arrays(e,o){var r={};var a={s:{c:1e7,r:1e7},e:{c:0,r:0}};for(var s=0;s!=e.length;++s){for(var t=0;t!=e[s].length;++t){if(a.s.r>s)a.s.r=s;if(a.s.c>t)a.s.c=t;if(a.e.r<s)a.e.r=s;if(a.e.c<t)a.e.c=t;var n={v:e[s][t]};if(n.v==null)continue;var l=XLSX.utils.encode_cell({c:t,r:s});if(typeof n.v==="number")n.t="n";else if(typeof n.v==="boolean")n.t="b";else if(n.v instanceof Date){n.t="n";n.z=XLSX.SSF._table[14];n.v=datenum(n.v)}else n.t="s";r[l]=n}}if(a.s.c<1e7)r["!ref"]=XLSX.utils.encode_range(a);return r}var ws=sheet_from_array_of_arrays(data);wb.SheetNames.push(ws_name);wb.Sheets[ws_name]=ws;ws["!cols"]=wscols;XLSX.writeFile(wb,"sheetjs.xlsx");