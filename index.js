const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    console.log("Running ")

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    const fromRef = github.context.base_ref;
    const toRef = github.context.ref;
    const notesString = notes.releaseNotesString(fromRef, toRef);
    console.log("Notes: @bamboostick/git_release_notes");
    console.log(notesString);
    core.setOutput('notes', notesString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
