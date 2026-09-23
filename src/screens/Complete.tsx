import Screen from '../components/Screen';
import HowItWorksChat from '../components/HowItWorksChat';
import { CAMPAIGN_URL } from '../config';

export default function Complete() {
  return (
    <Screen
      scroll
      bottom={
        <a className="btn btn--primary" href={CAMPAIGN_URL}>
          Go to Campaign
        </a>
      }
    >
      <HowItWorksChat />
    </Screen>
  );
}
