import Screen from '../components/Screen';
import { GoogleGlyph, MailIcon } from '../components/icons';

type Props = {
  onGoogle: () => void;
  onEmail: () => void;
};

export default function Welcome({ onGoogle, onEmail }: Props) {
  return (
    <Screen>
      <div className="welcome">
        <div className="welcome__intro">
          <h1 className="welcome__title">Welcome!</h1>
          <p className="welcome__subtitle">Join the Celeste Daily Creator community!</p>
        </div>
        <div className="stack stack--8">
          <button type="button" className="btn btn--dark" onClick={onGoogle}>
            <GoogleGlyph />
            Sign in with Google
          </button>
          <button type="button" className="btn btn--outline" onClick={onEmail}>
            <MailIcon />
            Sign in with email
          </button>
        </div>
      </div>
    </Screen>
  );
}
