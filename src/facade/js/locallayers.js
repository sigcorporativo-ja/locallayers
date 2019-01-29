import namespace from 'mapea-util/decorator';
import LocalLayersControl from './locallayersControl.js';
import css from 'assets/css/locallayers.css';

@namespace("M.plugin")
class LocalLayers extends M.Plugin {


  /**
 * Name to identify this plugin
 * @const
 * @type {string}
 * @public
 * @api stable
 */
  static get NAME() {
    return 'LocalLayers';
  }

  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(parameters) {

    parameters = (parameters || {});

    super(parameters);
    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.control_ = null;

    /**
    * * TODO
    * @private
    * @type {M.ui.Panel}
    */
    this.panel_ = null;

    /**
   * Facade of the map
   * @private
   * @type {String}
   */
    this.params_ = {};
    if (!M.utils.isNullOrEmpty(parameters.params)) {
      this.params_ = parameters.params;
    }

    /**
     * Facade of the map
     * @private
     * @type {String}
     */
    this.options_ = {};
    if (!M.utils.isNullOrEmpty(parameters.options)) {
      this.options_ = parameters.options;
    }
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    this.map_ = map;

    this.control_ = new M.control.LocalLayersControl();
    this.panel_ = new M.ui.Panel('locallayers', {
      'collapsible': true,
      'className': 'm-locallayers',
      'collapsedButtonClass': 'g-cartografia-mas2',
      'position': M.ui.position.TR,
      'tooltip': 'Carga capas locales'
    });
    this.panel_.on(M.evt.ADDED_TO_MAP, (html) => {
      M.utils.enableTouchScroll(html);
    });
    this.panel_.addControls(this.control_);
    this.map_.addPanels(this.panel_);

    this.control_.on(M.evt.ADDED_TO_MAP, () => {
      this.fire(M.evt.ADDED_TO_MAP);
    });
  }

  /**
   * 
   * 
   * @memberof LocalLayers
   */
  destroy() {
    this.map_.removeControls([this.control_]);
    this.map_ = null;
    this.control_ = null;
    this.panel_ = null;
    this.options_ = null;
  }

  /**
   * 
   * 
   * @param {any} plugin 
   * @returns 
   * @memberof LocalLayers
   */
  equals(plugin) {
    if (plugin instanceof LocalLayers) {
      return true;
    }
    else {
      return false;
    }
  }
}
