function firstbyte(e,r){switch((r||{}).type||"base64"){case"buffer":return e[0];case"base64":return Base64.decode(e.substr(0,12)).charCodeAt(0);case"binary":return e.charCodeAt(0);case"array":return e[0];default:throw new Error("Unrecognized type "+r.type)}}function read_zip(e,r){var a,s=e;var t=r||{};if(!t.type)t.type=has_buf&&Buffer.isBuffer(e)?"buffer":"base64";switch(t.type){case"base64":a=new jszip(s,{base64:true});break;case"binary":case"array":a=new jszip(s,{base64:false});break;case"buffer":a=new jszip(s);break;case"file":a=new jszip(s=_fs.readFileSync(e));break;default:throw new Error("Unrecognized type "+t.type)}return parse_zip(a,t)}function readSync(e,r){var a,s=e,t=false,f;var n=r||{};if(!n.type)n.type=has_buf&&Buffer.isBuffer(e)?"buffer":"base64";if(n.type=="file"){t=true;n.type="buffer";s=_fs.readFileSync(e)}switch(f=firstbyte(s,n)){case 208:if(t)n.type="file";return parse_xlscfb(CFB.read(e,n),n);case 9:return parse_xlscfb(s2a(n.type==="base64"?Base64.decode(e):e),n);case 60:return parse_xlml(s,n);case 80:if(t)n.type="file";return read_zip(e,r);default:throw new Error("Unsupported file "+f)}}function readFileSync(e,r){var a=r||{};a.type="file";var s=readSync(e,a);s.FILENAME=e;return s}