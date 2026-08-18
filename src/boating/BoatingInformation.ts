export type BoatingInformationKind = 'barrier' | 'lock';

export interface BoatingInformation {
  readonly id: string;
  readonly name: string;
  readonly kind: BoatingInformationKind;
  readonly longitude: number;
  readonly latitude: number;
  readonly description: string;
}

function lock(id: string, name: string, longitude: number, latitude: number): BoatingInformation {
  return { id, name, kind: 'lock', longitude, latitude, description: 'Lock reference point' };
}

/**
 * Reference points for the Thames boating-information layer.
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
  lock('richmond-lock', 'Richmond Lock and Weir', -0.3063, 51.4618),
  lock('teddington-lock', 'Teddington Lock', -0.323956, 51.431692),
  lock('molesey-lock', 'Molesey Lock', -0.345974, 51.404803),
  lock('sunbury-lock', 'Sunbury Lock', -0.406047, 51.405096),
  lock('shepperton-lock', 'Shepperton Lock', -0.459056, 51.382002),
  lock('chertsey-lock', 'Chertsey Lock', -0.48617, 51.390808),
  lock('penton-hook-lock', 'Penton Hook Lock', -0.50029, 51.414801),
  lock('bell-weir-lock', 'Bell Weir Lock', -0.537759, 51.43843),
  lock('old-windsor-lock', 'Old Windsor Lock', -0.569172, 51.463609),
  lock('romney-lock', 'Romney Lock', -0.604196, 51.491484),
  lock('boveney-lock', 'Boveney Lock', -0.640884, 51.49097),
  lock('bray-lock', 'Bray Lock', -0.690032, 51.509531),
  lock('boulters-lock', 'Boulter’s Lock', -0.699762, 51.533216),
  lock('cookham-lock', 'Cookham Lock', -0.69514, 51.561265),
  lock('marlow-lock', 'Marlow Lock', -0.768812, 51.567249),
  lock('temple-lock', 'Temple Lock', -0.793958, 51.552053),
  lock('hurley-lock', 'Hurley Lock', -0.809068, 51.551156),
  lock('hambleden-lock', 'Hambleden Lock', -0.873251, 51.559882),
  lock('marsh-lock', 'Marsh Lock', -0.885527, 51.528627),
  lock('shiplake-lock', 'Shiplake Lock', -0.88274, 51.501688),
  lock('sonning-lock', 'Sonning Lock', -0.917972, 51.473017),
  lock('caversham-lock', 'Caversham Lock', -0.964119, 51.460695),
  lock('mapledurham-lock', 'Mapledurham Lock', -1.039974, 51.486247),
  lock('whitchurch-lock', 'Whitchurch Lock', -1.087748, 51.486853),
  lock('goring-lock', 'Goring Lock', -1.141195, 51.523655),
  lock('cleeve-lock', 'Cleeve Lock', -1.135486, 51.532101),
  lock('benson-lock', 'Benson Lock', -1.115982, 51.616864),
  lock('days-lock', 'Days Lock', -1.179451, 51.638211),
  lock('clifton-lock', 'Clifton Lock', -1.210815, 51.648623),
  lock('culham-lock', 'Culham Lock', -1.267619, 51.650357),
  lock('abingdon-lock', 'Abingdon Lock', -1.269043, 51.670516),
  lock('sandford-lock', 'Sandford Lock', -1.232848, 51.708255),
  lock('iffley-lock', 'Iffley Lock', -1.240181, 51.729262),
  lock('osney-lock', 'Osney Lock', -1.271932, 51.74919),
  lock('godstow-lock', 'Godstow Lock', -1.298298, 51.777079),
  lock('kings-lock', 'King’s Lock', -1.306928, 51.789016),
  lock('eynsham-lock', 'Eynsham Lock', -1.35686, 51.774752),
  lock('pinkhill-lock', 'Pinkhill Lock', -1.362965, 51.761128),
  lock('northmoor-lock', 'Northmoor Lock', -1.376912, 51.716309),
  lock('shifford-lock', 'Shifford Lock', -1.465231, 51.707097),
  lock('rushey-lock', 'Rushey Lock', -1.534032, 51.698497),
  lock('radcot-lock', 'Radcot Lock', -1.572392, 51.699758),
  lock('grafton-lock', 'Grafton Lock', -1.60935, 51.6909),
  lock('buscot-lock', 'Buscot Lock', -1.66874, 51.6803),
  lock('st-johns-lock', 'St John’s Lock', -1.6807, 51.686)
];
