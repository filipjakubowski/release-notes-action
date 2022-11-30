const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    console.log("Getting release notes: ");
    console.log(github.context);
    const fromRef = github.context.payload.before;
    //const toRef = github.context.payload.after;
    const toRef = github.context.sha;
    const notesString = notes.releaseNotesString(fromRef, toRef);
    console.log("Notes: ");
    console.log(notesString);
    core.setOutput('notes', notesString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
