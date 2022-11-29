const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const notesString = notes.getReleaseNotesString("ab33640")
    console.log("Notes: ");
    console.log(notes);
    core.setOutput('notes', notesString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
