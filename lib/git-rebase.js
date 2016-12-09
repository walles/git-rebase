'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate() {
    console.log('Johan: activating...');

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'git-rebase:pick': this.insertCommand }));
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'git-rebase:reword': this.insertCommand }));
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'git-rebase:edit': this.insertCommand }));
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'git-rebase:fixup': this.insertCommand }));
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'git-rebase:squash': this.insertCommand }));
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'git-rebase:drop': this.insertCommand }));

    console.log('Johan: activated!');
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  insertCommand(command) {
    console.log(`Got command: ${command}`);
  },
};
