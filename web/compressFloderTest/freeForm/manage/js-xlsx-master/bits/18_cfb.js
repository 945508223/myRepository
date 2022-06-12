var DO_NOT_EXPORT_CFB=true;var CFB=function e(){var r={};r.version="0.10.2";function t(e){var r=3;var t=512;var h=0;var u=0;var l=0;var _=0;var v=0;var p=[];var b=e.slice(0,512);prep_blob(b,0);var y=a(b);r=y[0];switch(r){case 3:t=512;break;case 4:t=4096;break;default:throw"Major Version: Expected 3 or 4 saw "+r}if(t!==512){b=e.slice(0,t);prep_blob(b,28)}var w=e.slice(0,t);i(b,r);var S=b.read_shift(4,"i");if(r===3&&S!==0)throw"# Directory Sectors: Expected 0 saw "+S;b.l+=4;l=b.read_shift(4,"i");b.l+=4;b.chk("00100000","Mini Stream Cutoff Size: ");_=b.read_shift(4,"i");h=b.read_shift(4,"i");v=b.read_shift(4,"i");u=b.read_shift(4,"i");for(var A,C=0;C<109;++C){A=b.read_shift(4,"i");if(A<0)break;p[C]=A}var m=f(e,t);o(v,u,m,t,p);var F=c(m,l,p,t);F[l].name="!Directory";if(h>0&&_!==E)F[_].name="!MiniFAT";F[p[0]].name="!FAT";F.fat_addrs=p;F.ssz=t;var g={},R=[],T=[],k=[],D={};d(l,F,m,R,h,g,T);n(T,D,k,R);var I=R.shift();R.root=I;var M=s(k,R,T,g,I);return{raw:{header:w,sectors:m},FileIndex:T,FullPaths:k,FullPathDir:D,find:M}}function a(e){e.chk(b,"Header Signature: ");e.chk(y,"CLSID: ");var r=e.read_shift(2,"u");return[e.read_shift(2,"u"),r]}function i(e,r){var t=9;e.chk("feff","Byte Order: ");switch(t=e.read_shift(2)){case 9:if(r!==3)throw"MajorVersion/SectorShift Mismatch";break;case 12:if(r!==4)throw"MajorVersion/SectorShift Mismatch";break;default:throw"Sector Shift: Expected 9 or 12 saw "+t}e.chk("0600","Mini Sector Shift: ");e.chk("000000000000","Reserved: ")}function f(e,r){var t=Math.ceil(e.length/r)-1;var a=new Array(t);for(var i=1;i<t;++i)a[i-1]=e.slice(i*r,(i+1)*r);a[t-1]=e.slice(t*r);return a}function n(e,r,t,a){var i=0,f=0,n=0,s=0,o=0,h=a.length;var c=new Array(h),d=new Array(h);for(;i<h;++i){c[i]=d[i]=i;t[i]=a[i]}for(;o<d.length;++o){i=d[o];f=e[i].L;n=e[i].R;s=e[i].C;if(c[i]===i){if(f!==-1&&c[f]!==f)c[i]=c[f];if(n!==-1&&c[n]!==n)c[i]=c[n]}if(s!==-1)c[s]=i;if(f!==-1){c[f]=c[i];d.push(f)}if(n!==-1){c[n]=c[i];d.push(n)}}for(i=1;i!==h;++i)if(c[i]===i){if(n!==-1&&c[n]!==n)c[i]=c[n];else if(f!==-1&&c[f]!==f)c[i]=c[f]}for(i=1;i<h;++i){if(e[i].type===0)continue;o=c[i];if(o===0)t[i]=t[0]+"/"+t[i];else while(o!==0){t[i]=t[o]+"/"+t[i];o=c[o]}c[i]=0}t[0]+="/";for(i=1;i<h;++i){if(e[i].type!==2)t[i]+="/";r[t[i]]=e[i]}}function s(e,r,t,a,i){var f=new Array(e.length);var n=new Array(r.length),s;for(s=0;s<e.length;++s)f[s]=e[s].toUpperCase().replace(chr0,"").replace(chr1,"!");for(s=0;s<r.length;++s)n[s]=r[s].toUpperCase().replace(chr0,"").replace(chr1,"!");return function e(s){var o;if(s.charCodeAt(0)===47){o=true;s=i+s}else o=s.indexOf("/")!==-1;var h=s.toUpperCase().replace(chr0,"").replace(chr1,"!");var c=o===true?f.indexOf(h):n.indexOf(h);if(c===-1)return null;return o===true?t[c]:a[r[c]]}}function o(e,r,t,a,i){var f;if(e===E){if(r!==0)throw"DIFAT chain shorter than expected"}else if(e!==-1){var n=t[e],s=(a>>>2)-1;for(var h=0;h<s;++h){if((f=__readInt32LE(n,h*4))===E)break;i.push(f)}o(__readInt32LE(n,a-4),r-1,t,a,i)}}function h(e,r,t,a,i){var f=e.length;var n,s;if(!i)i=new Array(f);var o=a-1,h,c;n=[];s=[];for(h=r;h>=0;){i[h]=true;n[n.length]=h;s.push(e[h]);var d=t[Math.floor(h*4/a)];c=h*4&o;if(a<4+c)throw"FAT boundary crossed: "+h+" 4 "+a;h=__readInt32LE(e[d],c)}return{nodes:n,data:__toBuffer([s])}}function c(e,r,t,a){var i=e.length,f=new Array(i);var n=new Array(i),s,o;var h=a-1,c,d,u,l;for(c=0;c<i;++c){s=[];u=c+r;if(u>=i)u-=i;if(n[u]===true)continue;o=[];for(d=u;d>=0;){n[d]=true;s[s.length]=d;o.push(e[d]);var _=t[Math.floor(d*4/a)];l=d*4&h;if(a<4+l)throw"FAT boundary crossed: "+d+" 4 "+a;d=__readInt32LE(e[_],l)}f[u]={nodes:s,data:__toBuffer([o])}}return f}function d(e,r,t,a,i,f,n){var s;var o=0,c=a.length?2:0;var d=r[e].data;var l=0,_=0,v,b,y,w;for(;l<d.length;l+=128){s=d.slice(l,l+128);prep_blob(s,64);_=s.read_shift(2);if(_===0)continue;v=__utf16le(s,0,_-c);a.push(v);b={name:v,type:s.read_shift(1),color:s.read_shift(1),L:s.read_shift(4,"i"),R:s.read_shift(4,"i"),C:s.read_shift(4,"i"),clsid:s.read_shift(16),state:s.read_shift(4,"i")};y=s.read_shift(2)+s.read_shift(2)+s.read_shift(2)+s.read_shift(2);if(y!==0){b.ctime=y;b.ct=u(s,s.l-8)}w=s.read_shift(2)+s.read_shift(2)+s.read_shift(2)+s.read_shift(2);if(w!==0){b.mtime=w;b.mt=u(s,s.l-8)}b.start=s.read_shift(4,"i");b.size=s.read_shift(4,"i");if(b.type===5){o=b.start;if(i>0&&o!==E)r[o].name="!StreamData"}else if(b.size>=4096){b.storage="fat";if(r[b.start]===undefined)r[b.start]=h(t,b.start,r.fat_addrs,r.ssz);r[b.start].name=b.name;b.content=r[b.start].data.slice(0,b.size);prep_blob(b.content,0)}else{b.storage="minifat";if(o!==E&&b.start!==E){b.content=r[o].data.slice(b.start*p,b.start*p+b.size);prep_blob(b.content,0)}}f[v]=b;n.push(b)}}function u(e,r){return new Date((__readUInt32LE(e,r+4)/1e7*Math.pow(2,32)+__readUInt32LE(e,r)/1e7-11644473600)*1e3)}var l;function _(e,r){if(l===undefined)l=require("fs");return t(l.readFileSync(e),r)}function v(e,r){switch(r!==undefined&&r.type!==undefined?r.type:"base64"){case"file":return _(e,r);case"base64":return t(s2a(Base64.decode(e)),r);case"binary":return t(s2a(e),r)}return t(e)}var p=64;var E=-2;var b="d0cf11e0a1b11ae1";var y="00000000000000000000000000000000";var w={MAXREGSECT:-6,DIFSECT:-4,FATSECT:-3,ENDOFCHAIN:E,FREESECT:-1,HEADER_SIGNATURE:b,HEADER_MINOR_VERSION:"3e00",MAXREGSID:-6,NOSTREAM:-1,HEADER_CLSID:y,EntryTypes:["unknown","storage","stream","lockbytes","property","root"]};r.read=v;r.parse=t;r.utils={ReadShift:ReadShift,CheckField:CheckField,prep_blob:prep_blob,bconcat:bconcat,consts:w};return r}();if(typeof require!=="undefined"&&typeof module!=="undefined"&&typeof DO_NOT_EXPORT_CFB==="undefined"){module.exports=CFB}