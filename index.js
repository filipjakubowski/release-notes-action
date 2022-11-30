const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    console.log("Running ")
    console.log("Context: ");
    console.log(github.context);

    const fromRef = github.event.merge_commit_sha;
    const toRef = github.context.sha;
    const notesString = notes.releaseNotesString(fromRef, toRef);
    console.log("Notes: @bamboostick/git_release_notes");
    console.log(notesString);
    core.setOutput('notes', notesString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
