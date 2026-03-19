let searchTerm = "";
let openOnly = false;

function isClassFull(course) {
    // Return true if course.Classification.Open === false
    return course.Classification.Open === false;
}

function doesTermMatch(course) {
    // If searchTerm is empty, return true (show all courses)
    // Convert searchTerm to lowercase
    // Check if searchTerm appears in (all converted to lowercase):
    //   - course.Code
    //   - course.Title
    //   - course.CRN (convert to string first)
    //   - course.Instructors[].Name (use map to get all names, then join)
    // Use includes() for case-insensitive matching
    // Return true if searchTerm matches any of these fields
    if(searchTerm.trim() === ""){
        return true;
    }

    const term = searchTerm.toLowerCase();
    const code = course.Code.toLowerCase();
    const title = course.Title.toLowerCase();
    const crn = String(course.CRN).toLowerCase();
    const instructorNames = course.Instructors
        .map((instructor) => instructor.Name)
        .join(" ")
        .toLowerCase();

    return (
        code.includes(term) || 
        title.includes(term) ||
        crn.includes(term) ||
        instructorNames.includes(term)
    );
}

function dataToHTML(course) {
    // should return a formatted HTML card with the relevant course info
    // (using template literals). 
    const isOpen = course.Classification.Open;
    const statusClass = isOpen ? "open" : "closed";
    const statusIcon = isOpen 
        ? "fa-solid fa-circle-check"
        : "fa-solid fa-circle-xmark";
    const statusText = isOpen ? "Open" : "Closed";

    const seatsAvailable = course.EnrollmentMax - course.EnrollmentCurrent;
    const waitlistCount = course.WaitlistMax - course.WaitlistAvailable;
    const seatsText = isOpen 
        ? `Seats Available: ${seatsAvailable}`
        : `Number on Waitlist ${waitlistCount}`;

    const instructors = course.Instructors
        .map((instructor) => instructor.Name)
        .join(", ");

    return  `
        <section class="course-card">
            <h2>${course.Code}: ${course.Title}</h2>
            <p class="status ${statusClass}">
                <i class="${statusIcon}"></i>
                ${statusText} &bull; ${course.CRN} &bull; ${seatsText}
            </p>
            <p>
            ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
            </p>
            <p>
                <strong>${instructors}</strong>
            </p>
        </section>
    `;
}

function showMatchingCourses() {
    // 1. Get the .courses container element
    // 2. Clear it
    // 3. Start with courseList (from course-data.js)
    // 4. Apply the filters and store the matched courses in a variable
    // 5. If no courses match, display "No courses match your search." and return
    // 6. Output each course to the .courses container (forEach + insertAdjacentHTML)
    const coursesContainer = document.querySelector(".courses");
    coursesContainer.innerHTML = "";

    let matchedCourses = courseList.filter((course) => doesTermMatch(course));

    if(openOnly){
        matchedCourses = matchedCourses.filter((course) => !isClassFull(course));
    }

    if(matchedCourses.length === 0){
        coursesContainer.innerHTML = "<p>No courses match your search.</p>";
        return;
    }

    matchedCourses.forEach((course) => {
        coursesContainer.insertAdjacentHTML("beforeend", dataToHTML(course));
    });
}

function filterCourses() {
    // Update global variables (searchTerm and openOnly) by
    // reaching into the DOM and retrieving their values
    // Invoke the showMatchingCourses() function
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;
    showMatchingCourses();
}

// show all courses initially:
showMatchingCourses();

