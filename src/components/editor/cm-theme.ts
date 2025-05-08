import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';

const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: '#ffffff',
    color: '#24292e',
  },
  '.cm-content': {
    caretColor: '#24292e',
  },
  '.cm-cursor': {
    borderLeftColor: '#24292e',
  },
  '.cm-activeLine': {
    backgroundColor: '#f6f8fa',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#f6f8fa',
  },
  '.cm-gutters': {
    backgroundColor: '#f6f8fa',
    color: '#6e7781',
    border: 'none',
  },
  '.cm-lineNumbers': {
    color: '#6e7781',
  },
  '.cm-selectionBackground': {
    backgroundColor: '#c8e1ff',
  },
  '.cm-matchingBracket': {
    color: '#24292e',
    backgroundColor: '#c8e1ff',
  },
});

const darkTheme = EditorView.theme({
  '&': {
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
  },
  '.cm-content': {
    caretColor: '#c9d1d9',
  },
  '.cm-cursor': {
    borderLeftColor: '#c9d1d9',
  },
  '.cm-activeLine': {
    backgroundColor: '#161b22',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#161b22',
  },
  '.cm-gutters': {
    backgroundColor: '#0d1117',
    color: '#8b949e',
    border: 'none',
  },
  '.cm-lineNumbers': {
    color: '#8b949e',
  },
  '.cm-selectionBackground': {
    backgroundColor: '#264f78',
  },
  '.cm-matchingBracket': {
    color: '#c9d1d9',
    backgroundColor: '#264f78',
  },
});

export function getTheme(isDark: boolean): Extension {
  return isDark ? darkTheme : lightTheme;
} 