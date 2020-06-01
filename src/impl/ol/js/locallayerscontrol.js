/**
 * @module M/impl/control/LocalLayersControl
 */
export default class LocalLayersControl extends M.impl.Control {
  /**
   * @classdesc
   * Main constructor of the LocalLayersControl.
   *
   * @constructor
   * @extends {M.impl.Control}
   * @api stable
   */
  constructor() {
    super();
  }
  /**
   * This function adds the control to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the plugin
   * @param {HTMLElement} html of the plugin
   * @api stable
   */
  addTo(map, html) {
    this.facadeMap_ = map;
    this.element = html;

    var olMap = map.getMapImpl();
    ol.control.Control.call(this, {
      'element': html,
      'target': null
    });
    olMap.addControl(this);
  }

  /**
   *
   * @public
   * @function
   * @api stable
   */
  activate() {

  }

  /**
   *
   * @public
   * @function
   * @api stable
   */
  deactivate() {

  }

  /**
   *
   *
   * @param {any} layerName
   * @param {any} source
   * @memberof LocalLayersControl
   */
  loadGeoJSONLayer(layerName, source, zoom) {
    let layer = new M.layer.GeoJSON({
      name: layerName,
      source: source
    });
    layer.options.origen = 'Local';
    
    let this_ = this;
    layer.on(M.evt.LOAD, function(){
       if(zoom){
	this_.facadeMap_.setMaxExtent(layer.getFeaturesExtent());
       }
    });
    this.facadeMap_.addLayers(layer);
    
  }

  /**
   *
   *
   * @param {any} name
   * @param {any} source
   * @returns
   * @memberof LocalLayersControl
   */
  loadKMLLayer(layerName, source, extractStyles, zoom) {
    /*     let layer = new M.layer.KML({
          name: layerName,
          url: url,
          extract: true
        });
        this.facadeMap_.addLayers(layer);
        return layer.getFeatures(); */

    // FIXME: Es necesario usar la libreria base para leer las features y crear a partir de ellas una capa GeoJSON
    let features = new ol.format.KML({ extractStyles: extractStyles }).readFeatures(source, { 'featureProjection': this.facadeMap_.getProjection().code });
    features = this.convertToMFeature_(features);
    this.createLayer_(layerName, features, zoom);
    return features;
  }

  /**
   *
   *
   * @param {any} layerName
   * @param {any} source
   * @returns
   * @memberof LocalLayersControl
   */
  loadGPXLayer(layerName, source) {
    // FIXME: Es necesario usar la libreria base para leer las features y crear a partir de ellas una capa GeoJSON
    let features = new ol.format.GPX().readFeatures(source, { 'featureProjection': this.facadeMap_.getProjection().code });//'EPSG:3857' });//
    features = this.convertToMFeature_(features);
    this.createLayer_(layerName, features);
    return features;
  }

  createLayer_(layerName, features, zoom) {
    let layer = new M.layer.Vector({
      'name': layerName
    }, {
        'displayInLayerSwitcher': true
      });
    layer.addFeatures(features);
    //layer.options.origen = 'Local';
    layer.options = {
	origen: 'Local'
    };
    let this_=this;
    layer.on(M.evt.LOAD, function(){
       if(zoom){
	this_.facadeMap_.setMaxExtent(layer.getFeaturesExtent());
       }
    });
    this.facadeMap_.addLayers(layer);
  }

  /**
   *
   *
   * @param {any} features
   * @memberof LocalLayersControl
   */
  centerFeatures(features) {
    if (!M.utils.isNullOrEmpty(features)) {
      let extent = M.impl.utils.getFeaturesExtent(features);
      this.facadeMap_.getMapImpl().getView().fit(extent, { duration: 500, minResolution: 1 });
    }
  }

  convertToMFeature_(features) {
    if (features instanceof Array) {
      return features.map(olFeature => {
        let feature = new M.Feature(olFeature.getId(), {
          geometry: {
            coordinates: olFeature.getGeometry().getCoordinates(),
            type: olFeature.getGeometry().getType()
          },
          properties: olFeature.getProperties()
        });
        feature.getImpl().getOLFeature().setStyle(olFeature.getStyle());
        return feature;
      });
    }
  }
}
