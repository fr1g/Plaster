export default class TargetInfo {

    givenDomain: string | null; // if given, try to get the same-named in localStorage.
    givenId: string | null;
    paths: string | null; // the last part of path includes parameters.
    keyCode: string | null;
    resolvedEndpoint: string | null; // absolutely given. if not presented, will look for the givenDomain, or use the most-recent.

    // if RE and GD both given, verify if they mached.
    isAllEmpty() {
        return !(this.givenDomain || this.givenId || this.paths || this.keyCode || this.resolvedEndpoint);
    }

    isMatched() {
        if (!(this.givenDomain && this.resolvedEndpoint)) return false; // maybe this counts as an early return...
        else return this.givenDomain.trim() == this.resolvedEndpoint.trim()
    }



    constructor(
        givenDomain: string | null = null,
        resolvedEndpoint: string | null = null,
        givenId: string | null = null,
        paths: string | null = null,
        keyCode: string | null = null
    ) {
        this.givenDomain = givenDomain;
        this.givenId = givenId;
        this.paths = paths;
        this.keyCode = keyCode;
        this.resolvedEndpoint = resolvedEndpoint;
    }
}