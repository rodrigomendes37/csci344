// tracks the number of slides we shift from the starting view
//starting at 0 meaning we showing the first set of slides
let currentPosition = 0;

// this has to match the css gap between slides (carousel-overflow-container)
let gap = 10;

// this has to match the css width of each slide (.carousel-item)
const slideWidth = 400;

function moveCarousel(direction) {
    //select every slide in the carousel, images and the letter blocks
    const items = document.querySelectorAll(".carousel-item");

    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        //the visible window is 800px wide, so it shows 2 slides at a time
        // means the furthest we can move is total slides - 2
        if (currentPosition >= items.length - 2) {
            //if already at the end do nothing
            return false;
        }
        //move one step forward
        currentPosition++;
    } else {
        //if we are at the beggining, we can't move backwards
        if (currentPosition == 0) {
            return false;
        }
        //move one step backwards
        currentPosition--;
    }

    //compute how far to shift slides
    // each step = slidewidth + gap spacing
    const offset = (slideWidth + gap) * currentPosition;

    //apply the shift to every slide so everything moves together
    for (const item of items) {
        //negative translateX moves the content to the left
        item.style.transform = `translateX(-${offset}px)`;
    }
}
