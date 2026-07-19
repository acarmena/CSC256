// TODO: Add JavaScript functionality for image cycling
        // the array of images to cycle through - make sure to use at least 4 images in this assignment.
        let images = [
            "./images/reference1.jpg",
            "./images/reference2.jpg",
            "./images/reference3.jpg",
            "./images/reference4.jpg",
            "./images/reference5.jpg",
            "./images/reference6.jpg",
            "./images/reference7.jpg",
            "./images/reference8.jpg",];

            // create a variable to keep track of the current image index
            let currentImage = 0;

            // the function to show the selected image
            function showImage(index){
                // nickname/short to the image HTML element
                let slide = document.getElementById("slideshow");
                // change the image source to the selected image
                slide.src = images[index];
            }

            // create a function to show the previous image in the array
            function previous_image(){
                // subtract 1 from the current image index tracker
                currentImage--;
                // if the current image index is less than 0, set it to the last image
                if (currentImage < 0) {
                    currentImage = images.length - 1;
                }
                showImage(currentImage);
            }

            // create a function to show the next image in the array
            function next_image(){
                // add 1 to the current image index tracker
                currentImage++;
                showImage(currentImage);
                // if the current image index is greater than the last image, set it to the first image
                if (currentImage >= images.length) {
                    currentImage = 0;
                }
            }

            // call the showImage function to display the first image in the array
            showImage(0);