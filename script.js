function uploadFile(input) {
    let file = input.files[0];
    let progressBar = document.getElementById('progressBar');
    let formData = new FormData();
    formData.append('file', file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true);

    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            let percentComplete = (event.loaded / event.total) * 100;
            percentComplete = percentComplete.toFixed();
            progressBar.style.width = percentComplete + '%';
            progressBar.innerText = percentComplete + '%';
        }
    };

    xhr.onload = function() {
        console.log('File uploaded successfully');
        document.getElementById('downloadButton').disabled = false;
    };

    xhr.send(formData);
}


function downloadFile() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];

    if (file) {
        let blob = new Blob([file]);
        let url = URL.createObjectURL(blob);

        let downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = file.name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(url);
    } else {
        console.error('No file selected');
    }
}