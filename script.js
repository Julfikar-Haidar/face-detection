Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('models')
])
.then(uploadImage)

// function for face detect & image upload

function uploadImage() {
    const con = document.querySelector('.container');
    const input = document.querySelector('#myImg');
    const imgFile = document.querySelector('#myFile');
    var can;
    var img;
    imgFile.addEventListener('change', async() => {
        if(can) { can.remove();}
        if(img) {img.remove()}
        // creating a htmlelement from a blob
        img = await faceapi.bufferToImage(myFile.files[0]);
        input.src = img.src;
        const results = await faceapi.detectAllFaces(input).withFaceLandmarks()
        .withFaceDescriptors();
        console.log(results);
        const faceMatcher = new faceapi.FaceMatcher(results);
        results.forEach(fd => {
            const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
            console.log(bestMatch)
        });
        // create a canvas
        can = faceapi.createCanvasFromMedia(input);
        con.append(can);
        faceapi.matchDimensions(can,{width:input.width,height:input.height})
        //resize the box
        const detectionsForSize = faceapi.resizeResults(results, {width:input.width, height:input.height});
        const box = results[0].detection.box;
        const facebox = new faceapi.draw.DrawBox(box);
        faceapi.draw.drawDetections(can, detectionsForSize);

    })
}
