import styles from 'styles/index.module.scss';
import React from 'react';
import { AnimatePresence, AnimateSharedLayout, motion, MotionProps, useInView } from 'framer-motion';
import {
  FramerCMDK,
  LinearCMDK,
  LinearIcon,
  VercelCMDK,
  VercelIcon,
  RaycastCMDK,
  RaycastIcon,
  CopyIcon,
  FramerIcon,
  GitHubIcon,
  Code,
  CopiedIcon,
} from 'components';
import packageJSON from '../../cmdk/package.json';

type TTheme = {
  theme: Themes;
  setTheme: Function;
};

type Themes = 'linear' | 'raycast' | 'vercel' | 'framer';

export default function Index() {
  const [theme, setTheme] = React.useState<Themes>('raycast');

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
            </div>
          </div>

          <AnimatePresence exitBeforeEnter initial={false}>
            {theme === 'framer' && (
              <CMDKWrapper key="framer">
                <FramerCMDK />
              </CMDKWrapper>
            )}
            {theme === 'vercel' && (
              <CMDKWrapper key="vercel">
                <VercelCMDK />
              </CMDKWrapper>
            )}
            {theme === 'linear' && (
              <CMDKWrapper key="linear">
                <LinearCMDK />
              </CMDKWrapper>
            )}
            {theme === 'raycast' && (
              <CMDKWrapper key="raycast">
                <RaycastCMDK />
              </CMDKWrapper>
            )}
          </AnimatePresence>

          <div aria-hidden className={styles.line} />

          {/* <Codeblock /> */}
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
          <img src="/rauno.jpeg" alt="Avatar of Sonny" />
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
