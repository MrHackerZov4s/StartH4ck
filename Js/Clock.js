function loadXMLDoc() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
		}
	else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			document.getElementById("xnews").innerHTML=xmlhttp.responseText;
	    }
	}
	xmlhttp.open("GET","../../../rss/rss-news-php.php",true);
	xmlhttp.send();
}

// Future DST-9 Text Modification
function mod(the_date) {
	var len = the_date.length
	var result;

	if (len > 3) {			
		var weekdaystxt=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var sharp_date = the_date;
		var day_dst = new Date(sharp_date);
		var day_print = weekdaystxt[day_dst.getDay()];
		var space_print = ", ";
		var date_print = sharp_date.slice(0,-13);
		var hour_print = sharp_date.slice(-8,-3);
		result = (day_print.concat(space_print, date_print, hour_print));
	}
	else {
		result = ("No DST");
	}
	return result;
}

function showResult(str){
	if ((str.length==null) || (str.length==0) || (str.length==1)){ 
		document.getElementById("livesearch").innerHTML="";
		document.getElementById("livesearch").style.border="0px";
		return;
	}
	if (window.XMLHttpRequest){
		live_xmlhttp=new XMLHttpRequest();
	}
	else{
		live_xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	live_xmlhttp.onreadystatechange=function(){
		if (live_xmlhttp.readyState==4 && live_xmlhttp.status==200){
			document.getElementById("livesearch").innerHTML=live_xmlhttp.responseText;
	    	document.getElementById("livesearch").style.border="1px solid #A5ACB2";
			document.getElementById("livesearch").style.width="208px";
			document.getElementById("livesearch").style.backgroundColor="#F0FFFF";
	    }
	}
	live_xmlhttp.open("GET","../../../livesearch/livesearch.php?q="+str,true);
	live_xmlhttp.send();
}

function search_when_out(ccc)
	{
	document.getElementById('livesearch').style.visibility='visible';
	return showResult(ccc);
	}

function getCookie(NameOfCookie){
    if (document.cookie.length > 0) {              
    	begin = document.cookie.indexOf(NameOfCookie+"=");       
    	if (begin != -1) {           
      		begin += NameOfCookie.length+1;       
      		end = document.cookie.indexOf(";", begin);
      		if (end == -1) end = document.cookie.length;
        	return unescape(document.cookie.substring(begin, end));
    	} 
  	}
	return null;
}

function setCookie(NameOfCookie, value, expiredays) {
	var ExpireDate = new Date();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 60 * 60 * 24 * 1000));

	document.cookie = NameOfCookie + "=" + escape(value) +  ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

//PLACEHOLDER
var Placeholder = (function() 
{
    var placeholderColor = "#A0A0A0";
    
    var normalColor = "#000000";
    
    var xAddEventListener = function(elem, type, listener, useCapture) {
        if (elem.addEventListener)
            elem.addEventListener(type, listener, useCapture);
        else if (elem.attachEvent)
            elem.attachEvent("on" + type, listener);
        else
            elem["on" + type] = listener;
    }
    
    this.native_support = (function() {
        var input = document.createElement("input");
        return "placeholder" in input;
    })();
    
    this.Add = function(input, placeholder) {
        if (typeof input == "string") {
            input = document.getElementById(input);
        }

        xAddEventListener(input, "focus", function() {
            if (input.value == placeholder) {
                input.value = "";
                input.style.color = normalColor;
            }
        }, true);
        var onBlur = function() {
            if (input.value == "" || input.value == placeholder) {
                input.value = placeholder;
                input.style.color = placeholderColor;
            }
        }
        xAddEventListener(input, "blur", onBlur, true);
        
        var pform = input;
        do {
            pform = pform.parentNode;
        } while (pform != document && pform.tagName.toLowerCase() != "form");
        
        if (pform && pform != document) {
            xAddEventListener(pform, "submit", function() {
                if (input.value == placeholder) {
                    input.value = "";
                }
            }, true);
        }
        
        onBlur();
    }
    
    var onReady = function() {
        if (!Placeholder.native_support) {
            var inputs = document.getElementsByTagName("input");
            for (var i = 0; i < inputs.length; ++i) {
                if (inputs[i] && inputs[i].tagName.toLowerCase() == "input") {
                    var attr = inputs[i].getAttribute("placeholder");
                    if (typeof attr == "string" && attr.length > 0) {
                        Placeholder.Add(inputs[i], attr);
                    }
                }
            }
        }
    };

    var readyHasFired = false;
    xAddEventListener(window, "DOMContentLoaded", function() {
        readyHasFired = true;
        onReady();
    }, true);
    xAddEventListener(window, "load", function() {
        if (!readyHasFired) {
            onReady();
        }
    }, true);
    
    return this;
})();
//eo PLACEHOLDER