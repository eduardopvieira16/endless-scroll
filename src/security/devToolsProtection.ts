const BLOCKED_KEY_COMBINATIONS = new Set(['i', 'j', 'c', 'k']);

/**
 * Dificulta o acesso casual às ferramentas de desenvolvimento pelo teclado e
 * pelo menu de contexto. Isto é uma barreira de interface, não um mecanismo de
 * segurança: regras e dados sensíveis continuam obrigatoriamente no backend.
 */
export function enableDevToolsProtection(): () => void {
  const preventContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  const preventDeveloperShortcuts = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    const blocksF12 = event.key === 'F12';
    const blocksDevTools = (event.ctrlKey || event.metaKey) && event.shiftKey && BLOCKED_KEY_COMBINATIONS.has(key);
    const blocksSource = (event.ctrlKey || event.metaKey) && key === 'u';

    if (blocksF12 || blocksDevTools || blocksSource) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  document.addEventListener('contextmenu', preventContextMenu, { capture: true });
  document.addEventListener('keydown', preventDeveloperShortcuts, { capture: true });

  return () => {
    document.removeEventListener('contextmenu', preventContextMenu, { capture: true });
    document.removeEventListener('keydown', preventDeveloperShortcuts, { capture: true });
  };
}
