function parse_Theme(e,r){var a=e.read_shift(4);if(a===124226)return;e.l+=r-4}function parse_ColorTheme(e,r){return e.read_shift(4)}function parse_FullColorExt(e,r){var a={};a.xclrType=e.read_shift(2);a.nTintShade=e.read_shift(2);switch(a.xclrType){case 0:e.l+=4;break;case 1:a.xclrValue=parse_IcvXF(e,4);break;case 2:a.xclrValue=parse_LongRGBA(e,4);break;case 3:a.xclrValue=parse_ColorTheme(e,4);break;case 4:e.l+=4;break}e.l+=8;return a}function parse_IcvXF(e,r){return parsenoop(e,r)}function parse_XFExtGradient(e,r){return parsenoop(e,r)}function parse_ExtProp(e,r){var a=e.read_shift(2);var s=e.read_shift(2);var t=[a];switch(a){case 4:case 5:case 7:case 8:case 9:case 10:case 11:case 13:t[1]=parse_FullColorExt(e,s);break;case 6:t[1]=parse_XFExtGradient(e,s);break;case 14:case 15:t[1]=e.read_shift(s===5?1:2);break;default:throw new Error("Unrecognized ExtProp type: "+a+" "+s)}return t}function parse_XFExt(e,r){var a=e.l+r;e.l+=2;var s=e.read_shift(2);e.l+=2;var t=e.read_shift(2);var c=[];while(t-- >0)c.push(parse_ExtProp(e,a-e.l));return{ixfe:s,ext:c}}function update_xfext(e,r){r.forEach(function(e){switch(e[0]){case 4:break;case 5:break;case 7:case 8:case 9:case 10:break;case 13:break;case 14:break;default:throw"bafuq"+e[0].toString(16)}})}