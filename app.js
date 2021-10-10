const image = document.querySelectorAll(".image");
const imageContainer = document.querySelector(".image-container");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".previous-btn");
const imageSliderDots = document.querySelector(".image-slider-dots");
  
let numberOfImages = image.length;
let imageWidth = image[0].clientWidth;
let currentImage =0;

//setting up slider

function init(){

    image.forEach((img,i)=>{
        img.style.left = i*100 + "%";   //image[0]=0, image[1]=100% ...
    });

    image[0].classList.add("active");

    createSliderDots();
}

init();

//Create Slider Image Dots

function createSliderDots(){
    for(let i=0; i<numberOfImages; i++){
        const dot = document.createElement("div");
        dot.classList.add("single-dot");
        imageSliderDots.appendChild(dot);

        //To navigate to i-th slide by clicking on dot  (optional functionality)
        dot.addEventListener("click",()=>{     
            nextImage(i);
        });
    }

    imageSliderDots.children[0].classList.add("active");

}

//Next Button

nextBtn.addEventListener("click",()=>{
    if(currentImage>= numberOfImages-1){
        nextImage(0);

        return;
    }
    
    currentImage++;
    nextImage(currentImage);
 
});

//Previous Button

previousBtn.addEventListener("click",()=>{
    if(currentImage<=0){
        nextImage(numberOfImages-1);
        
        return;
    }
    
    currentImage--;
    nextImage(currentImage);
 
});

function nextImage(imageNumber){
    imageContainer.style.transform = "translateX(-" + imageWidth * imageNumber + "px)";
   
    currentImage = imageNumber;

    setActiveClass();
}

// Set Active Class

function setActiveClass(){

    //Set Active Class for Slide Image

    let currentActive = document.querySelector(".image.active");
    currentActive.classList.remove("active");
    image[currentImage].classList.add("active");

    // Set Active Class For Navigation Dots

    let currentDot = document.querySelector(".single-dot.active");
    currentDot.classList.remove("active");
    imageSliderDots.children[currentImage].classList.add("active");


}