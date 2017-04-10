function domOperation() {

	var uniqueId;


	IS_FECTHING = false;

	fetch_wish(wishNumber, fetch_number);
	//页面初始化的时候先加载一次愿望数据
	//line 31

	enrollEventHandlers();
	//注册各种点击事件的监听
	//line 139





}

var wishNumber = 0;
var fetch_number = 10;


var wish_array = [];

var totalWishNumber = 0;


//----------------------
//data-communication functions

function fetch_wish() {

	var wishID = wishNumber == 0? 0: wish_array[wishNumber-1].id;
    $.get('http://'+ip+'/html/queryWish.php',
    	{wishN: wishID, fetchN: fetch_number},
		function(data){
			var obj = eval("("+data+")");
			var tempDom = document.createDocumentFragment();
			totalWishNumber = obj.totalWish;
			delete obj.totalWish;
			for (var i in obj) {
				var wishToArray;
				wishToArray = {
					id: obj[i].id,
					wish: obj[i].wish,
					image: obj[i].image,
					date: obj[i].date
				};
				wish_array[wishNumber++] = wishToArray; 	
				var wishItem = document.createElement("div");
				wishItem.setAttribute('class', 'wish-item');
			        var dashLine = obj[i].wish.indexOf('----');
				if (dashLine == -1) {
				    wishItem.innerHTML = "<div class = 'pic-and-content-hide'>"
				    +"<span class = 'img'>"
				    +"<img src = '../upload_imgs/"+obj[i].image+".png'>"
				    +"</span>"
                        	    +"<span class = 'content'>"+obj[i].wish+"</span>"
			 	    +"</div>"
				    +"<div class = 'date-and-like'>"
				    +"<span class = 'date'>"+obj[i].date+"</span>"
				    +"<span class = 'like'> 第 "+wishNumber+" 条愿望</span>"
				    +"</div>";

				} else {
                                    var wishContext = obj[i].wish.substr(0,dashLine);
                                    var shuming = obj[i].wish.substr(dashLine);
				    wishItem.innerHTML = "<div class = 'pic-and-content-hide'>"
				    +"<span class = 'img'>"
				    +"<img src = '../upload_imgs/"+obj[i].image+".png'>"
				    +"</span>"
                                    +"<span class = 'content'>"+wishContext
                                    +"<br>"+shuming+"</span>"
                                    +"</div>"
                                    +"<div class = 'date-and-like'>"
                                    +"<span class = 'date'>"+obj[i].date+"</span>"
                                    +"<span class = 'like'> 第 "+wishNumber+" 条愿望</span>"
                                    +"</div>";

				}
				tempDom.appendChild(wishItem);
				
			}
			document.getElementById("wish-list").appendChild(tempDom);

			$(".fetch-loading-show").attr('class', 'fetch-loading');

			IS_FECTHING = false;
			$(".pic-and-content-hide").fadeIn();
			$(".pic-and-content-hide").attr('class', '.pic-and-content');
		}
	);		
}


function upload_pic(image) {

	uniqueId = getTimeString();
	var img = image.replace(/^data:image\/(png|jpg);base64,/, "");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://"+ip+"/html/test.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("data="+img+"&filename="+uniqueId);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == 'success') {
				show_text_editor();

            } else {

            }
            $("#gif").hide(); 
        }
    }
		

}

function post_wish(text, uniqueId) {
	var time = new Date();
	time = time.toLocaleString();
    $.post('http://'+ip+'/html/wish.php',
        {'data': text, 'imageName': uniqueId, 'time': time},
		function(data){
			if(data == 'success') {
				make_A_wish();
			} else {

			}
		}
	);	
}
//----------------------







//----------------------
//dom operation functions
function show_text_editor() {
	$(".cropper-container").hide();
	$("#new-wish-text-container").show();
	$("#uploader").hide();
	$("#change-pic").hide();
}
function hide_text_editor() {
	$("#img-for-cropper").attr("src", "").cropper("clear");
	$(".cropper-container").show();
	$("#new-wish-text-container").hide();
	$("#change-pic").show();
	$("#file-reader").val("");
	$(".cropper-container img").attr("src", "").css("width", 0).css("height", 0);
	$(".cropper-canvas").css('width', "0").css('height', "0");

}
function outer_button_toggle() {
	$("#new-wish").toggle();
	$("#new").toggle();
}
function middle_div_toggle() {
	if ($("#new-wish-editor").length == 0) {
		$("#new-wish-editor-show").attr("id", "new-wish-editor");
	} else {
		$("#new-wish-editor").attr("id", "new-wish-editor-show");
	}
		
}
function wish_list_toggle()	 {
	if ($(".wish-list-container").length == 0) {
		$(".wish-list-container-show").attr('class','wish-list-container');	
	} else {
		$(".wish-list-container").attr('class','wish-list-container-show');
	}
}
		
