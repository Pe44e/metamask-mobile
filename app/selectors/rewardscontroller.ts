import { createSelector } from 'reselect';
import type { RootState } from '../reducers';
import { RewardsControllerState } from '../core/Engine/controllers/rewards-controller/types';
import { selectRewardsEnabledFlag } from './featureFlagController/rewards';

/**
 * Raw state selector for RewardsController
 */
const selectRewardsControllerState = (state: RootState) =>
  state.engine?.backgroundState?.RewardsController;

/**
 * Feature flag aware selector base
 */
const selectRewardsControllerStateWithFeatureFlag = createSelector(
  [selectRewardsControllerState, selectRewardsEnabledFlag],
  (
    rewardsControllerState: RewardsControllerState,
    isRewardsEnabled: boolean,
  ) => {
    // Return null/undefined when feature flag is disabled
    if (!isRewardsEnabled) {
      return null;
    }
    return rewardsControllerState;
  },
);

/**
 * Selector for the subscription from RewardsControllerState
 */
export const selectRewardsSubscription = createSelector(
  [selectRewardsControllerStateWithFeatureFlag],
  (rewardsControllerState: RewardsControllerState | null) =>
    rewardsControllerState?.subscription,
);

/**
 * Selector to get the subscription ID for a given account address
 */
export const selectSubscriptionIdForAccount = createSelector(
  [
    selectRewardsControllerState,
    (_state: RootState, address: string) => address,
  ],
  (
    rewardsControllerState: RewardsControllerState,
    address: string,
  ): string | null => {
    if (!rewardsControllerState?.silentAuth?.accountToSubscription) {
      return null;
    }
    return (
      rewardsControllerState.silentAuth.accountToSubscription[
        address.toLowerCase()
      ] || null
    );
  },
);
