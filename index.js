const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');
const github = require('@actions/github');

const os = require("os")
const fs = require("fs")

function setOutputFile(key, value) {
  // Temporary hack until core actions library catches up with github new recommendations
  const output = process.env['GITHUB_OUTPUT']
  fs.appendFileSync(output, `${key}=${value}${os.EOL}`)
}


// most @actions toolkit packages have async methods
async function run() {
  try {

    const eventName = github.context.eventName;

    //console.log(eventName);
    console.log(`Preparing Release Notes for action: ${eventName}`);
    // console.log(`context:`);
    // console.log(github.context);
    // console.log(`--------------------------------`);
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
    core.setOutput('test', "ABC");
    setOutputFile('test2', "ABCD");

    let fromRef = "";
    let toRef = "";

    switch(eventName){
      case 'push':{
        let commits = github.context.payload.commits;
        const notesString = notes.releaseNotesStringFromCommits(commits);
        console.log('************** notes:');
        console.log(`>${notesString}<`);
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

        fromRef = github.context.payload.pull_request.base.sha;
        toRef = github.context.payload.after;
        const notesString = notes.releaseNotesString(fromRef, toRef);
        console.log('************** notes:');
        console.log(`>${notesString}<`);
        core.setOutput('notes', notesString);
        break;
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
