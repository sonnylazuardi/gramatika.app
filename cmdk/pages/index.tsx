import styles from 'styles/index.module.scss';
import React from 'react';
import { AnimatePresence, AnimateSharedLayout, motion, MotionProps } from 'framer-motion';
import { RaycastCMDK, GitHubIcon } from 'components';
import packageJSON from '../../cmdk/package.json';
import * as Popover from '@radix-ui/react-popover';

export default function Index() {
  const [lang, setLang] = React.useState('English');
  const langProps = { lang, setLang };
  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.meta}>
            <div className={styles.info}>
              <VersionBadge />
              <h1>⌘K → Typo Spell Check</h1>
              <p>Like Grammarly but with ⌘K</p>
            </div>

            <div className={styles.buttons}>
              <GitHubButton />
              <LanguageButton {...langProps} />
            </div>
          </div>

          <AnimatePresence exitBeforeEnter initial={false}>
            <CMDKWrapper key="raycast">
              <RaycastCMDK lang={lang} />
            </CMDKWrapper>
          </AnimatePresence>

          <div aria-hidden className={styles.line} />
        </div>
        <Footer />
      </main>
    </>
  );
}

function CMDKWrapper(props: MotionProps & { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      style={{
        height: 475,
      }}
      {...props}
    />
  );
}

//////////////////////////////////////////////////////////////////

function GitHubButton() {
  return (
    <a
      href="https://github.com/sonnylazuardi/gramatika.app"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.githubButton}
    >
      <GitHubIcon />
      gramatika.app
    </a>
  );
}

function LanguageButton({ lang, setLang }: any) {
  return (
    <Popover.Root>
      <Popover.Trigger className={styles.lang}>{lang}</Popover.Trigger>
      <Popover.Content className={styles.langSelect}>
        <Popover.Arrow style={{ fill: 'white' }} />
        <Popover.Close className={styles.langClose} onClick={() => setLang('English')}>
          English
        </Popover.Close>
        <Popover.Close className={styles.langClose} onClick={() => setLang('Indonesia')}>
          Indonesia
        </Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
}

//////////////////////////////////////////////////////////////////
function VersionBadge() {
  return <span className={styles.versionBadge}>v{packageJSON.version}</span>;
}

function Footer() {
  const ref = React.useRef<HTMLElement | null>(null);
  return (
    <footer ref={ref} className={styles.footer}>
      <div className={styles.footerText}>
        Modified by{' '}
        <a href="https://sonnylab.com" target="_blank" rel="noopener noreferrer">
          <img src="/sonny.jpg" alt="Avatar of Sonny" />
          Sonny
        </a>
        , cmdk library from
        <a href="https://paco.me" target="_blank" rel="noopener noreferrer">
          <img src="/paco.png" alt="Avatar of Paco" />
          Paco
        </a>{' '}
        ,{' '}
        <a href="https://rauno.me" target="_blank" rel="noopener noreferrer">
          <img src="/rauno.jpeg" alt="Avatar of Rauno" />
          Rauno
        </a>
      </div>
    </footer>
  );
}
