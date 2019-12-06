var timer = document.getElementById("timer");
var quizQuestion = document.getElementById("quiz-question");
var quizResponses = document.getElementById("quiz-responses");
var quizScore = document.getElementById("quiz-score");
var oldScores = JSON.parse(window.localStorage.getItem("gitjedi"));
var jedi = document.getElementById("jedi");
var quizTime = 70;
var totalScore = 0;
var questionNum = 0;
var corrResp;
var questions;

var padwan = [
    { q: "Which option allows you to add a message when creating the commit?", r: ["git commit -m", "git commit -a", "git commit -e", "git add -c"], a: "0" },
    { q: "What is the command used to download a local copy of your repository from the remote?", r: ["git fetch", "git copy", "git clone", "git pull"], a: "2" },
    { q: "Which command would you use to create a new branch called my-feature in your local copy of the repository?", r: ["git branch -n my-feature", "git checkout -b my-feature", "git checkout my-feature", "git branch --all"], a: "1" },
    { q: "Which command would you use to update your local copy of a repository with changes from the remote?", r: ["git fetch", "git clone", "git update", "git pull"], a: "3" },
    { q: "Which command allows you to see information about a specific commit?", r: ["git history", "git log", "git show", "git commit"], a: "2" },
    { q: "Which of the following allows you to see the current state of your git repository?", r: ["git state", "git show --all", "git status", "git update"], a: "2" },
    { q: "Which of the following represents the most common order of operations with git?", r: ["git add, git commit, git push", "git pull, git clone, git push", "git commit, git add, git revert", "git reset, git commit, git add"], a: "0" },
    { q: "If I want to continue working on a branch created on the remote (e.g. GitHub.com) called new-feature, which command would I use?", r: ["git branch new-feature", "git checkoug -b new-feature", "git remote new-feature", "git checkout new-feature"], a: "3" },
    { q: "If I want to see the url for the remote repository, which command would I use?", r: ["git clone", "git remote -v", "git show --remote", "git clone --show"], a: "1" }
  ];

  var knight = [
    { q: "A branch in git can be described as?", r: ["A pointer to the most recent commit in a line of work", "A copy of master", "A deviation from master", "A diff between two commits"], a: "0" },
    { q: "Which of the following commands can help you create atomic commits when you've forgotten to do so as you work?", r: ["git commit --amend", "git rebase", "git add -p", "git revert"], a: "2" },
    { q: "Which command allows you to fix up the commit message in your previous commit?", r: ["git commit --fix", "git commit --amend", "git reset --hard", "git cherry-pick"], a: "1" },
    { q: "Which git command allows you to move a commit from one branch to another?", r: ["git cherry-pick", "git reset", "git revert", "git commit --amend"], a: "0" },
    { q: "Which of the following best describes the operation of git revert?", r: ["Removes the last commit from your history", "Creates a new commit that is the inverse of the target commit", "Reverts the changes to the code base up to and including the target commit", "Replaces the commit message on the target commit"], a: "1" },
    { q: "In Git, HEAD refers to:", r: ["The point in time indicated by the file tree that is currently checked out", "The master copy of the repository", "A detached state that indicates you are not on the most recent commit", "The branch you are currently working on"], a: "0" },
    { q: "Which command could you use to create a second remote for your repository?", r: ["git remote --new", "git remote add", "git clone", "git push --new"], a: "1" },
    { q: "Git pull is a combination of which two git commands?", r: ["git clone, git unpack", "git clone, git checkout", "git fetch, git merge", "git update, git merge"], a: "2" }
  ];

  var master = [
    { q: "Which of the following commands will allow you to pull a git repository as a dependency of your current repository?", r: ["git rerere", "git rebase", "git join", "git subtree"], a: "3" },
    { q: "Which of the following best describes a git commit?", r: ["A diff of a repository showing the work you've completed", "A snapshot of the content of the repository at a point in time", "A changeset", "All of the above"], a: "1" },
    { q: "Git's internal file structure is best described as a:", r: ["Directed Acyclic Graph", "Linked List", "Directed Acyclic Graph stored as a linked list", "None of the above"], a: "2" },
    { q: "Git bisect can be used to:", r: ["Cut down the size of your repository to make it quicker to clone", "Divide an existing commit into smaller parts", "Remove unwanted contents from your repository", "Locate regressions in your code base"], a: "3" },
    { q: "Which of the following can help you resolve complex merge conflicts in long running branches?", r: ["git merge --trial", "git merge-with-lease", "git rerere", "git merge --ours"], a: "2" },
    { q: "Which mode of reset will cause your changes to appear in your staging directory?", r: ["git reset --hard", "git reset --mixed", "git reset --soft", "git reset --undo"], a: "2" },
    { q: "Which command can be used to locate local commits that have otherwise been removed from history?", r: ["git rerere", "git reflog", "git log", "git history"], a: "1" }
  ];


