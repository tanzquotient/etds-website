window.onload = loadImg();

function loadImg() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const cursor = document.getElementById("cursor");
    const canvas = document.getElementById("canvas");

    const img_id = urlParams.get('img');
    const x = urlParams.get('x');
    const y = urlParams.get('y');

    const canvas_rect = canvas.getBoundingClientRect();
    const canvas_x = canvas_rect.left + window.scrollX;
    const canvas_y = canvas_rect.top + window.scrollY;
    // console.log(`canvas_x: ${canvas_x} canvas_y: ${canvas_y}`);

    // The point where the user clicked
    const cursor_radius = 16;
    const cursor_x = parseInt(x) - cursor_radius + canvas_x;
    const cursor_y = parseInt(y) - cursor_radius + canvas_y;
    // console.log(`cursor_x: ${cursor_x} cursor_y: ${cursor_y}`);

    cursor.style.left = `${cursor_x}px`;
    cursor.style.top = `${cursor_y}px`;

    canvas.src = "/assets/img/lost-found/" + img_id + ".jpeg";

    document.getElementById("img_id").value = img_id;

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
