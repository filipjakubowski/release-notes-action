const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');
const github = require('@actions/github');
import * as exec from "@actions/exec";


// most @actions toolkit packages have async methods
async function run() {
  try {
     console.log("Getting release notes: ");
  //   console.log(github.context);
  //   console.log("\----------BASE-------------")
  //   console.log(github.context.payload.pull_request.base);
  //   console.log("\----------HEAD-------------")
  //   console.log(github.context.payload.pull_request.head);
  //   console.log(github.context.payload.before);
  //   console.log("-----------------");
  //
  //
  //   console.log(github.context.payload.after);
  //   console.log(github.context.payload.pull_request.base.sha)
  //
  //   const args = ["log", "--format=oneline", `${github.context.payload.pull_request.base.ref}..${github.context.payload.pull_request.head.ref}`];
  //
  //   try{
  //     await exec.exec("git", args);
  //   }
  //   catch (error){
  //     console.log("Error while git log. ");
  //     console.log(error);
  //   }


    const fromRef = github.context.payload.pull_request.base.sha;
    const toRef = github.context.payload.after;
    const notesString = notes.releaseNotesString(fromRef, toRef);
    console.log("Notes: ");
    console.log(notesString);
    core.setOutput('notes', notesString);
    core.setOutput('release', notesString.trim());
    core.setOutput('hello', 'World');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
