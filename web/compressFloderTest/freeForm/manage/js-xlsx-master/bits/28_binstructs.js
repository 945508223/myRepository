function parse_StrRun(r,e){return{ich:r.read_shift(2),ifnt:r.read_shift(2)}}function parse_RichStr(r,e){var t=r.l;var i=r.read_shift(1);var n=parse_XLWideString(r);var f=[];var a={t:n,h:n};if((i&1)!==0){var _=r.read_shift(4);for(var s=0;s!=_;++s)f.push(parse_StrRun(r));a.r=f}else a.r="<t>"+escapexml(n)+"</t>";if((i&2)!==0){}r.l=t+e;return a}function write_RichStr(r,e){if(e==null)e=new_buf(5+2*r.t.length);e.write_shift(1,0);write_XLWideString(r.t,e);return e}function parse_XLSBCell(r){var e=r.read_shift(4);var t=r.read_shift(2);t+=r.read_shift(1)<<16;var i=r.read_shift(1);return{c:e,iStyleRef:t}}function write_XLSBCell(r,e){if(e==null)e=new_buf(8);e.write_shift(-4,r.c);e.write_shift(3,r.iStyleRef===undefined?r.iStyleRef:r.s);e.write_shift(1,0);return e}function parse_XLSBCodeName(r,e){return parse_XLWideString(r,e)}function parse_XLNullableWideString(r){var e=r.read_shift(4);return e===0||e===4294967295?"":r.read_shift(e,"dbcs")}function write_XLNullableWideString(r,e){if(!e)e=new_buf(127);e.write_shift(4,r.length>0?r.length:4294967295);if(r.length>0)e.write_shift(0,r,"dbcs");return e}function parse_XLWideString(r){var e=r.read_shift(4);return e===0?"":r.read_shift(e,"dbcs")}function write_XLWideString(r,e){if(e==null)e=new_buf(4+2*r.length);e.write_shift(4,r.length);if(r.length>0)e.write_shift(0,r,"dbcs");return e}var parse_RelID=parse_XLNullableWideString;var write_RelID=write_XLNullableWideString;function parse_RkNumber(r){var e=r.slice(r.l,r.l+4);var t=e[0]&1,i=e[0]&2;r.l+=4;e[0]&=252;var n=i===0?__double([0,0,0,0,e[0],e[1],e[2],e[3]],0):__readInt32LE(e,0)>>2;return t?n/100:n}function parse_UncheckedRfX(r){var e={s:{},e:{}};e.s.r=r.read_shift(4);e.e.r=r.read_shift(4);e.s.c=r.read_shift(4);e.e.c=r.read_shift(4);return e}function write_UncheckedRfX(r,e){if(!e)e=new_buf(16);e.write_shift(4,r.s.r);e.write_shift(4,r.e.r);e.write_shift(4,r.s.c);e.write_shift(4,r.e.c);return e}function parse_Xnum(r,e){return r.read_shift(8,"f")}function write_Xnum(r,e){return(e||new_buf(8)).write_shift(8,"f",r)}var BErr={0:"#NULL!",7:"#DIV/0!",15:"#VALUE!",23:"#REF!",29:"#NAME?",36:"#NUM!",42:"#N/A",43:"#GETTING_DATA",255:"#WTF?"};var RBErr=evert_num(BErr);function parse_BrtColor(r,e){var t={};var i=r.read_shift(1);t.fValidRGB=i&1;t.xColorType=i>>>1;t.index=r.read_shift(1);t.nTintAndShade=r.read_shift(2,"i");t.bRed=r.read_shift(1);t.bGreen=r.read_shift(1);t.bBlue=r.read_shift(1);t.bAlpha=r.read_shift(1)}function parse_FontFlags(r,e){var t=r.read_shift(1);r.l++;var i={fItalic:t&2,fStrikeout:t&8,fOutline:t&16,fShadow:t&32,fCondense:t&64,fExtend:t&128};return i}