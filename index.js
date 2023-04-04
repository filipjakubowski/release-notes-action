const core = require('@actions/core');
const notes =  require('@bamboostick/git_release_notes');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function getPRCommits() {
  let github_token = core.getInput('github-token');
  if(github_token == null || github_token == ""){
    throw new Error("GITHUB_TOKEN is not set");
  }
  console.log("github token: " + github_token);

  const octokit = github.getOctokit(github_token);
  const { owner, repo } = github.context.repo;
  const pull_number = github.context.payload.number;

  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });
  console.log("pullRequest");
  console.log(pullRequest);

  console.log("pulls");
  console.log(pullRequest);
  console.log("commits");
  console.log(pullRequest.commits);

  console.log("octokit.pulls");
  console.log(octokit.pulls);


  return octokit.pulls.listCommits({
    owner,
    repo,
    pull_number,
  });
}

async function run() {
  try {
    const eventName = github.context.eventName;
    console.log(`Preparing Release Notes for action: ${eventName}`);
    // console.log("Github Context");
    // console.log(`github:`);
    // console.log(github);
    // console.log(`github.ref_name: ${ github.ref_name }`);
    // console.log(`context:`);
    // console.log(github.context);
    // console.log(`--------------------------------`);

    // console.log(github.context.payload.after);
    // console.log(github.context.payload.pull_request.base.sha);

    // let fromRef = "";
    // let toRef = "";

    switch(eventName){
      case 'push':{
        let commits = github.context.payload.commits;
        // console.log('commit');
        // console.log(commits[0]);
        const notesString = await notes.releaseNotesStringFromCommits(commits);
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
        //
        // let base_sha =  github.context.payload.pull_request.base.sha;
        // let before_sha = github.context.payload.before;
        // let after_sha = github.context.payload.before;
        //
        // fromRef = before_sha ? before_sha : base_sha;
        //
        // toRef = github.context.payload.pull_request.head.sha;
        // const notesString2 = await notes.releaseNotesString(after_sha, 'HEAD');
        // const notesString = await notes.releaseNotesString(fromRef, toRef);

        let commits = await getPRCommits();
        // console.log('commit');
        // console.log(commits[0]);
        console.log("notes with commits");
        console.log(commits);

        const notesString = await notes.releaseNotesStringFromCommits(commits);

        // console.log(`Release Notes Output: >${notesString}<`);
        core.setOutput('notes', notesString);
        break;
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
