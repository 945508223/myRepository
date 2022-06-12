{var VT_EMPTY=0;var VT_NULL=1;var VT_I2=2;var VT_I4=3;var VT_R4=4;var VT_R8=5;var VT_CY=6;var VT_DATE=7;var VT_BSTR=8;var VT_ERROR=10;var VT_BOOL=11;var VT_VARIANT=12;var VT_DECIMAL=14;var VT_I1=16;var VT_UI1=17;var VT_UI2=18;var VT_UI4=19;var VT_I8=20;var VT_UI8=21;var VT_INT=22;var VT_UINT=23;var VT_LPSTR=30;var VT_LPWSTR=31;var VT_FILETIME=64;var VT_BLOB=65;var VT_STREAM=66;var VT_STORAGE=67;var VT_STREAMED_Object=68;var VT_STORED_Object=69;var VT_BLOB_Object=70;var VT_CF=71;var VT_CLSID=72;var VT_VERSIONED_STREAM=73;var VT_VECTOR=4096;var VT_ARRAY=8192;var VT_STRING=80;var VT_USTR=81;var VT_CUSTOM=[VT_STRING,VT_USTR]}var DocSummaryPIDDSI={1:{n:"CodePage",t:VT_I2},2:{n:"Category",t:VT_STRING},3:{n:"PresentationFormat",t:VT_STRING},4:{n:"ByteCount",t:VT_I4},5:{n:"LineCount",t:VT_I4},6:{n:"ParagraphCount",t:VT_I4},7:{n:"SlideCount",t:VT_I4},8:{n:"NoteCount",t:VT_I4},9:{n:"HiddenCount",t:VT_I4},10:{n:"MultimediaClipCount",t:VT_I4},11:{n:"Scale",t:VT_BOOL},12:{n:"HeadingPair",t:VT_VECTOR|VT_VARIANT},13:{n:"DocParts",t:VT_VECTOR|VT_LPSTR},14:{n:"Manager",t:VT_STRING},15:{n:"Company",t:VT_STRING},16:{n:"LinksDirty",t:VT_BOOL},17:{n:"CharacterCount",t:VT_I4},19:{n:"SharedDoc",t:VT_BOOL},22:{n:"HLinksChanged",t:VT_BOOL},23:{n:"AppVersion",t:VT_I4,p:"version"},26:{n:"ContentType",t:VT_STRING},27:{n:"ContentStatus",t:VT_STRING},28:{n:"Language",t:VT_STRING},29:{n:"Version",t:VT_STRING},255:{}};var SummaryPIDSI={1:{n:"CodePage",t:VT_I2},2:{n:"Title",t:VT_STRING},3:{n:"Subject",t:VT_STRING},4:{n:"Author",t:VT_STRING},5:{n:"Keywords",t:VT_STRING},6:{n:"Comments",t:VT_STRING},7:{n:"Template",t:VT_STRING},8:{n:"LastAuthor",t:VT_STRING},9:{n:"RevNumber",t:VT_STRING},10:{n:"EditTime",t:VT_FILETIME},11:{n:"LastPrinted",t:VT_FILETIME},12:{n:"CreatedDate",t:VT_FILETIME},13:{n:"ModifiedDate",t:VT_FILETIME},14:{n:"PageCount",t:VT_I4},15:{n:"WordCount",t:VT_I4},16:{n:"CharCount",t:VT_I4},17:{n:"Thumbnail",t:VT_CF},18:{n:"ApplicationName",t:VT_LPSTR},19:{n:"DocumentSecurity",t:VT_I4},255:{}};var SpecialProperties={2147483648:{n:"Locale",t:VT_UI4},2147483651:{n:"Behavior",t:VT_UI4},1919054434:{}};(function(){for(var T in SpecialProperties)if(SpecialProperties.hasOwnProperty(T))DocSummaryPIDDSI[T]=SummaryPIDSI[T]=SpecialProperties[T]})();var CountryEnum={1:"US",2:"CA",3:"",7:"RU",20:"EG",30:"GR",31:"NL",32:"BE",33:"FR",34:"ES",36:"HU",39:"IT",41:"CH",43:"AT",44:"GB",45:"DK",46:"SE",47:"NO",48:"PL",49:"DE",52:"MX",55:"BR",61:"AU",64:"NZ",66:"TH",81:"JP",82:"KR",84:"VN",86:"CN",90:"TR",105:"JS",213:"DZ",216:"MA",218:"LY",351:"PT",354:"IS",358:"FI",420:"CZ",886:"TW",961:"LB",962:"JO",963:"SY",964:"IQ",965:"KW",966:"SA",971:"AE",972:"IL",974:"QA",981:"IR",65535:"US"};var XLSFillPattern=[null,"solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"];function rgbify(T){return T.map(function(T){return[T>>16&255,T>>8&255,T&255]})}var XLSIcv=rgbify([0,16777215,16711680,65280,255,16776960,16711935,65535,0,16777215,16711680,65280,255,16776960,16711935,65535,8388608,32768,128,8421376,8388736,32896,12632256,8421504,10066431,10040166,16777164,13434879,6684774,16744576,26316,13421823,128,16711935,16776960,65535,8388736,8388608,32896,255,52479,13434879,13434828,16777113,10079487,16751052,13408767,16764057,3368703,3394764,10079232,16763904,16750848,16737792,6710937,9868950,13158,3381606,13056,3355392,10040064,10040166,3355545,3355443,16777215,0]);