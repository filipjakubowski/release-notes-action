const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const eventName = github.context.eventName;
    console.log(`Preparing Release Notes for action: ${eventName}`);

    switch(eventName){
      case 'push':{
        let commits = github.context.payload.commits;
        console.log('commit');
        console.log(commits[0]);
        const notesString = notes.releaseNotesStringFromCommits(commits);
        core.setOutput('notes', notesString);
        break;
      }
      case 'pull_request':{
        // console.log("\----------BASE-------------")
        // console.log(github.context.payload.pull_request.base);
        // console.log("\----------HEAD-------------")
        // console.log(github.context.payload.pull_request.head);
        // console.log(github.context.payload.before);
        // console.log("-----------------");
        let fromRef = github.context.payload.pull_request.base.sha;
        let toRef = github.context.payload.after;
        const notesString = notes.releaseNotesString(fromRef, toRef);
        core.setOutput('notes', notesString);
        break;
      }
    }


  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
