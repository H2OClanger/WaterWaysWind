import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import { fromLonLat } from 'ol/proj.js';
import VectorSource from 'ol/source/Vector.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style.js';

import { THAMES_BOATING_INFORMATION, type BoatingInformation } from '../boating/BoatingInformation';

function styleFor({ name, kind }: BoatingInformation): Style {
  const colour = kind === 'lock' ? '#1459a6' : '#7546a8';

  return new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: colour }),
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

/** Creates a toggleable layer of Thames lock and barrier reference points. */
export function createBoatingInformationLayer(): VectorLayer<VectorSource<Feature<Point>>> {
  const features = THAMES_BOATING_INFORMATION.map((information) => {
    const feature = new Feature<Point>({
      geometry: new Point(fromLonLat([information.longitude, information.latitude]))
    });

    feature.set('information', information);
    feature.setStyle(styleFor(information));
    return feature;
  });

  return new VectorLayer({ source: new VectorSource({ features }) });
}
