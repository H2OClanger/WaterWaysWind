export type BoatingInformationKind = 'barrier' | 'lock';

export interface BoatingInformation {
  readonly id: string;
  readonly name: string;
  readonly kind: BoatingInformationKind;
  readonly longitude: number;
  readonly latitude: number;
  readonly description: string;
}

/**
 * Reference points for the initial Thames boating-information layer.
 * These are map context only; users must check official notices before navigating.
 */
export const THAMES_BOATING_INFORMATION: readonly BoatingInformation[] = [
  {
    id: 'thames-barrier',
    name: 'Thames Barrier',
    kind: 'barrier',
    longitude: 0.0008,
    latitude: 51.5081,
    description: 'Flood barrier reference point'
  },
  {
    id: 'richmond-lock',
    name: 'Richmond Lock and Weir',
    kind: 'lock',
    longitude: -0.3063,
    latitude: 51.4618,
    description: 'Lock and weir reference point'
  },
  {
    id: 'teddington-lock',
    name: 'Teddington Lock',
    kind: 'lock',
    longitude: -0.3264,
    latitude: 51.4297,
    description: 'Lock reference point'
  }
];
