$(document).ready(function () {
    if ($("body").hasClass("clemente-bojorquez")) { $("#play-paused-button").click(function (e) { const isPlaying = $(".album-art").hasClass("active"); $(".album-art").toggleClass("active"); $(".player-track").toggleClass("active"); if (isPlaying) { pauseSong() } else { playSong() } }) }
    $("#backward-button").click(function (e) { prevSong() })
    $("#forward-button").click(function (e) { prevSong() })
    audio.addEventListener("timeupdate", updateProgress); $(".progress-container").click(function (e) { setProgress(e) })
}); function setProgress(e) { const width = $(".progress-container").width(); const clickX = e.offsetX; const duration = audio.duration; audio.currentTime = (clickX / width) * duration }
function convertToTime(duration) {
    if (!isNaN(duration)) {
        let minutes = parseInt(duration / 60, 10); let seconds = parseInt(duration % 60); if (minutes < 10) { minutes = "0" + minutes }
        if (seconds < 10) { seconds = "0" + seconds }
        return `${minutes}:${seconds}`
    } else { return "00:00" }
}
function updateProgress(e) { const { duration, currentTime } = e.srcElement; const progressPercent = (currentTime / duration) * 100; const progress = document.getElementById("progress"); $(".progress-time").html(convertToTime(progressPercent)); progress.style.width = `${progressPercent}%` }
function pauseSong() { $("#play-paused-button i").removeClass("fa-pause"); $("#play-paused-button i").addClass("fa-play"); audio.pause() }
async function loadSong() { audio.src = `../music/song.mp3` }
function playSong() { $("#play-paused-button i").removeClass("fa-play"); $("#play-paused-button i").addClass("fa-pause"); audio.play(); $(".total-time").html(convertToTime(audio.duration)) }
function prevSong() {
    pauseSong(); audio.currentTime = 0; $(".progress-time").html("00:00"); const isPlaying = $(".album-art").hasClass("active"); if (!isPlaying) { $(".album-art").addClass("active"); $(".player-track").addClass("active") }
    playSong()
}