function initialSetup () {
    var queryString = new URLSearchParams(window.location.search).toString();
    var level = queryString.charAt(queryString.length-1);
    console.log("level", level);
    if (level == 1){
        questions = padwan;
        jedi.textContent = "Padwan"

    }
    else if (level == 2){
        questions = knight;
        jedi.textContent = "Knight"

    }
    else if (level == 3){
        questions = master;
        jedi.textContent = "Master"

    }
    showScore();
    var getReady = 3;
    console.log("old scores: ", oldScores);
    var prepInterval = setInterval(function() {
        timer.textContent = "Get ready to begin in: " + getReady + " seconds";
        getReady--;

        if (getReady < 0) {
            clearInterval(prepInterval);
            quizTimer();
            showQuestion();
        }
     }, 1000);
}

function quizTimer () {
    var quizInterval = setInterval(function () {
        timer.textContent = quizTime + " seconds remaining";
        quizTime--;

        if (quizTime === 0){
            clearInterval(quizInterval);
            clearQuestion();
            saveScore();
        }
    }, 1000)
}

function showQuestion () {
    if (questionNum < questions.length){
        quizQuestion.textContent = questions[questionNum].q;
        for (var i = 0; i < questions[questionNum].r.length; i++) {
            var resp = document.createElement("div");
            resp.setAttribute("id", "respBtn");
            resp.setAttribute("respID", i);
            resp.textContent = questions[questionNum].r[i];
            quizResponses.appendChild(resp);
            corrResp = questions[questionNum].a;
        }
        questionNum++;
    }
    else {
        quizQuestion.textContent = "Well that's embarrassing, I've run out of questions before you ran out of time. Try one of the harder levels next time!";
        quizTime = 1;
    }
    
}

quizResponses.addEventListener("click", function (e) {
    console.log("click event: ", e.target.getAttribute("respID"))
    if (e.target.getAttribute("respID") == corrResp){
        totalScore = totalScore + quizTime;
    }
    else {
        quizTime -= 10;
    }
    clearQuestion();
    showScore();
    showQuestion();
})

function clearQuestion () {
    quizQuestion.textContent = "";
    while (quizResponses.firstChild){
        quizResponses.removeChild(quizResponses.firstChild);
    }
    
}

function showScore () {
    quizScore.textContent = totalScore;
}

function saveScore () {
    var userInitials = prompt("Wow, your score was " + totalScore + ". Enter your initials to save your score.");
    if (userInitials !== null) {
        if (oldScores === null){
            oldScores = [
                {
                    initials: userInitials, 
                    score: totalScore
                }
            ];
        }
        else {
            oldScores.push({
                    initials: userInitials, 
                    score: totalScore
                });
            console.log("Scores", oldScores);
            oldScores.sort(function(a,b){
                return(b.score - a.score);
            })
        }
        localStorage.setItem('gitjedi', JSON.stringify(oldScores));
        window.location.href = "index.html";
    }
}

initialSetup();
