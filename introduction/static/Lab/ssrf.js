
function frame1to2(){
    // frame 1 to 2
    document.getElementById('ssrf-frame-1').style.display = 'none';
    document.getElementById('ssrf-frame-2').style.display = 'flex';
    document.getElementById('ssrf-progress-bar').style.display = 'flex';
}

function frame2to3(){
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    var arr = [];
    for (var checkbox of markedCheckbox){
        arr.push(parseInt(checkbox.value));
    }
    var score = 0;
    var result = [8,9,10,11,12];
    for (var items of arr){
        if(result.includes(items)){
            score++;
        }
        else{
            score--;
        }
    }
    if( score >= 4 ){
        document.getElementById('ssrf-frame-2').style.display = 'none';
        document.getElementById('ssrf-bar-status1').classList.add('ssrf-bar-status')
        // Replaced alert() with notification service for better UX and security
        NotificationService.showNotification('success', 'Congratulation! You have figure this out !!');
        document.getElementById('ssrf-frame-3').style.display = 'flex';
    }
}

// Notification Service - Centralized pattern for managing notifications
const NotificationService = (() => {
    // Private methods and properties
    const _showSweetAlert = (type, message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        
        Toast.fire({
            icon: type,
            title: message
        });
    };
    
    const _showFallbackNotification = (type, message) => {
        const notification = document.createElement('div');
        notification.className = `custom-notification custom-notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        // Add styling
        notification.style.padding = '10px 20px';
        notification.style.background = type === 'success' ? '#4CAF50' : 
                                        type === 'error' ? '#F44336' :
                                        type === 'warning' ? '#FF9800' : '#2196F3';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Add dismiss button for accessibility
        const dismissButton = document.createElement('button');
        dismissButton.textContent = '×';
        dismissButton.style.background = 'transparent';
        dismissButton.style.border = 'none';
        dismissButton.style.color = 'white';
        dismissButton.style.fontSize = '20px';
        dismissButton.style.marginLeft = '10px';
        dismissButton.style.cursor = 'pointer';
        dismissButton.setAttribute('aria-label', 'Dismiss notification');
        
        dismissButton.addEventListener('click', () => {
            document.body.removeChild(notification);
        });
        
        notification.appendChild(dismissButton);
        document.body.appendChild(notification);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }
        }, 5000);
        
        // Allow keyboard focus
        notification.setAttribute('tabindex', '0');
    };
    
    const _tryWebNotification = (message) => {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Success", { body: message });
            return true;
        } else if ("Notification" in window && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
        return false;
    };

    // Public API
    return {
        showNotification: (type, message, options = null) => {
            // Try to use SweetAlert2 if available
            if (typeof Swal !== 'undefined') {
                _showSweetAlert(type, message);
            } else {
                // Fallback to custom notification
                _showFallbackNotification(type, message);
            }
            
            // For critical messages, also try web notification API
            if (options.critical) {
                _tryWebNotification(message);
            }
        }
    };
})();

}

function frame3to4(){
    var markedCheckbox = document.querySelectorAll('input[name="form2"]:checked');
    var arr = [];
    for (var checkbox of markedCheckbox){
        arr.push(parseInt(checkbox.value));
    }
    var score = 0;
    var result = [3,7,11,15];
    for (var items of arr){
        if(result.includes(items)){
            score++;
        }
        else{
            score--;
        }
    }
    if( score >=4 ){
        document.getElementById('ssrf-frame-3').style.display = 'none';
        document.getElementById('ssrf-bar-status2').classList.add('ssrf-bar-status')
        alert('Congratulation! you have detected defective codes in html');
        document.getElementById('ssrf-frame-4').style.display = 'flex';
    }
}


function checkcode(){
    var python_code = document.getElementById('python').value
    var html_code = document.getElementById('html').value

    var formdata = new FormData();
    formdata.append('python_code', python_code);
    formdata.append('html_code', html_code);
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
    fetch("api/ssrf", requestOptions)
    .then(response => response.text())
    .then((result) => {
        console.log(result);
        var obj = JSON.parse(result);
        alert(obj.message);
        if (obj.passed == 1 ){
            document.getElementById('ssrf-frame-4').style.display = 'none';
            document.getElementById('ssrf-bar-status3').classList.add('ssrf-bar-status')
            document.getElementById('ssrf-frame-5').style.display = 'flex';
        }
    })
    .catch(error => console.log('error', error));
}