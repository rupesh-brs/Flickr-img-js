// API key for Flickr
const apiKey = "d12447f70e875413282a48b9cbe48257";
const apiUrl = "https://api.flickr.com/services/rest?";

const searchInput = document.querySelector("#search-id input");
const imageContainer = document.querySelector(".container .row");

function searchImages() {
    const query = searchInput.value.trim();
    imageContainer.innerHTML = '';
    const url = `${apiUrl}api_key=${apiKey}&method=flickr.photos.search&tags=${query}&format=json&nojsoncallback=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.photos && data.photos.photo) {
                displayImages(data.photos.photo);
            } else {
                alert("No images found.");
            }
        })
        .catch(error => {
            console.error("Error fetching images:", error);
            alert("An error occurred while fetching images.");
        });
}

function displayImages(photos) {
    photos.forEach(photo => {
        const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
        const colDiv = document.createElement("div");
        colDiv.className = "col-mb-3";

        const imgElement = document.createElement("img");
        imgElement.src = imgUrl;
        imgElement.alt = photo.title || "Flickr Image";
        imgElement.className = "img-fluid";

        colDiv.appendChild(imgElement);
        imageContainer.appendChild(colDiv);
    });
}

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchImages();
    }
});
