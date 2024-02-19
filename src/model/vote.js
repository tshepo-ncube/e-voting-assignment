export default class Vote {
  constructor(votes) {
    this.votes = votes;
  }

  toVoteObject() {
    return {
      Votes: this.votes,
    };
  }
}
