import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Routes from '../../../constants/navigation/Routes';
import { useRewardsAuth } from '../../../core/Engine/controllers/rewards-controller/hooks/useRewardsAuth';
import Logger from '../../../util/Logger';
import OnboardingNavigator from './OnboardingNavigator';
import { selectOnboardingState } from '../../../selectors/rewardscontroller';
import RewardsDashboard from './RewardsDashboard';

const Stack = createStackNavigator();

interface RewardsNavigatorProps {
  children?: React.ReactNode;
}

const RewardsNavigator: React.FC<RewardsNavigatorProps> = () => {
  const { isOptIn, isLoading, currentAccount, subscription } = useRewardsAuth();

  // Get onboarding state from RewardsController using selector
  const onboardingState = useSelector(selectOnboardingState);
  const { isOnboardingActive, currentStep } = onboardingState || {
    isOnboardingActive: true,
    currentStep: 'step_1',
  };

  // Show loading state or a loading component while checking auth
  if (isLoading) {
    return null;
  }

  Logger.log('RewardsAuthState:', {
    isOptIn,
    currentAccount,
    subscription,
    isOnboardingActive,
    currentStep,
  });

  // Determine initial route based on auth state and onboarding state
  const getInitialRoute = () => {
    if (isOptIn) {
      return Routes.REWARDS_DASHBOARD;
    }
    return Routes.REWARDS_ONBOARDING_FLOW;
  };

  return (
    <Stack.Navigator initialRouteName={getInitialRoute()}>
      {isOptIn ? (
        <Stack.Screen
          name={Routes.REWARDS_DASHBOARD}
          component={RewardsDashboard}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name={Routes.REWARDS_ONBOARDING_FLOW}
          component={OnboardingNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RewardsNavigator;
