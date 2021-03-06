/**
 * An ordered collection of contest objects.
 * @constructor
 */
slContestCollection = function() {
  var collection = slCollection();

  // Public attributes and methods

  var source = new ol.source.Vector();

  /**
   * Returns the vector layer source of this collection.
   * @return {ol.source.Vector}
   */
  collection.getSource = function() {
    return source;
  };


  /**
   * Setup event handlers for the 'add' and 'preremove' events
   */
  function setupEvents() {
    $(collection).on('preremove', function(e, contest) {
      source.removeFeature(
          source.getFeatures().filter(function(e) {
            return e.get('sfid') == contest.getID();
          })[0]
      );
    });

    $(collection).on('add', function(e, contest) {
      var feature = new ol.Feature({
        geometry: contest.getGeometry(),
        sfid: contest.getID(),
        color: contest.getColor(),
        type: 'contest'
      });

      source.addFeature(feature);
    });
  };

  setupEvents();
  return collection;
};
