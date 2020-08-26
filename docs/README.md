# Local layers - **DEPRECATED**  

[![Build Tool](https://img.shields.io/badge/build-Webpack-green.svg)](https://github.com/sigcorporativo-ja/Mapea4-dev-webpack)  

## Descripción

 :warning: Este plugin está **obsoleto**, para una funcionalidad similar: [AddLayers](https://github.com/sigcorporativo-ja/addlayers/tree/master) :warning:  
 
 Plugin de [Mapea](https://github.com/sigcorporativo-ja/Mapea4) desarrollado por el [Instituto de Estadística y Cartografía](https://www.juntadeandalucia.es/institutodeestadisticaycartografia) para la carga de capas locales.
 
 Soporta los formatos KML, SHP (.zip), GPX y GeoJSON.

 ![Imagen](./images/locallayers1.PNG)

 
## Recursos y uso

- js: localayers.ol.min.js
- css: localayers.min.css

```javascript
// crear el plugin
var mp = new M.plugin.LocalLayers();

// añadirlo al mapa
myMap.addPlugin(mp);
});
```  

## Dependencias
"dependencies": {
    "shpjs": "^3.4.2"
  }
