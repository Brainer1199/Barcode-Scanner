document.addEventListener("DOMContentLoaded", function() {
    let scanner = null;

    // Function to start the QR code scanner
    function startScanner() {
        scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });

        scanner.addListener('scan', function(content) {
            alert('Scanned: ' + content);
            // You can handle the scanned content here
        });

        Instascan.Camera.getCameras().then(function(cameras) {
            if (cameras.length > 0) {
                document.getElementById('scanner-container').style.display = 'block';
                scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function(e) {
            console.error(e);
        });
    }

    // Function to stop the QR code scanner
    function stopScanner() {
        if (scanner !== null) {
            scanner.stop();
            document.getElementById('scanner-container').style.display = 'none';
        }
    }

    // Function to handle selecting image from gallery
    function selectImage() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(e) {
            // Handle selected image here
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function(event) {
                let img = document.createElement('img');
                img.src = event.target.result;
                document.body.appendChild(img);
                new Instascan.Scanner().scanImage(img).then(function(result) {
                    alert('Scanned from image: ' + result);
                }).catch(function(error) {
                    alert('Error scanning image: ' + error);
                });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    // Function to handle creating custom QR code
    function createQRCode() {
        let data = prompt("Enter the information you want to encode in the QR code:");
        if (data !== null && data.trim() !== '') {
            // Generate QR code using the entered data
            let qrCodeContainer = document.createElement('div');
            qrCodeContainer.id = 'qrcode';
            document.body.appendChild(qrCodeContainer);
            new QRCode(qrCodeContainer, data);
        } else {
            alert('Please enter valid information.');
        }
    }

    // Click event listeners for buttons
    document.getElementById('scan-btn').addEventListener('click', function() {
        startScanner();
    });

    document.getElementById('gallery-btn').addEventListener('click', function() {
        selectImage();
    });

    document.getElementById('create-qr-btn').addEventListener('click', function() {
        createQRCode();
    });
});
