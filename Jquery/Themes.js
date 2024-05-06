$(document).ready(function () {
    $("#theme-light").click(function () {
        $("#div1,#div2,body").css("background", "none");
        $("#div1,#div2,body").css("background-color", "#a2d2ff");
        $("#section1,#section2,#section3,.sectionHead,.sectionfilter").css("background-color", "white");
        $(".formElement").css("background-color", "white");
        $("label").css("color", "black");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,#userListGrid,.userListDiv,.crudButtonRemove,.crudButtonUpdate"
        ).css("background-color", "#237fd5");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate"
        ).css("color", "white");
        $("label").css("color", "black");
        $(
            ".sectionfilter"
        ).css("background-color", "white");
        $("#userListGridData,.userListData").css("background-color", "white");
        $("input").css("background-color", "white");
        $("#submitSuccessful h3").css("color", "black");
        $("#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink").css("border", "none")
        $("#submitSuccessful h3").css("color", "black");
    });


    $("#theme-dark").click(function () {
        $("#div1,#div2,body").css("background-color", "#5B5C62");
        $("#section1,#section2,#section3,#submitSuccessful").css("background-color", "#26262C");
        $(".formElement").css("background-color", "#5B5C62");
        $(".formElement").css("border", "1px solid black");
        $("label").css("color", "white");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate,.sectionHead,#userListGrid,.userListDiv"
        ).css("background-color", "#6A6B70");
        $(".sectionfilter,#userListGrid,.userListDiv").css("background-color","#26262C")
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.userListHead,.crudButtonRemove,.crudButtonUpdate,.sectionHead,.sectionfilter"
        ).css("color", "white");
        $("#submitSuccessful h3").css("color", "white");

    });

    $("#theme-colorful").click(function () {
        $("#div1,#div2,body").css("background", "url('HD-wallpaper-colorful-background-ultra-aero-colorful-beautiful-yellow-spring-green-abstract-color-white-pink-design-light-background-colors-bright-colourful-shades-easter-vivid-pastel-soft-blur.jpg')");
        $("#div1,#div2,body").css("background-repeat", "no-repeat");
        $("#div1,#div2,body").css("background-size", "100% 100%");

        $("#section1,#section2,#section3,#submitSuccessful").css("background-color", "white");

        $(".formElement:contains('First')").css("background-color", "#FBF0B2")
        $(".formElement:contains('Phone')").css("background-color", "#FFC7EA")
        $(".formElement:contains('Last')").css("background-color", "#D8B4F8")
        $(".formElement:contains('Email')").css("background-color", "#CAEDFF")

        $(".formElement:contains('Age')").css("background-color", "#FBF0B2")
        $(".formElement:contains('Disability')").css("background-color", "#FFC7EA")
        $(".formElement:contains('Marital')").css("background-color", "#D8B4F8")
        $(".formElement:contains('Gender')").css("background-color", "#CAEDFF")

        $(".formElement:contains('Address')").css("background-color", "#FBF0B2")
        $(".formElement:contains('City')").css("background-color", "#FFC7EA")
        $(".formElement:contains('State')").css("background-color", "#D8B4F8")
        $(".formElement:contains('Country')").css("background-color", "#CAEDFF")
        $("label").css("color", "black");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate,.sectionHead,.sectionfilter,#userListGrid,.userListDiv"
        ).css("background-color", "#b9fbc0");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate,.sectionHead,.sectionfilter,#userListGrid,.userListDiv"
        ).css("color", "black");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate,.sectionHead,.sectionfilter,#userListGrid,.userListDiv"
        ).css("border", "1px solid black");

        $("#submitSuccessful h3").css("color", "black");
    });

    $("#theme-vintage").click(function () {
        $("#div1,#div2,body").css("background", "none");
        $("#div1,#div2,body").css("background-color", "#FFF2E1");
        $("#section1,#section2,#section3").css("background-color", "#D1BB9E");
        $(".formElement").css("background-color", "#FFF2E1");
        $("label").css("color", "black");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.sectionHead"
        ).css("background-color", "#FFF2E1");
        $(
            "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate,.sectionHead,.sectionfilter,#userListGrid,.userListDiv,.userListHead"
        ).css("color", "black");
        $("label").css("color", "black");
        $(
            ".successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate,.sectionfilter,#userListGrid,.userListDiv"
        ).css("background-color", "#D1BB9E");
        $("#userListGridData,.userListData").css("background-color", "#FFF2E1");
        $("input").css("background-color", "white");
        $("#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink").css("border", "2px solid black")
    });

    $("#theme-nature").click(function () {
        $("#div1,#div2,body").css("background", "url('https://i.ytimg.com/vi/OOl8ykqhHkw/maxresdefault.jpg')");
        $("#div1,#div2,body").css("background-repeat", "no-repeat");
        $("#div1,#div2,body").css("background-size", "100% 100%");
        $("#div1,#div2,body").css("background-color", "#004B23");
        $("#section1,#section2,#section3").css("background-color", "#87A922");
        $(".formElement").css("background-color", "#004B23");
        $(".formElement").css("border", "1px solid black");
    //     $("label").css("color", "black");
    //     $(
    //         "#button-next,#button-next2,#button-previous2,#button-previous,#submit,.successBtn,#viewUserLink,.crudButtonRemove,.crudButtonUpdate,.sectionHead,.sectionfilter,#userListGrid,.userListDiv"
    //     ).css("background-color", "#926448");
    //     $(
    //         "#button-next,.sectionHead,.sectionfilter,#userListGrid,.userListDiv"
    //     ).css("color", "white");
    //     $("#userListGridData,.userListData,#d").css(
    //         "background-color",
    //         "#CE9F6F"
    //     )
    //     $("input").css('background-color', "white");
    })
});
