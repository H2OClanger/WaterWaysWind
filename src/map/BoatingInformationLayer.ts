import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { fromLonLat } from 'ol/proj.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style.js';

import {
  THAMES_BOATING_INFORMATION,
  type BoatingInformation,
  type BoatingInformationKind
} from '../boating/BoatingInformation';

function markerColour(kind: BoatingInformationKind): string {
  return kind === 'lock' ? '#1459a6' : '#7546a8';
}

function markerStyle({ name, kind }: BoatingInformation): Style {
  return new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: markerColour(kind) }),
      stroke: new Stroke({ color: '#ffffff', width: 2 })
    }),
    text: new Text({
      text: name,
      offsetY: -16,
      fill: new Fill({ color: '#102033' }),
      stroke: new Stroke({ color: '#ffffff', width: 3 })
    })
  });
}

/** Creates a toggleable reference layer for Thames boating features. */
export function createBoatingInformationLayer(): VectorLayer<VectorSource<Feature<Point>>> {
  const features = THAMES_BOATING_INFORMATION.map((information) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([information.longitude, information.latitude])),
      information
    });

    feature.setStyle(markerStyle(information));
    return feature;
  });

  return new VectorLayer({
    source: new VectorSource({ features }),
    properties: { title: 'Boating information' }
  });
}
