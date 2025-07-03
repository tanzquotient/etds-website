window.onload = loadImg();

function loadImg() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const img_id = urlParams.get('img');
    const x = urlParams.get('x');
    const y = urlParams.get('y');

    // The point where the user clicked
    // Offsets:
    // - Fixed offset from the top of top of the page.
    //     - However, on small screens (small phones) the explanatory text produces to much line breaks
    //     - Hence, we increase the offset if the screen.width is below 400
    // - Center cursor (default is top left)
    var offset = 170 + Math.max(400 - screen.width, 0)
    document.getElementById("canvas").style = "top: " + offset + "px; position: absolute; left: 0px;"
    const x_trans = parseInt(x) - 25;
    const y_trans = parseInt(y) + offset - 25;

    document.getElementById("img_id").value = img_id;

    pos = "left:" + x_trans + "px; top: " + y_trans + "px;";
    document.getElementById("cursor").style = pos;

    document.getElementById("canvas").src = "/assets/img/lost-found/" + img_id + ".jpeg";

    if (x != null) {
        claim_code = img_id + "_" + x + "_" + y;
        document.getElementById("claim_code").value = claim_code;

        // if we want to do it via email
        // document.getElementById("claim_form").action = "mailto:etds@tanzquotient.org?subject=Lost%20and%20Found&body=" +
        //	 encodeURI("I have lost the following item:\n\n" +
        //	 location.protocol + '//' + location.host + location.pathname + "?item=" + item + "\n\n" +
        //	 "Below, I make a suggestion how I could get it back."
        //	 );

        // if we want to do it via google forms
        document.getElementById("entry.1487141201").value = location.toString();
    }
}
