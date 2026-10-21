/*
 * Tema claro / escuro. Carregado no <head> para aplicar o tema salvo antes de a página aparecer.
 * Sem escolha salva, segue o tema do sistema.
 */
(function () {
  var KEY = 'educadados-tema', root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* armazenamento indisponível */ }
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  var current = function () { return root.getAttribute('data-theme') || (mq && mq.matches ? 'dark' : 'light'); };
  var sync = function () {
    var btn = document.getElementById('nav-tema');
    if (!btn) return;
    var dark = current() === 'dark';
    btn.setAttribute('aria-label', dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
    btn.title = dark ? 'Tema claro' : 'Tema escuro';
    btn.dataset.tema = current();
  };

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('nav-tema');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* armazenamento indisponível */ }
      sync();
    });
    if (mq && mq.addEventListener) mq.addEventListener('change', sync);
    sync();
  });
})();
