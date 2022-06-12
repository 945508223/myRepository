function add_rels(e,s,r,t,l){if(!l)l={};if(!e["!id"])e["!id"]={};l.Id="rId"+s;l.Type=t;l.Target=r;if(e["!id"][l.Id])throw new Error("Cannot rewrite rId "+s);e["!id"][l.Id]=l;e[("/"+l.Target).replace("//","/")]=l}function write_zip(e,s){if(e&&!e.SSF){e.SSF=SSF.get_table()}if(e&&e.SSF){make_ssf(SSF);SSF.load_table(e.SSF);s.revssf=evert_num(e.SSF);s.revssf[e.SSF[65535]]=0}s.rels={};s.wbrels={};s.Strings=[];s.Strings.Count=0;s.Strings.Unique=0;var r=s.bookType=="xlsb"?"bin":"xml";var t={workbooks:[],sheets:[],calcchains:[],themes:[],styles:[],coreprops:[],extprops:[],custprops:[],strs:[],comments:[],vba:[],TODO:[],rels:[],xmlns:""};fix_write_opts(s=s||{});var l=new jszip;var o="",i=0;s.cellXfs=[];get_cell_style(s.cellXfs,{},{revssf:{General:0}});o="docProps/core.xml";l.file(o,write_core_props(e.Props,s));t.coreprops.push(o);add_rels(s.rels,2,o,RELS.CORE_PROPS);o="docProps/app.xml";if(!e.Props)e.Props={};e.Props.SheetNames=e.SheetNames;e.Props.Worksheets=e.SheetNames.length;l.file(o,write_ext_props(e.Props,s));t.extprops.push(o);add_rels(s.rels,3,o,RELS.EXT_PROPS);if(e.Custprops!==e.Props&&keys(e.Custprops||{}).length>0){o="docProps/custom.xml";l.file(o,write_cust_props(e.Custprops,s));t.custprops.push(o);add_rels(s.rels,4,o,RELS.CUST_PROPS)}o="xl/workbook."+r;l.file(o,write_wb(e,o,s));t.workbooks.push(o);add_rels(s.rels,1,o,RELS.WB);for(i=1;i<=e.SheetNames.length;++i){o="xl/worksheets/sheet"+i+"."+r;l.file(o,write_ws(i-1,o,s,e));t.sheets.push(o);add_rels(s.wbrels,i,"worksheets/sheet"+i+"."+r,RELS.WS)}if(s.Strings!=null&&s.Strings.length>0){o="xl/sharedStrings."+r;l.file(o,write_sst(s.Strings,o,s));t.strs.push(o);add_rels(s.wbrels,++i,"sharedStrings."+r,RELS.SST)}o="xl/theme/theme1.xml";l.file(o,write_theme(s));t.themes.push(o);add_rels(s.wbrels,++i,"theme/theme1.xml",RELS.THEME);o="xl/styles."+r;l.file(o,write_sty(e,o,s));t.styles.push(o);add_rels(s.wbrels,++i,"styles."+r,RELS.STY);l.file("[Content_Types].xml",write_ct(t,s));l.file("_rels/.rels",write_rels(s.rels));l.file("xl/_rels/workbook."+r+".rels",write_rels(s.wbrels));return l}