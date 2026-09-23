import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  /** Content pinned just above the "Powered by" footer (e.g. a primary CTA). */
  bottom?: ReactNode;
};

export default function Screen({ children, bottom }: Props) {
  return (
    <section className="screen">
      <div className="screen__body">{children}</div>
      {bottom && <div className="screen__bottom">{bottom}</div>}
      <p className="powered-by">Powered by Polysocial</p>
    </section>
  );
}
