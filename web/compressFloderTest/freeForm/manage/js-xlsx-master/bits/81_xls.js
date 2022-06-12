function parse_compobj(e){var a={};var r=e.content;var s=28,c;c=__lpstr(r,s);s+=4+__readUInt32LE(r,s);a.UserType=c;c=__readUInt32LE(r,s);s+=4;switch(c){case 0:break;case 4294967295:case 4294967294:s+=4;break;default:if(c>400)throw new Error("Unsupported Clipboard: "+c.toString(16));s+=c}c=__lpstr(r,s);s+=c.length===0?0:5+c.length;a.Reserved1=c;if((c=__readUInt32LE(r,s))!==1907550708)return a;throw"Unsupported Unicode Extension"}function slurp(e,a,r,s){var c=r;var t=[];var o=a.slice(a.l,a.l+c);if(s&&s.enc&&s.enc.insitu_decrypt)switch(e.n){case"BOF":case"FilePass":case"FileLock":case"InterfaceHdr":case"RRDInfo":case"RRDHead":case"UsrExcl":break;default:if(o.length===0)break;s.enc.insitu_decrypt(o)}t.push(o);a.l+=c;var i=XLSRecordEnum[__readUInt16LE(a,a.l)];while(i!=null&&i.n==="Continue"){c=__readUInt16LE(a,a.l+2);t.push(a.slice(a.l+4,a.l+4+c));a.l+=4+c;i=XLSRecordEnum[__readUInt16LE(a,a.l)]}var b=bconcat(t);prep_blob(b,0);var n=0;b.lens=[];for(var l=0;l<t.length;++l){b.lens.push(n);n+=t[l].length}return e.f(b,b.length,s)}function safe_format_xf(e,a,r){if(!e.XF)return;try{var s=e.XF.ifmt||0;if(e.t==="e"){e.w=e.w||BErr[e.v]}else if(s===0){if(e.t==="n"){if((e.v|0)===e.v)e.w=SSF._general_int(e.v);else e.w=SSF._general_num(e.v)}else e.w=SSF._general(e.v)}else e.w=SSF.format(s,e.v,{date1904:r||false});if(a.cellNF)e.z=SSF._table[s]}catch(e){if(a.WTF)throw e}}function make_cell(e,a,r){return{v:e,ixfe:a,t:r}}function parse_workbook(e,a){var r={opts:{}};var s={};var c={};var t={};var o=false;var i={};var b=null;var n=[];var l="";var f={};var k,u,S,d,p,F,m;var v={};var h=[];var x;var C;var _=true;var D=[];var w=[];var g=function e(a){if(a<8)return XLSIcv[a];if(a<64)return w[a-8]||XLSIcv[a];return XLSIcv[a]};var P=function e(a,r){var s=r.XF.data;if(!s||!s.patternType)return;r.s={};r.s.patternType=s.patternType;var c;if(c=rgb2Hex(g(s.icvFore))){r.s.fgColor={rgb:c}}if(c=rgb2Hex(g(s.icvBack))){r.s.bgColor={rgb:c}}};var E=function e(a,r,s){if(!_)return;if(s.cellStyles&&r.XF&&r.XF.data)P(a,r);k=a;u=encode_cell(a);if(i.s){if(a.r<i.s.r)i.s.r=a.r;if(a.c<i.s.c)i.s.c=a.c}if(i.e){if(a.r+1>i.e.r)i.e.r=a.r+1;if(a.c+1>i.e.c)i.e.c=a.c+1}if(s.sheetRows&&k.r>=s.sheetRows)_=false;else c[u]=r};var I={enc:false,sbcch:0,snames:[],sharedf:v,arrayf:h,rrtabid:[],lastuser:"",biff:8,codepage:0,winlocked:0,wtf:false};if(a.password)I.password=a.password;var X=[];var y=[];var L=[[]];var R=0,B=0,T=0;L.SheetNames=I.snames;L.sharedf=I.sharedf;L.arrayf=I.arrayf;var A="";var M=0;I.codepage=1200;set_cp(1200);while(e.l<e.length-1){var O=e.l;var U=e.read_shift(2);if(U===0&&A==="EOF")break;var N=e.l===e.length?0:e.read_shift(2),W;var H=XLSRecordEnum[U];if(H&&H.f){if(a.bookSheets){if(A==="BoundSheet8"&&H.n!=="BoundSheet8")break}A=H.n;if(H.r===2||H.r==12){var j=e.read_shift(2);N-=2;if(!I.enc&&j!==U)throw"rt mismatch";if(H.r==12){e.l+=10;N-=10}}var V;if(H.n==="EOF")V=H.f(e,N,I);else V=slurp(H,e,N,I);var G=H.n;if(I.biff===5||I.biff===2)switch(G){case"Lbl":G="Label";break}switch(G){case"Date1904":r.opts.Date1904=V;break;case"WriteProtect":r.opts.WriteProtect=true;break;case"FilePass":if(!I.enc)e.l=0;I.enc=V;if(I.WTF)console.error(V);if(!a.password)throw new Error("File is password-protected");if(V.Type!==0)throw new Error("Encryption scheme unsupported");if(!V.valid)throw new Error("Password is incorrect");break;case"WriteAccess":I.lastuser=V;break;case"FileSharing":break;case"CodePage":if(V===21010)V=1200;else if(V===32769)V=1252;I.codepage=V;set_cp(V);break;case"RRTabId":I.rrtabid=V;break;case"WinProtect":I.winlocked=V;break;case"Template":break;case"RefreshAll":r.opts.RefreshAll=V;break;case"BookBool":break;case"UsesELFs":break;case"MTRSettings":{if(V[0]&&V[1])throw"Unsupported threads: "+V}break;case"CalcCount":r.opts.CalcCount=V;break;case"CalcDelta":r.opts.CalcDelta=V;break;case"CalcIter":r.opts.CalcIter=V;break;case"CalcMode":r.opts.CalcMode=V;break;case"CalcPrecision":r.opts.CalcPrecision=V;break;case"CalcSaveRecalc":r.opts.CalcSaveRecalc=V;break;case"CalcRefMode":I.CalcRefMode=V;break;case"Uncalced":break;case"ForceFullCalculation":r.opts.FullCalc=V;break;case"WsBool":break;case"XF":D.push(V);break;case"ExtSST":break;case"BookExt":break;case"RichTextStream":break;case"BkHim":break;case"SupBook":L[++R]=[V];B=0;break;case"ExternName":L[R][++B]=V;break;case"Index":break;case"Lbl":L[0][++T]=V;break;case"ExternSheet":L[R]=L[R].concat(V);B+=V.length;break;case"Protect":c["!protect"]=V;break;case"Password":if(V!==0&&I.WTF)console.error("Password verifier: "+V);break;case"Prot4Rev":case"Prot4RevPass":break;case"BoundSheet8":{t[V.pos]=V;I.snames.push(V.name)}break;case"EOF":{if(--M)break;if(i.e){c["!range"]=i;if(i.e.r>0&&i.e.c>0){i.e.r--;i.e.c--;c["!ref"]=encode_range(i);i.e.r++;i.e.c++}if(X.length>0)c["!merges"]=X;if(y.length>0)c["!objects"]=y}if(l==="")f=c;else s[l]=c;c={}}break;case"BOF":{if(I.biff!==8);else if(V.BIFFVer===1280)I.biff=5;else if(V.BIFFVer===2)I.biff=2;else if(V.BIFFVer===7)I.biff=2;if(M++)break;_=true;c={};if(I.biff===2){if(l==="")l="Sheet1";i={s:{r:0,c:0},e:{r:0,c:0}}}else l=(t[O]||{name:""}).name;X=[];y=[]}break;case"Number":case"BIFF2NUM":{x={ixfe:V.ixfe,XF:D[V.ixfe],v:V.val,t:"n"};if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E({c:V.c,r:V.r},x,a)}break;case"BoolErr":{x={ixfe:V.ixfe,XF:D[V.ixfe],v:V.val,t:V.t};if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E({c:V.c,r:V.r},x,a)}break;case"RK":{x={ixfe:V.ixfe,XF:D[V.ixfe],v:V.rknum,t:"n"};if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E({c:V.c,r:V.r},x,a)}break;case"MulRk":{for(var Q=V.c;Q<=V.C;++Q){var z=V.rkrec[Q-V.c][0];x={ixfe:z,XF:D[z],v:V.rkrec[Q-V.c][1],t:"n"};if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E({c:Q,r:V.r},x,a)}}break;case"Formula":{switch(V.val){case"String":b=V;break;case"Array Formula":throw"Array Formula unsupported";default:x={v:V.val,ixfe:V.cell.ixfe,t:V.tt};x.XF=D[x.ixfe];if(a.cellFormula)x.f="="+stringify_formula(V.formula,i,V.cell,L,I);if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E(V.cell,x,a);b=V}}break;case"String":{if(b){b.val=V;x={v:b.val,ixfe:b.cell.ixfe,t:"s"};x.XF=D[x.ixfe];if(a.cellFormula)x.f="="+stringify_formula(b.formula,i,b.cell,L,I);if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E(b.cell,x,a);b=null}}break;case"Array":{h.push(V)}break;case"ShrFmla":{if(!_)break;v[encode_cell(b.cell)]=V[0]}break;case"LabelSst":x=make_cell(n[V.isst].t,V.ixfe,"s");x.XF=D[x.ixfe];if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E({c:V.c,r:V.r},x,a);break;case"Label":case"BIFF2STR":x=make_cell(V.val,V.ixfe,"s");x.XF=D[x.ixfe];if(x.XF)safe_format_xf(x,a,r.opts.Date1904);E({c:V.c,r:V.r},x,a);break;case"Dimensions":{if(M===1)i=V}break;case"SST":{n=V}break;case"Format":{SSF.load(V[1],V[0])}break;case"MergeCells":X=X.concat(V);break;case"Obj":y[V.cmo[0]]=I.lastobj=V;break;case"TxO":I.lastobj.TxO=V;break;case"HLink":{for(m=V[0].s.r;m<=V[0].e.r;++m)for(F=V[0].s.c;F<=V[0].e.c;++F)if(c[encode_cell({c:F,r:m})])c[encode_cell({c:F,r:m})].l=V[1]}break;case"HLinkTooltip":{for(m=V[0].s.r;m<=V[0].e.r;++m)for(F=V[0].s.c;F<=V[0].e.c;++F)if(c[encode_cell({c:F,r:m})])c[encode_cell({c:F,r:m})].l.tooltip=V[1]}break;case"Note":{if(I.biff<=5&&I.biff>=2)break;S=c[encode_cell(V[0])];var K=y[V[2]];if(!S)break;if(!S.c)S.c=[];d={a:V[1],t:K.TxO.t};S.c.push(d)}break;default:switch(H.n){case"ClrtClient":break;case"XFExt":update_xfext(D[V.ixfe],V.ext);break;case"NameCmt":break;case"Header":break;case"Footer":break;case"HCenter":break;case"VCenter":break;case"Pls":break;case"Setup":break;case"DefColWidth":break;case"GCW":break;case"LHRecord":break;case"ColInfo":break;case"Row":break;case"DBCell":break;case"MulBlank":break;case"EntExU2":break;case"SxView":break;case"Sxvd":break;case"SXVI":break;case"SXVDEx":break;case"SxIvd":break;case"SXDI":break;case"SXLI":break;case"SXEx":break;case"QsiSXTag":break;case"Selection":break;case"Feat":break;case"FeatHdr":case"FeatHdr11":break;case"Feature11":case"Feature12":case"List12":break;case"Blank":break;case"Country":C=V;break;case"RecalcId":break;case"DefaultRowHeight":case"DxGCol":break;case"Fbi":case"Fbi2":case"GelFrame":break;case"Font":break;case"XFCRC":break;case"Style":break;case"StyleExt":break;case"Palette":w=V;break;case"Theme":break;case"ScenarioProtect":break;case"ObjProtect":break;case"CondFmt12":break;case"Table":break;case"TableStyles":break;case"TableStyle":break;case"TableStyleElement":break;case"SXStreamID":break;case"SXVS":break;case"DConRef":break;case"SXAddl":break;case"DConBin":break;case"DConName":break;case"SXPI":break;case"SxFormat":break;case"SxSelect":break;case"SxRule":break;case"SxFilt":break;case"SxItm":break;case"SxDXF":break;case"ScenMan":break;case"DCon":break;case"CellWatch":break;case"PrintRowCol":break;case"PrintGrid":break;case"PrintSize":break;case"XCT":break;case"CRN":break;case"Scl":{}break;case"SheetExt":{}break;case"SheetExtOptional":{}break;case"ObNoMacros":{}break;case"ObProj":{}break;case"CodeName":{}break;case"GUIDTypeLib":{}break;case"WOpt":break;case"PhoneticInfo":break;case"OleObjectSize":break;case"DXF":case"DXFN":case"DXFN12":case"DXFN12List":case"DXFN12NoCB":break;case"Dv":case"DVal":break;case"BRAI":case"Series":case"SeriesText":break;case"DConn":break;case"DbOrParamQry":break;case"DBQueryExt":break;case"IFmtRecord":break;case"CondFmt":case"CF":case"CF12":case"CFEx":break;case"Excel9File":break;case"Units":break;case"InterfaceHdr":case"Mms":case"InterfaceEnd":case"DSF":case"BuiltInFnGroupCount":case"Window1":case"Window2":case"HideObj":case"GridSet":case"Guts":case"UserBView":case"UserSViewBegin":case"UserSViewEnd":case"Pane":break;default:switch(H.n){case"Dat":case"Begin":case"End":case"StartBlock":case"EndBlock":case"Frame":case"Area":case"Axis":case"AxisLine":case"Tick":break;case"AxesUsed":case"CrtLayout12":case"CrtLayout12A":case"CrtLink":case"CrtLine":case"CrtMlFrt":case"CrtMlFrtContinue":break;case"LineFormat":case"AreaFormat":case"Chart":case"Chart3d":case"Chart3DBarShape":case"ChartFormat":case"ChartFrtInfo":break;case"PlotArea":case"PlotGrowth":break;case"SeriesList":case"SerParent":case"SerAuxTrend":break;case"DataFormat":case"SerToCrt":case"FontX":break;case"CatSerRange":case"AxcExt":case"SerFmt":break;case"ShtProps":break;case"DefaultText":case"Text":case"CatLab":break;case"DataLabExtContents":break;case"Legend":case"LegendException":break;case"Pie":case"Scatter":break;case"PieFormat":case"MarkerFormat":break;case"StartObject":case"EndObject":break;case"AlRuns":case"ObjectLink":break;case"SIIndex":break;case"AttachedLabel":case"YMult":break;case"Line":case"Bar":break;case"Surf":break;case"AxisParent":break;case"Pos":break;case"ValueRange":break;case"SXViewEx9":break;case"SXViewLink":break;case"PivotChartBits":break;case"SBaseRef":break;case"TextPropsStream":break;case"LnExt":break;case"MkrExt":break;case"CrtCoopt":break;case"Qsi":case"Qsif":case"Qsir":case"QsiSXTag":break;case"TxtQry":break;case"FilterMode":break;case"AutoFilter":case"AutoFilterInfo":break;case"AutoFilter12":break;case"DropDownObjIds":break;case"Sort":break;case"SortData":break;case"ShapePropsStream":break;case"MsoDrawing":case"MsoDrawingGroup":case"MsoDrawingSelection":break;case"ImData":break;case"WebPub":case"AutoWebPub":case"RightMargin":case"LeftMargin":case"TopMargin":case"BottomMargin":case"HeaderFooter":case"HFPicture":case"PLV":case"HorizontalPageBreaks":case"VerticalPageBreaks":case"Backup":case"CompressPictures":case"Compat12":break;case"Continue":case"ContinueFrt12":break;case"FrtFontList":case"FrtWrapper":break;case"ExternCount":break;case"RString":break;case"TabIdConf":case"Radar":case"RadarArea":case"DropBar":case"Intl":case"CoordList":case"SerAuxErrBar":break;default:switch(H.n){case"SCENARIO":case"DConBin":case"PicF":case"DataLabExt":case"Lel":case"BopPop":case"BopPopCustom":case"RealTimeData":case"Name":break;default:if(a.WTF)throw"Unrecognized Record "+H.n}}}}}else e.l+=N}var Y=I.biff===2?["Sheet1"]:Object.keys(t).sort(function(e,a){return Number(e)-Number(a)}).map(function(e){return t[e].name});var q=Y.slice();r.Directory=Y;r.SheetNames=Y;if(!a.bookSheets)r.Sheets=s;r.Preamble=f;r.Strings=n;r.SSF=SSF.get_table();if(I.enc)r.Encryption=I.enc;r.Metadata={};if(C!==undefined)r.Metadata.Country=C;return r}function parse_xlscfb(e,a){if(!a)a={};fix_read_opts(a);reset_cp();var r,s,c;if(e.find){r=e.find("!CompObj");s=e.find("!SummaryInformation");c=e.find("/Workbook")}else{prep_blob(e,0);c={content:e}}if(!c)c=e.find("/Book");var t,o,i;if(r)t=parse_compobj(r);if(a.bookProps&&!a.bookSheets)i={};else{if(c)i=parse_workbook(c.content,a,!!c.find);else throw new Error("Cannot find Workbook stream")}if(e.find)parse_props(e);var b={};for(var n in e.Summary)b[n]=e.Summary[n];for(n in e.DocSummary)b[n]=e.DocSummary[n];i.Props=i.Custprops=b;if(a.bookFiles)i.cfb=e;i.CompObjP=t;return i}function parse_props(e){var a=e.find("!DocumentSummaryInformation");if(a)try{e.DocSummary=parse_PropertySetStream(a,DocSummaryPIDDSI)}catch(e){}var r=e.find("!SummaryInformation");if(r)try{e.Summary=parse_PropertySetStream(r,SummaryPIDSI)}catch(e){}}