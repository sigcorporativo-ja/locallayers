import LocalLayers from 'facade/locallayers';

const map = M.map({
  container: 'mapjs',
});

const mp = new LocalLayers();

map.addPlugin(mp);
