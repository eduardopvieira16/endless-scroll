import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { HeroIllustration } from './components/HeroIllustration';
import { PersonCard } from './components/PersonCard';
import { useInfinitePeople } from './hooks/useInfinitePeople';
import styles from './App.module.scss';

export default function App() {
  const { people, isLoading, error, usingFallback, loadMore, retry } = useInfinitePeople();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('pt-BR'));
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visiblePeople = useMemo(
    () =>
      deferredQuery
        ? people.filter((person) =>
            `${person.name} ${person.email} ${person.city} ${person.country}`
              .toLocaleLowerCase('pt-BR')
              .includes(deferredQuery),
          )
        : people,
    [deferredQuery, people],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && !error) loadMore();
      },
      { root: null, rootMargin: '700px 0px 700px', threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [error, isLoading, loadMore]);

  return (
    <main>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.blueShape} aria-hidden="true" />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Conexões que continuam</span>
            <h1 id="hero-title">Encontre pessoas. Continue rolando.</h1>
            <p>
              Um diretório contínuo, leve e responsivo, com carregamento automático, busca instantânea e experiência fluida em qualquer tela.
            </p>
            <a className={styles.cta} href="#pessoas">
              Explorar pessoas <span>↓</span>
            </a>
          </div>
          <div className={styles.art}>
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className={styles.peopleSection} id="pessoas">
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.kicker}>Diretório vivo</span>
            <h2>Novas conexões a cada rolagem</h2>
            <p>
              {people.length} perfis carregados
              {usingFallback ? ' — modo resiliente local ativo' : ''}.
            </p>
          </div>
          <label className={styles.search}>
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, cidade ou e-mail"
              aria-label="Buscar pessoas"
            />
          </label>
        </div>

        <div className={styles.grid} aria-live="polite">
          {visiblePeople.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>

        {deferredQuery && visiblePeople.length === 0 && (
          <div className={styles.empty}>
            <strong>Nenhum perfil encontrado.</strong>
            <span>Limpe a busca ou aguarde mais pessoas serem carregadas.</span>
          </div>
        )}

        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
        <div className={styles.loadState}>
          {isLoading && (
            <>
              <span className={styles.spinner} />
              <span>Carregando novas conexões…</span>
            </>
          )}
          {error && (
            <>
              <span>Não foi possível continuar automaticamente.</span>
              <button onClick={retry}>Tentar novamente</button>
            </>
          )}
          {!isLoading && !error && (
            <button className={styles.manual} onClick={loadMore}>
              Carregar mais pessoas
            </button>
          )}
        </div>
      </section>

      <section className={styles.about}>
        <div>
          <span>Performance aplicada</span>
          <h2>Sem lista travada e sem página artificial.</h2>
        </div>
        <p>
          O observador antecipa o carregamento antes do fim da página, requisições são canceláveis, resultados são deduplicados e os cartões usam renderização diferida do navegador.
        </p>
      </section>
    </main>
  );
}
