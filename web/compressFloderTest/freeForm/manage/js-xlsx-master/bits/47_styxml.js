function parse_fills(e,t){styles.Fills=[];var l={};e[0].match(tagregex).forEach(function(e){var r=parsexmltag(e);switch(r[0]){case"<fills":case"<fills>":case"</fills>":break;case"<fill>":break;case"</fill>":styles.Fills.push(l);l={};break;case"<patternFill":if(r.patternType)l.patternType=r.patternType;break;case"<patternFill/>":case"</patternFill>":break;case"<bgColor":if(!l.bgColor)l.bgColor={};if(r.indexed)l.bgColor.indexed=parseInt(r.indexed,10);if(r.theme)l.bgColor.theme=parseInt(r.theme,10);if(r.tint)l.bgColor.tint=parseFloat(r.tint);if(r.theme&&themes.themeElements&&themes.themeElements.clrScheme){l.bgColor.rgb=rgb_tint(themes.themeElements.clrScheme[l.bgColor.theme].rgb,l.bgColor.tint||0);if(t.WTF)l.bgColor.raw_rgb=rgb_tint(themes.themeElements.clrScheme[l.bgColor.theme].rgb,0)}if(r.rgb)l.bgColor.rgb=r.rgb;break;case"<bgColor/>":case"</bgColor>":break;case"<fgColor":if(!l.fgColor)l.fgColor={};if(r.theme)l.fgColor.theme=parseInt(r.theme,10);if(r.tint)l.fgColor.tint=parseFloat(r.tint);if(r.theme&&themes.themeElements&&themes.themeElements.clrScheme){l.fgColor.rgb=rgb_tint(themes.themeElements.clrScheme[l.fgColor.theme].rgb,l.fgColor.tint||0);if(t.WTF)l.fgColor.raw_rgb=rgb_tint(themes.themeElements.clrScheme[l.fgColor.theme].rgb,0)}if(r.rgb)l.fgColor.rgb=r.rgb;break;case"<fgColor/>":case"</fgColor>":break;default:if(t.WTF)throw"unrecognized "+r[0]+" in fills"}})}function parse_fonts(e,t){styles.Fonts=[];var l={};e[0].match(tagregex).forEach(function(e){var t=parsexmltag(e);switch(t[0]){case"<fonts":case"<fonts>":case"</fonts>":break;case"<font":break;case"</font>":styles.Fonts.push(l);l={};break;case"<name":if(t.val)l.name=t.val;break;case"<name/>":case"</name>":break;case"<b/>":l.bold=true;break;case"<u/>":l.underline=true;break;case"<i/>":l.italic=true;break;case"<strike/>":l.strike=true;break;case"<outline/>":l.outline=true;break;case"<shadow/>":l.shadow=true;break;case"<sz":if(t.val)l.sz=t.val;break;case"<sz/>":case"</sz>":break;case"<vertAlign":if(t.val)l.vertAlign=t.val;break;case"<vertAlign/>":case"</vertAlign>":break;case"<color":if(!l.color)l.color={};if(t.theme)l.color.theme=t.theme;if(t.tint)l.color.tint=t.tint;if(t.theme&&themes.themeElements&&themes.themeElements.clrScheme){l.color.rgb=rgb_tint(themes.themeElements.clrScheme[l.color.theme].rgb,l.color.tint||0)}if(t.rgb)l.color.rgb=t.rgb;break;case"<color/>":case"</color>":break}})}function parse_borders(e,t){styles.Borders=[];var l={},r={};e[0].match(tagregex).forEach(function(e){var t=parsexmltag(e);switch(t[0]){case"<borders":case"<borders>":case"</borders>":break;case"<border":case"<border>":l={};if(t.diagonalUp){l.diagonalUp=t.diagonalUp}if(t.diagonalDown){l.diagonalDown=t.diagonalDown}styles.Borders.push(l);break;break;case"</border>":break;case"<left":r=l.left={};if(t.style){r.style=t.style}break;case"<right":r=l.right={};if(t.style){r.style=t.style}break;case"<top":r=l.top={};if(t.style){r.style=t.style}break;case"<bottom":r=l.bottom={};if(t.style){r.style=t.style}break;case"<diagonal":r=l.diagonal={};if(t.style){r.style=t.style}break;case"<color":r.color={};if(t.theme)r.color.theme=t.theme;if(t.theme&&themes.themeElements&&themes.themeElements.clrScheme){r.color.rgb=rgb_tint(themes.themeElements.clrScheme[r.color.theme].rgb,r.color.tint||0)}if(t.tint)r.color.tint=t.tint;if(t.rgb)r.color.rgb=t.rgb;if(t.auto)r.color.auto=t.auto;break;case"<name/>":case"</name>":break;default:break}})}function parse_numFmts(e,t){styles.NumberFmt=[];var l=keys(SSF._table);for(var r=0;r<l.length;++r)styles.NumberFmt[l[r]]=SSF._table[l[r]];var a=e[0].match(tagregex);for(r=0;r<a.length;++r){var s=parsexmltag(a[r]);switch(s[0]){case"<numFmts":case"</numFmts>":case"<numFmts/>":case"<numFmts>":break;case"<numFmt":{var n=unescapexml(utf8read(s.formatCode)),o=parseInt(s.numFmtId,10);styles.NumberFmt[o]=n;if(o>0)SSF.load(n,o)}break;default:if(t.WTF)throw"unrecognized "+s[0]+" in numFmts"}}}function write_numFmts(e,t){var l=["<numFmts>"];[[5,8],[23,26],[41,44],[63,66],[164,392]].forEach(function(t){for(var r=t[0];r<=t[1];++r)if(e[r]!==undefined)l[l.length]=writextag("numFmt",null,{numFmtId:r,formatCode:escapexml(e[r])})});if(l.length===1)return"";l[l.length]="</numFmts>";l[0]=writextag("numFmts",null,{count:l.length-2}).replace("/>",">");return l.join("")}function parse_cellXfs(e,t){styles.CellXf=[];var l;e[0].match(tagregex).forEach(function(e){var r=parsexmltag(e);switch(r[0]){case"<cellXfs":case"<cellXfs>":case"<cellXfs/>":case"</cellXfs>":break;case"<xf":l=r;delete l[0];delete r[0];if(l.numFmtId)l.numFmtId=parseInt(l.numFmtId,10);if(l.fillId)l.fillId=parseInt(l.fillId,10);styles.CellXf.push(l);break;case"</xf>":break;case"<alignment":case"<alignment/>":var a={};if(r.vertical){a.vertical=r.vertical}if(r.horizontal){a.horizontal=r.horizontal}if(r.textRotation!=undefined){a.textRotation=r.textRotation}if(r.indent){a.indent=r.indent}if(r.wrapText){a.wrapText=r.wrapText}l.alignment=a;break;case"<protection":case"</protection>":case"<protection/>":break;case"<extLst":case"</extLst>":break;case"<ext":break;default:if(t.WTF)throw"unrecognized "+r[0]+" in cellXfs"}})}function write_cellXfs(e){var t=[];t[t.length]=writextag("cellXfs",null);e.forEach(function(e){t[t.length]=writextag("xf",null,e)});t[t.length]="</cellXfs>";if(t.length===2)return"";t[0]=writextag("cellXfs",null,{count:t.length-2}).replace("/>",">");return t.join("")}var parse_sty_xml=function e(){var t=/<numFmts([^>]*)>.*<\/numFmts>/;var l=/<cellXfs([^>]*)>.*<\/cellXfs>/;var r=/<fills([^>]*)>.*<\/fills>/;var a=/<borders([^>]*)>.*<\/borders>/;return function e(s,n){var o;if(o=s.match(t))parse_numFmts(o,n);if(o=s.match(/<fonts([^>]*)>.*<\/fonts>/))parse_fonts(o,n);if(o=s.match(r))parse_fills(o,n);if(o=s.match(a))parse_borders(o,n);if(o=s.match(l))parse_cellXfs(o,n);return styles}}();var STYLES_XML_ROOT=writextag("styleSheet",null,{xmlns:XMLNS.main[0],"xmlns:vt":XMLNS.vt});RELS.STY="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";function write_sty_xml(e,t){if(typeof style_builder!="undefined"&&typeof"require"!="undefined"){return style_builder.toXml()}var l=[XML_HEADER,STYLES_XML_ROOT],r;if((r=write_numFmts(e.SSF))!=null)l[l.length]=r;l[l.length]='<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';l[l.length]='<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';l[l.length]='<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';l[l.length]='<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';if(r=write_cellXfs(t.cellXfs))l[l.length]=r;l[l.length]='<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';l[l.length]='<dxfs count="0"/>';l[l.length]='<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';if(l.length>2){l[l.length]="</styleSheet>";l[1]=l[1].replace("/>",">")}return l.join("")}