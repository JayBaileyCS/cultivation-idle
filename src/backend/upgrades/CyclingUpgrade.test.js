import { CyclingUpgrade } from './CyclingUpgrade';
import { state } from '../state/state';

// Mock the state module
jest.mock('../state/state', () => ({
  state: {
    resources: {
      chi: {
        currentChi: 0,
        maxChi: 100
      }
    }
  }
}));

describe('CyclingUpgrade', () => {
  let cyclingUpgrade;

  beforeEach(() => {
    cyclingUpgrade = new CyclingUpgrade();
    // Reset state
    state.resources.chi.currentChi = 0;
    state.resources.chi.maxChi = 100;
  });

  describe('calculateEffect', () => {
    it('should return 1 when chiLevel is 0', () => {
      cyclingUpgrade.chiLevel = 0;
      
      const result = cyclingUpgrade.calculateEffect();
      
      expect(result).toBe(1);
    });

    it('should handle both XP and chi levels correctly', () => {
      cyclingUpgrade.chiLevel = 2;
      cyclingUpgrade.XPLevel = 1;
      state.resources.chi.currentChi = 0;
      state.resources.chi.maxChi = 100;
      
      const result = cyclingUpgrade.calculateEffect();
      
      // When chi is empty, chiRatio = 1
      // With chiLevel=2, XPLevel=1: 
      // XPEffect = 1 + (1.15 - 1) * 1 = 1.15
      // chiEffect = 1 + (1.2 - 1) * 2 = 1.4
      // magnitude = 1.15 * 1.4 = 1.61
      // currentEffectSize = 1 + (1.61 - 1) * 1 = 1.61
      expect(result).toBeCloseTo(1.61, 3);
    });

    it('should scale linearly between empty and full chi', () => {
      cyclingUpgrade.chiLevel = 1;
      cyclingUpgrade.XPLevel = 0;
      state.resources.chi.maxChi = 100;
      
      // Test at 0%, 25%, 50%, 75%, 100% - covers empty, medium, and full cases
      const testCases = [
        { currentChi: 0, expectedRatio: 1, description: 'empty (strongest)' },
        { currentChi: 25, expectedRatio: 5/6, description: '25% full' },
        { currentChi: 50, expectedRatio: 2/3, description: '50% full (medium)' },
        { currentChi: 75, expectedRatio: 1/2, description: '75% full' },
        { currentChi: 100, expectedRatio: 1/3, description: 'full (weakest)' }
      ];
      
      testCases.forEach(({ currentChi, expectedRatio, description }) => {
        state.resources.chi.currentChi = currentChi;
        const result = cyclingUpgrade.calculateEffect();
        const magnitude = 1.2; // XPEffect=1, chiEffect=1.2
        const expectedEffect = 1 + (magnitude - 1) * expectedRatio;
        expect(result).toBeCloseTo(expectedEffect, 3);
      });
    });
  });

  describe('calculateEffectForDisplay', () => {
    it('should return 1 when chiLevel is 0', () => {
      cyclingUpgrade.chiLevel = 0;
      
      const result = cyclingUpgrade.calculateEffectForDisplay(50, 100);
      
      expect(result).toBe(1);
    });

    it('should calculate effect for custom chi values', () => {
      cyclingUpgrade.chiLevel = 1;
      cyclingUpgrade.XPLevel = 0;
      
      // Test with custom chi values (25% full)
      const result = cyclingUpgrade.calculateEffectForDisplay(25, 100);
      
      // chiRatio = (3 - (25/100) * 2) / 3 = (3 - 0.5) / 3 = 5/6
      // With chiLevel=1, XPLevel=0: magnitude = 1.2
      // effect = 1 + (1.2 - 1) * (5/6) = 1 + 0.2 * 0.833 = 1.167
      expect(result).toBeCloseTo(1.167, 3);
    });

    it('should not modify global state', () => {
      cyclingUpgrade.chiLevel = 1;
      cyclingUpgrade.XPLevel = 0;
      state.resources.chi.currentChi = 0;
      state.resources.chi.maxChi = 100;
      
      // Calculate effect with different chi values
      const displayResult = cyclingUpgrade.calculateEffectForDisplay(75, 100);
      const stateResult = cyclingUpgrade.calculateEffect();
      
      // Display result should be different from state-based result
      expect(displayResult).not.toBeCloseTo(stateResult, 3);
    });
  });

  describe('applyEffect', () => {
    it('should multiply base value by calculated effect', () => {
      cyclingUpgrade.chiLevel = 1;
      cyclingUpgrade.XPLevel = 0;
      state.resources.chi.currentChi = 0;
      state.resources.chi.maxChi = 100;
      
      const baseValue = 10;
      const result = cyclingUpgrade.applyEffect(baseValue);
      
      // Effect should be 1.2 when chi is empty
      expect(result).toBeCloseTo(12.0, 2);
    });

    it('should handle zero base value', () => {
      cyclingUpgrade.chiLevel = 1;
      
      const result = cyclingUpgrade.applyEffect(0);
      
      expect(result).toBe(0);
    });
  });

  describe('properties', () => {
    it('should have correct initial properties', () => {
      expect(cyclingUpgrade.name).toBe('Cycling');
      expect(cyclingUpgrade.index).toBe(2);
      expect(cyclingUpgrade.resourceType).toBe('chi');
      expect(cyclingUpgrade.currentXPMagnitude).toBe(1.15);
      expect(cyclingUpgrade.currentChiMagnitude).toBe(1.2);
    });
  });
});