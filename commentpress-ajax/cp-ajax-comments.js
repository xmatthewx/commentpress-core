var cpajax_live,cpajax_ajax_url,cpajax_spinner_url,cpajax_post_id,cpajax_submitting;if("undefined"!==typeof CommentpressAjaxSettings){cpajax_live=CommentpressAjaxSettings.cpajax_live;cpajax_ajax_url=CommentpressAjaxSettings.cpajax_ajax_url;cpajax_spinner_url=CommentpressAjaxSettings.cpajax_spinner_url;cpajax_post_id=CommentpressAjaxSettings.cpajax_post_id}cpajax_submitting=false;function cpajax_ajax_callback(data){var diff,i,comment;diff=parseInt(data.cpajax_comment_count)-parseInt(CommentpressAjaxSettings.cpajax_comment_count);if(diff>0){for(i=1;i<=diff;i++){comment=eval("data.cpajax_new_comment_"+i);cpajax_add_new_comment(jQuery(comment.markup),comment.text_sig,comment.parent,comment.id);CommentpressAjaxSettings.cpajax_comment_count++}}}function cpajax_add_new_comment(m,k,e,d){var l,a,g,i,f,c,h,j,b,n;l=jQuery("div.comments_container");if(l.find("#li-comment-"+d)[0]){return}a="#para_wrapper-"+k;g="#para_heading-"+k;i=jQuery(a+" ol.commentlist:first");if(e!="0"){f="#li-comment-"+e;c=jQuery(f+" > ol.children:first");if(c[0]){m.hide().css("background","#c2d8bc").appendTo(c).slideDown("fast",function(){m.animate({backgroundColor:"#ffffff"},1000,function(){m.css("background","transparent")})})}else{m.wrap('<ol class="children" />').parent().css("background","#c2d8bc").hide().appendTo(f).slideDown("fast",function(){m.parent().animate({backgroundColor:"#ffffff"},1000,function(){m.parent().css("background","transparent")})})}}else{if(i[0]){m.hide().css("background","#c2d8bc").appendTo(i).slideDown("fast",function(){m.animate({backgroundColor:"#ffffff"},1000,function(){m.css("background","transparent")})})}else{m.wrap('<ol class="commentlist" />').parent().css("background","#c2d8bc").hide().prependTo(a).slideDown("fast",function(){m.parent().animate({backgroundColor:"#ffffff"},1000,function(){m.parent().css("background","transparent")})})}}b=parseInt(jQuery(g+" a span.cp_comment_num").text());n=b+1;cpajax_update_comments_para_heading(g,n);h.css("background","#c2d8bc");h.animate({backgroundColor:"#EFEFEF"},1000);cpajax_update_para_icon(k,n);commentpress_enable_comment_permalink_clicks();commentpress_setup_comment_headers();cpajax_reassign_comments()}function cpajax_ajax_update(){if(cpajax_submitting){return}jQuery.post(cpajax_ajax_url,{action:"cpajax_get_new_comments",last_count:CommentpressAjaxSettings.cpajax_comment_count,post_id:cpajax_post_id},function(a,b){if(b=="success"){cpajax_ajax_callback(a)}},"json")}function cpajax_ajax_updater(a){if(a=="1"){CommentpressAjaxSettings.interval=window.setInterval(cpajax_ajax_update,5000)}else{window.clearInterval(CommentpressAjaxSettings.interval)}}function cpajax_reassign_comments(){var d,f,b,a,c,e;var d=jQuery("#comments_sidebar .comment-wrapper .comment-assign");d.show();d.draggable({helper:"clone",cursor:"move"});f=jQuery("#content .post .textblock");f.droppable({accept:".comment-assign",hoverClass:"selected_para selected_dropzone",drop:function(g,h){b=jQuery(this).prop("id").split("-")[1];a={resizable:false,height:160,zIndex:3999,modal:true,dialogClass:"wp-dialog",buttons:{Yes:function(){jQuery(this).dialog("option","disabled",true);jQuery(".ui-dialog-buttonset").html('<img src="'+cpajax_spinner_url+'" id="loading" alt="'+cpajax_lang[0]+'" />');jQuery(".ui-dialog-title").html(cpajax_lang[9]);jQuery(".cp_alert_text").html(cpajax_lang[10]);cpajax_reassign(b,h)},Cancel:function(){jQuery(this).dialog("close");jQuery(this).dialog("destroy");jQuery(this).remove()}}};c=cpajax_lang[8];e=jQuery('<div><p class="cp_alert_text">'+c+"</p></div>");e.prop("title",cpajax_lang[7]).appendTo("body").dialog(a)}})}function cpajax_reassign(d,e){var c,f,b,a,g;c=jQuery(e.draggable).prop("id").split("-")[1];f=jQuery(e.draggable).closest("li.comment");b=f;a=f.siblings("li.comment");if(a.length==0){g=f.parent("ol.commentlist");b=g}jQuery(b).slideUp("slow",function(){jQuery.post(cpajax_ajax_url,{action:"cpajax_reassign_comment",text_signature:d,comment_id:c},function(h,i){if(i=="success"){document.location.reload(true)}else{alert(i)}},"json")})}jQuery(document).ready(function(f){cpajax_ajax_updater(cpajax_live);cpajax_reassign_comments();var a,d;function i(){jQuery("#respond_title").after('<div id="cpajax_error_msg"></div>');jQuery("#submit").after('<img src="'+cpajax_spinner_url+'" id="loading" alt="'+cpajax_lang[0]+'" />');jQuery("#loading").hide();a=jQuery("#commentform");d=jQuery("#cpajax_error_msg");d.hide()}i();function e(){jQuery("#loading").hide();jQuery("#submit").removeAttr("disabled");jQuery("#submit").show();addComment.enableForm();cpajax_submitting=false}function h(n){var t,p,l,q,r,o,s,m,u;t=a.find("#text_signature").val();p=a.find("#comment_parent").val();l="#para_wrapper-"+t;q="#para_heading-"+t;jQuery(l).removeClass("no_comments");if(p!="0"){r="#li-comment-"+p;o=jQuery(r+" > ol.children:first");if(o[0]){b(n,r+" > ol.children:first > li:last",o,r+" > ol.children:first > li:last")}else{b(n,r+" > ol.children:first",r,r+" > ol.children:first > li:last")}}else{s=jQuery(l+" > ol.commentlist:first");if(s[0]){b(n,l+" > ol.commentlist:first > li:last",s,l+" > ol.commentlist:first > li:last")}else{c(n,l+" > ol.commentlist:first",l,l+" > ol.commentlist:first > li:last")}}jQuery("#respond").slideUp("fast",function(){addComment.cancelForm()});m=parseInt(jQuery(q+" a span.cp_comment_num").text());u=m+1;j(q,u);g(t,u);if(t!=""){commentpress_scroll_page(jQuery("#textblock-"+t))}else{commentpress_scroll_to_top(0,cp_scroll_speed)}commentpress_enable_comment_permalink_clicks();commentpress_setup_comment_headers();cpajax_reassign_comments();a.find("#comment").val("")}function b(l,n,o,m){if(l===undefined||l===null){return}l.find(n).hide().appendTo(o);k(n,m)}function c(l,n,o,m){if(l===undefined||l===null){return}l.find(n).hide().prependTo(o);k(n,m)}function k(n,m){var l,o,p;l=jQuery(m).prop("id");o="#comment-"+(l.toString().split("-")[2]);p=jQuery(o);p.css("background","#c2d8bc");jQuery(n).slideDown("slow",function(){jQuery("#comments_sidebar .sidebar_contents_wrapper").scrollTo(p,{duration:cp_scroll_speed,axis:"y",onAfter:function(){p.animate({backgroundColor:"#ffffff"},1000,function(){p.css("background","transparent")})}})})}function j(m,l){jQuery(m+" a span.cp_comment_num").text(l.toString());if(l==1){jQuery(m+" a span.cp_comment_word").text(cpajax_lang[11])}if(l>1){jQuery(m+" a span.cp_comment_word").text(cpajax_lang[12])}}function g(n,l){var m;m="#textblock-"+n;jQuery(m+" span small").text(l.toString());if(l==1){jQuery(m+" span.commenticonbox a.para_permalink").addClass("has_comments");jQuery(m+" span small").css("visibility","visible")}}jQuery("#commentform").on("submit",function(m){var l;cpajax_submitting=true;d.hide();if(a.find("#author")[0]){if(a.find("#author").val()==""){d.html('<span class="error">'+cpajax_lang[1]+"</span>");d.show();cpajax_submitting=false;return false}if(a.find("#email").val()==""){d.html('<span class="error">'+cpajax_lang[2]+"</span>");d.show();cpajax_submitting=false;return false}l=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;if(!l.test(a.find("#email").val())){d.html('<span class="error">'+cpajax_lang[3]+"</span>");d.show();if(m.preventDefault){m.preventDefault()}cpajax_submitting=false;return false}}if(cp_tinymce=="1"){tinyMCE.triggerSave();addComment.disableForm()}if(a.find("#comment").val()==""){d.html('<span class="error">'+cpajax_lang[4]+"</span>");d.show();addComment.enableForm();cpajax_submitting=false;return false}jQuery(this).ajaxSubmit({beforeSubmit:function(){jQuery("#loading").show();jQuery("#submit").prop("disabled","disabled");jQuery("#submit").hide()},error:function(n){var o;d.empty();o=n.responseText.match(/<p>(.*)<\/p>/);d.html('<span class="error">'+o[1]+"</span>");d.show();e();return false},success:function(o){var n;try{if(jQuery.parseHTML){n=jQuery(jQuery.parseHTML(o))}else{n=jQuery(o)}h(n);e()}catch(p){e();alert(cpajax_lang[6]+"\n\n"+p)}}});return false})});