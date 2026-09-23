import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  /** Content pinned just above the "Powered by" footer (e.g. a primary CTA). */
  bottom?: ReactNode;
  /** Long content: body starts at the top and scrolls under a sticky footer. */
  scroll?: boolean;
};

export default function Screen({ children, bottom, scroll = false }: Props) {
  return (
    <section className={`screen${scroll ? ' screen--scroll' : ''}`}>
      <div className="screen__body">{children}</div>
      <footer className="screen__footer">
        {bottom && <div className="screen__bottom">{bottom}</div>}
        <p className="powered-by">Powered by Polysocial</p>
      </footer>
    </section>
  );
}
