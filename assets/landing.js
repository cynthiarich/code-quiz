var highScores = document.getElementById("high-scores");
var oldScores = JSON.parse(window.localStorage.getItem("gitjedi"));

function displayscores () {
    if (typeof(Storage) !== undefined) {

    }
    else {
        highScores.textContent = "Sorry, I can't save high scores for you in this browser!"
    }
    console.log("Old Scores: ", oldScores);
    
    if (oldScores === null) {
        highScores.textContent = "You don't have any high scores yet! Select a quiz to get started."
    }
    else {
        var olist = document.createElement("ol");
        highScores.appendChild(olist);
        for (var i = 0; i < oldScores.length; i++){
            console.log("showing score: " + oldScores[i].initials + ": " + oldScores[i].score)
            if (i < 10) {
                var newScore = document.createElement("li");
                newScore.textContent = oldScores[i].initials + ": " + oldScores[i].score;
                olist.appendChild(newScore);
            }
            else {
                break;
            }
            
        }
    }
}

displayscores();
