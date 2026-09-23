import Screen from '../components/Screen';
import { CAMPAIGN_URL } from '../config';

export default function Complete() {
  return (
    <Screen
      bottom={
        <a className="btn btn--primary" href={CAMPAIGN_URL}>
          Go to Campaign
        </a>
      }
    />
  );
}
