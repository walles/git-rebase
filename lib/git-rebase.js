'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate() {
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
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  insertCommand(event) {
    const command = /.*:([a-z]+)/.exec(event.type)[1];

    const editor = atom.workspace.getActiveTextEditor();

    // Extract the whole current line
    const row = editor.getCursorBufferPosition().row;
    const line = editor.lineTextForBufferRow(row);

    // Extract the hash and the comment from the line
    const rebaseLine = /^[a-z]* *([0-9a-f]{7,} .*$)/;
    const match = rebaseLine.exec(line);
    if (!match) {
      editor.insertText(event.originalEvent.key);
      return;
    }
    const hashAndComment = match[1];

    // Replace the rebase command
    const newLine = `${command} ${hashAndComment}`;
    if (newLine === line) {
      return;
    }
    const lineRange = [[row, 0], [row, line.length]];
    editor.setTextInBufferRange(lineRange, newLine);

    // Position the cursor at the beginning of the line to enable a workflow of
    // press-a-command, down, press-a-command, down, ...
    editor.setCursorBufferPosition([row, 0]);
  },
};
