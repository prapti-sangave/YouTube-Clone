    const BASE_URL = "https://www.googleapis.com/youtube/v3";

    const container = document.getElementById("videos-container");

 // get videos from yt --for that first construct url
 // then we send the request
 // then we convert it into json format
async function getVideos(q) {
    const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=videos&maxResults=20`;
    const response = await fetch(url, {
        method: "get",
    });
    const data = await response.json();

    const videos = data.items;
    // console.log("get videos>>", videos);
    getVideoData(videos);
}

// creating a array for pushing multiple videos
async function getVideoData(videos) {
    let videoData = [];
    for(let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const videoId = video.id.videoId;
        videoData.push(await getVideoDetails(videoId));
    }
    console.log(videoData);
    renderVideos(videoData);
}

// get details for each video
async function getVideoDetails(videoId) {
    const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;
    const response = await fetch(url, {
        method: "get",
    });
    
    const data = await response.json();  //convert into json
    return data.items[0];   // extract data
}

// now here actually show data on screen
function renderVideos(videos) {
    container.innerHTML = ``;
    for(let i = 0; i < videos.length; i++) {
        const video = videos[i];  // to have access of single video
        const thumbnailUrl = video.snippet.thumbnails.high.url;
        container.innerHTML += 
        `<div class="video-info" onclick="openVideoDetails('${video.id}')" >
        <div class="video-image">
          <img src="${thumbnailUrl}" alt="video title" />
        </div>
        <div class="video-description">
          <div class="channel-avatar">
            <img src="/Images/User-Avatar.png" alt="channel avatar" />
          </div>
          <div class="video-title">${video.snippet.localized.title}</div>
          <div class="channel-description">
            <p class="channel-name">${video.snippet.channelTitle}</p>
            <div class="views">
              <p class="video-views">15K Views</p>
              <p class="video-time">1 week ago</p>
            </div>
          </div>
        </div>
      </div>`; 
    }
}

function openVideoDetails(videoId) {
    localStorage.setItem("videoId", videoId);
    window.open("/videoDetails.html");
  }

  getVideos("");
