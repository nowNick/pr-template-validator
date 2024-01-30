import { context } from "@actions/github";

export interface PullRequest {
    title: string
}

export const getPullRequestFromContext = (): PullRequest => {
    if(context.payload.pull_request === undefined) {
        throw new Error("The action does not run in pull request context!")
    }

    const title = context.payload.pull_request.title

    if (title === undefined) {
        throw new Error("Pull request does not have a title!")
    }

    return {
        title
    }
}