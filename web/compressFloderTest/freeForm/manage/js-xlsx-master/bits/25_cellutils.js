function shift_cell_xls(l,e){if(e.s){if(l.cRel)l.c+=e.s.c;if(l.rRel)l.r+=e.s.r}else{l.c+=e.c;l.r+=e.r}l.cRel=l.rRel=0;while(l.c>=256)l.c-=256;while(l.r>=65536)l.r-=65536;return l}function shift_range_xls(l,e){l.s=shift_cell_xls(l.s,e.s);l.e=shift_cell_xls(l.e,e.s);return l}