//----------------------








//----------------------
//event handler functions
function enrollEventHandlers() {

	var workers = enrollWebWorkers();
	//注册需要用到的web workers线程
	//line 210;

	window.onunload = function() {
		for (var e in workers) {
			workers[e].terminate();
		}
	}

	$("#close-detail-wish").click(function() {
		outer_button_toggle();
		$("#detail-wish-wrapper").hide();
                document.addEventListener('touchstart',onMouseDown,false);
	});

        $("#close-new-wish-editor-show").click(function() {

		outer_button_toggle();
                middle_div_toggle();
                document.addEventListener('touchstart', onMouseDown,false);
                orbitControls.enabled = true; 
        });

	$("#new").click(function() {
		orbitControls.enabled = false;
		renderToggle = 0;
		outer_button_toggle();
		wish_list_toggle();
		$("#close").css('opacity',1);
                document.removeEventListener('touchstart', onMouseDown);

		$(".wish-list-container-show").scroll(function() {
				var scrollPos = $(".wish-list-container-show").scrollTop();
				var windowHeight = $(window).height();
				if (scrollPos + windowHeight  == wishNumber * 680 + 84) {
					if (!IS_FECTHING) {
						IS_FECTHING = true;
						$(".fetch-loading").attr('class', 'fetch-loading-show');
						fetch_wish();
					}
				}
		});

	});

	$("#close").click(function() {

		wish_list_toggle();
		$("#close").css('opacity',0);
		outer_button_toggle();
		orbitControls.enabled = true;
		renderToggle = 1;
		render();
		document.addEventListener('touchstart', onMouseDown, false);
	});

	$("#wish-submit").click(function() {
		var text = $("#wish").val();
		if (text.length > 150) {
			alert("字数超过了150字哦~");
		} else {
            text = dumpNewLine(text);
			post_wish(text, uniqueId);
			middle_div_toggle();
			outer_button_toggle();
			hide_text_editor();
                        document.addEventListener('touchstart', onMouseDown);
			orbitControls.enabled = true;
		}
	});

	$("#new-wish").click(function() {
		document.removeEventListener('touchstart', onMouseDown);
		outer_button_toggle();
		middle_div_toggle();
	});


	$("#file-reader").change(function() {
		var file = this.files[0];
		if (file.type != "image/jpeg" && file.type != "image/png") {
		       window.alert('请上传jpeg或png格式的图片');
		} else {
		       workers.read_pic_worker.postMessage(file);
		}

	});

	$("#pic-submit").click(function(){
		$(this).hide();
		
		$("#gif").show();
		var img = $("#img-for-cropper").cropper('getCroppedCanvas', {width: 128, height: 128}).toDataURL('image/png');
		upload_pic(img);
	});


}
//----------------------







//----------------------
//web workers  functions
function enrollWebWorkers() {


	//新建立一个线程进行文件的读取，然后将文件读取的结果返回
	//和ajax一样是属于I/O操作，会阻塞UI线程
	var read_pic_worker = new Worker("../js/web_workers/read_pic.js");

	read_pic_worker.onmessage = function(e) {
                
		orbitControls.enabled = false;

		$("#img-for-cropper").attr({'src': e.data, 'width': "0px", 'height': "0px"});
		$("#img-for-cropper").cropper('replace',e.data);
		$("#img-for-cropper").cropper('setAspectRatio', 16/16);
		$("#uploader").show();
		$("#pic-submit").show();
	}

	return {read_pic_worker: read_pic_worker};



}

//----------------------


function make_A_wish() {

}




//----------------------
//tool functions

function parseDom(arg) {
	var obj = document.createElement('div');
	obj.innerHTML = arg;
	return obj.childNodes;
}
function dumpNewLine(text) {
        var newText = "";
	for (var i = 0; i< text.length; i++) {
	    if (text[i] != '\n') newText += text[i];
        }
	return newText;
}
function getTimeString() {
	var time = new Date();
	time = time.toUTCString();
	var newString = "";
	for (var i = 0; i < time.length; i++) {
		if (time[i] != ' ' && time[i] != ',' && time[i] != ':') {
			newString += time[i];
		}
	}
	return newString;
}
//----------------------
