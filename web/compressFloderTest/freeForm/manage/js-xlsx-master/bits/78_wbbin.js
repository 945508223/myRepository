function parse_BrtBundleSh(e,r){var t={};t.hsState=e.read_shift(4);t.iTabID=e.read_shift(4);t.strRelID=parse_RelID(e,r-8);t.name=parse_XLWideString(e);return t}function write_BrtBundleSh(e,r){if(!r)r=new_buf(127);r.write_shift(4,e.hsState);r.write_shift(4,e.iTabID);write_RelID(e.strRelID,r);write_XLWideString(e.name.substr(0,31),r);return r}function parse_BrtWbProp(e,r){e.read_shift(4);var t=e.read_shift(4);var i=r>8?parse_XLWideString(e):"";return[t,i]}function write_BrtWbProp(e,r){if(!r)r=new_buf(8);r.write_shift(4,0);r.write_shift(4,0);return r}function parse_BrtFRTArchID$(e,r){var t={};e.read_shift(4);t.ArchID=e.read_shift(4);e.l+=r-8;return t}function parse_wb_bin(e,r){var t={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},xmlns:""};var i=false,a;recordhopper(e,function e(a,n){switch(n.n){case"BrtBundleSh":t.Sheets.push(a);break;case"BrtBeginBook":break;case"BrtFileVersion":break;case"BrtWbProp":break;case"BrtACBegin":break;case"BrtAbsPath15":break;case"BrtACEnd":break;case"BrtWbFactoid":break;case"BrtBookProtection":break;case"BrtBeginBookViews":break;case"BrtBookView":break;case"BrtEndBookViews":break;case"BrtBeginBundleShs":break;case"BrtEndBundleShs":break;case"BrtBeginFnGroup":break;case"BrtEndFnGroup":break;case"BrtBeginExternals":break;case"BrtSupSelf":break;case"BrtSupBookSrc":break;case"BrtExternSheet":break;case"BrtEndExternals":break;case"BrtName":break;case"BrtCalcProp":break;case"BrtUserBookView":break;case"BrtBeginPivotCacheIDs":break;case"BrtBeginPivotCacheID":break;case"BrtEndPivotCacheID":break;case"BrtEndPivotCacheIDs":break;case"BrtWebOpt":break;case"BrtFileRecover":break;case"BrtFileSharing":break;case"BrtBeginSmartTagTypes":break;case"BrtSmartTagType":break;case"BrtEndSmartTagTypes":break;case"BrtFRTBegin":i=true;break;case"BrtFRTArchID$":break;case"BrtWorkBookPr15":break;case"BrtFRTEnd":i=false;break;case"BrtEndBook":break;default:if(!i||r.WTF)throw new Error("Unexpected record "+n.n)}});parse_wb_defaults(t);return t}function write_BUNDLESHS(e,r,t){write_record(e,"BrtBeginBundleShs");for(var i=0;i!=r.SheetNames.length;++i){var a={hsState:0,iTabID:i+1,strRelID:"rId"+(i+1),name:r.SheetNames[i]};write_record(e,"BrtBundleSh",write_BrtBundleSh(a))}write_record(e,"BrtEndBundleShs")}function write_BrtFileVersion(e,r){if(!r)r=new_buf(127);for(var t=0;t!=4;++t)r.write_shift(4,0);write_XLWideString("SheetJS",r);write_XLWideString(XLSX.version,r);write_XLWideString(XLSX.version,r);write_XLWideString("7262",r);r.length=r.l;return r}function write_BOOKVIEWS(e,r,t){write_record(e,"BrtBeginBookViews");write_record(e,"BrtEndBookViews")}function write_BrtCalcProp(e,r){if(!r)r=new_buf(26);r.write_shift(4,0);r.write_shift(4,1);r.write_shift(4,0);write_Xnum(0,r);r.write_shift(-4,1023);r.write_shift(1,51);r.write_shift(1,0);return r}function write_BrtFileRecover(e,r){if(!r)r=new_buf(1);r.write_shift(1,0);return r}function write_wb_bin(e,r){var t=buf_array();write_record(t,"BrtBeginBook");write_record(t,"BrtFileVersion",write_BrtFileVersion());write_record(t,"BrtWbProp",write_BrtWbProp());write_BOOKVIEWS(t,e,r);write_BUNDLESHS(t,e,r);write_record(t,"BrtCalcProp",write_BrtCalcProp());write_record(t,"BrtFileRecover",write_BrtFileRecover());write_record(t,"BrtEndBook");return t.end()}