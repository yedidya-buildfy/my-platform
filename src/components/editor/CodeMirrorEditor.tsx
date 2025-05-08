'use client';

import { useCallback, useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, foldGutter, indentOnInput, indentUnit } from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';
import { lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { getTheme } from './cm-theme';
import { useThemeStore } from '@/lib/stores/theme';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  language?: 'javascript' | 'python' | string;
}

function getLanguageExtension(language?: string) {
  switch (language) {
    case 'javascript':
      return javascript();
    case 'python':
      return python();
    default:
      return [];
  }
}

export function CodeMirrorEditor({ value, onChange, readOnly = false, className = '', language }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const theme = useThemeStore((state) => state.theme);
  const themeCompartment = useRef(new Compartment()).current;
  const languageCompartment = useRef(new Compartment()).current;

  const initEditor = useCallback(() => {
    if (!editorRef.current) return;

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      bracketMatching(),
      foldGutter(),
      indentOnInput(),
      indentUnit.of('  '),
      EditorState.readOnly.of(readOnly),
      EditorView.lineWrapping,
      themeCompartment.of(getTheme(theme === 'dark')),
      languageCompartment.of(getLanguageExtension(language)),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onChange) {
          onChange(update.state.doc.toString());
        }
      }),
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...searchKeymap,
      ]),
    ];

    const startState = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [value, onChange, readOnly, theme, themeCompartment, language, languageCompartment]);

  useEffect(() => {
    const cleanup = initEditor();
    return () => {
      cleanup?.();
    };
  }, [initEditor]);

  // Dynamically update theme when it changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: themeCompartment.reconfigure(getTheme(theme === 'dark')),
      });
    }
  }, [theme, themeCompartment]);

  // Dynamically update language when it changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: languageCompartment.reconfigure(getLanguageExtension(language)),
      });
    }
  }, [language, languageCompartment]);

  return (
    <div
      ref={editorRef}
      className={`h-full w-full overflow-auto ${className}`}
    />
  );
} 