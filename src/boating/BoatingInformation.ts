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
  },
  {
    id: 'molesey-lock',
    name: 'Molesey Lock',
    kind: 'lock',
    longitude: -0.345974,
    latitude: 51.404803,
    description: 'Lock reference point'
  },
  {
    id: 'sunbury-lock',
    name: 'Sunbury Lock',
    kind: 'lock',
    longitude: -0.406047,
    latitude: 51.405096,
    description: 'Lock reference point'
  },
  {
    id: 'shepperton-lock',
    name: 'Shepperton Lock',
    kind: 'lock',
    longitude: -0.459056,
    latitude: 51.382002,
    description: 'Lock reference point'
  },
  {
    id: 'chertsey-lock',
    name: 'Chertsey Lock',
    kind: 'lock',
    longitude: -0.48617,
    latitude: 51.390808,
    description: 'Lock reference point'
  },
  {
    id: 'penton-hook-lock',
    name: 'Penton Hook Lock',
    kind: 'lock',
    longitude: -0.50029,
    latitude: 51.414801,
    description: 'Lock reference point'
  },
  {
    id: 'bell-weir-lock',
    name: 'Bell Weir Lock',
    kind: 'lock',
    longitude: -0.537759,
    latitude: 51.43843,
    description: 'Lock reference point'
  },
  {
    id: 'old-windsor-lock',
    name: 'Old Windsor Lock',
    kind: 'lock',
    longitude: -0.569172,
    latitude: 51.463609,
    description: 'Lock reference point'
  }
];
