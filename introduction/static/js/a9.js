// console.log("imported a9.js");

event1 = function(){
    document.getElementById("a9_b1").style.display = 'none';
    document.getElementById("a9_d1").style.display = 'flex';
}

event2 = function(){
    document.getElementById("a9_b2").style.display = 'none';
    document.getElementById("a9_d2").style.display = 'flex';
}

event3 = function(){
    var log_code = document.getElementById('a9_log').value
    var target_code = document.getElementById('a9_api').value

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "csrftoken=5fVOTXh2HNahtvJFJNRSrKkwPAgPM9YCHlrCGprAxhAAKOUWMxqMnWm8BUomv0Yd; jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjUzMzEzMDIxLCJpYXQiOjE2NTMzMDk0MjF9.dh2gfP9wKD8GKu1J-jVs2jJUYMgKu_kMaJjrD0hHP-I");

    var formdata = new FormData();
    formdata.append("csrfmiddlewaretoken", "5fVOTXh2HNahtvJFJNRSrKkwPAgPM9YCHlrCGprAxhAAKOUWMxqMnWm8BUomv0Yd");
    formdata.append("log_code", log_code);
    formdata.append("api_code", target_code);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    fetch("/2021/discussion/A9/api", requestOptions)
    .then(response => response.text())
result => {
    // Added proper error handling for JSON parsing
    let data;
    try {
        data = JSON.parse(result);  // parse JSON string into object
    } catch (e) {
        console.error("Failed to parse response data:", e);
        return; // Exit the function on parse error
    }
    
    console.log(data.logs);
    document.getElementById("a9_d3").style.display = 'flex';
    
    // Added input validation before rendering
    if (!Array.isArray(data.logs)) {
        console.error("Expected an array of logs but received:", typeof data.logs);
        return;
    }
    
    for (var i = 0; i < data.logs.length; i++) {
        // Validate that logs contain expected data format before rendering
        if (typeof data.logs[i] !== 'string') {
            console.error("Unexpected data type in logs");
            continue;  // Skip invalid entries
        }
        
        var li = document.createElement("li");
        
        // Fixed XSS vulnerability by using textContent instead of innerHTML
        li.textContent = data.logs[i];
        
        // Alternative approach using contextual encoding if some HTML formatting is needed
        /* 
        const encoder = new DOMParser().parseFromString('', 'text/html');
        li.innerHTML = encoder.createTextNode(data.logs[i]).textContent;
        
        // Or using DOMPurify for sanitization if HTML is required
        // li.innerHTML = DOMPurify.sanitize(data.logs[i]);
        */
        
        document.getElementById("a9_d3").appendChild(li);
    }
    
    // Note: To complete the defense-in-depth approach, add Content-Security-Policy
    // in your HTML head or through HTTP headers:
    // <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';">
}

    })
    .catch(error => console.log('error', error));
    }