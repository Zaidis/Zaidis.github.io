
//var fs = require("fs");



$(window).on("scroll", function(){
    let pos = $(document).scrollTop();
    
    if(pos === 0){
        $(".navbar_container").removeClass("active_navbar");
    } else {
        $(".navbar_container").addClass("active_navbar");
    }
});




//#region ACCORDION
  var accordion_headers = ["H1","H2","H3","H4","H5","H6"];
        $(".accordion").click(function(e) {
            var target = e.target
            var name = target.nodeName.toUpperCase();
            
            if($.inArray(name, accordion_headers) > -1) {

                $(target).children().filter(function(){
                    if($(this).hasClass("accordion_icon")){
                        if($(this).hasClass("icon_active")){
                            $(this).removeClass("icon_active").addClass("icon_idle");  
                        } else {
                            $(this).removeClass("icon_idle").addClass("icon_active");
                        }
                    }
                });


                var subItem = $(target).next();
                
                if(name == "H1"){
                    $(".accordion_initial").removeClass("accordion_initial");
                }
                
                console.log(subItem);
                $(subItem).children().filter(function(){
                    if($(this).hasClass("new_tab")){
                        return false;
                    } else {
                        $(this).css("display", "block");
                    }
                });
                $(subItem).slideToggle("fast");
            }
        });

        //allows accordion to begin closed
        $(".accordion").ready(function(e) {
            var target = e.target;
            var name = "H1";
            if($.inArray(name, accordion_headers) > -1) {
                var subItem = $(target).next();
                
                var depth = $(subItem).parents().length;
                var allAtDepth = $(".accordion p, .accordion div, .accordion video, .accordion img").filter(function() {
                if($(this).parents().length >= depth && this !== subItem.get(0)) {
                    return true; 
                }
                });

                //required for initial upload of website. otherwise accordion cuts out oddly. 
                $(allAtDepth).css("display", "none");

            }
        });
//#endregion

//#region Carousel

const carousels = $(".carousel");
const carousel_galleries = $(".carousel_gallery");

for(let i = 0; i < carousels.length; i++){
    showSlide(i, 0);
    galleryImageWidth($(carousel_galleries[i]).attr('id'));
}

function showSlide(carouselID, index){
   
    var carousel = $("#carousel_" + carouselID);
    let i = index;
    let allSlides = carousel.children().filter($(".carousel_slide"));
    if(i >= allSlides.length){
        i = 0;
    } else if ( i < 0){
        i = allSlides.length - 1;
    }

    for(let j = 0; j < allSlides.length; j++){
        $(allSlides[j]).css("display", "none");
        $(allSlides[j]).removeClass("active");
    }
    
    activateGallery($(carousel_galleries[carouselID]).attr('id'), i);
    $(allSlides[i]).css("display", "block");
    $(allSlides[i]).addClass("active");
}

function activateGallery(galleryID, index){
    var images = $("#" + galleryID).children().children().filter($(".gallery_img"));
    for(let i = 0; i < images.length; i++){
        $(images[i]).removeClass("active");
    }

    $(images[index]).addClass("active");
}

function galleryImageWidth(galleryID){
    var images = $("#" + galleryID).children().children().filter($(".gallery_img"));
    
    if(images.length >= 6){
        widthPerc = 15.7;
    } else {
        let widthPerc = (100 / images.length) -1;
    }
    
    if(widthPerc)
    for(let i = 0; i < images.length; i++){
        $(images[i]).width(widthPerc + "%");
    }
}

//Used for the buttons to slide through the carousel
function slideCarousel(carouselID, dir){
    var carousel = $("#carousel_" + carouselID);
    let allSlides = carousel.children().filter($(".carousel_slide"));
    let index = 0
    for(let i = 0; i < allSlides.length; i++){
        if($(allSlides[i]).hasClass("active")){
            index = i;
            break;
        }
    }

    if(dir === "left") {
        index--;
    } else {
        index++;
    }

    showSlide(carouselID, index);
}




//#endregion