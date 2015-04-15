var IGN_BASE_URL = "http://www.ign.es/wmts/ign-base";
var IGN_PNOA_URL = "http://www.ign.es/wmts/pnoa-ma";

proj4.defs("EPSG:4258", "+proj=longlat +ellps=GRS80 +units=m +no_defs");

var projection = new ol.proj.Projection({
  code: 'EPSG:4258',
  extent: [-180, -90, 180, 90],
  extent_: [-180, -90, 180, 90],
  units: 'm',
  axisOrientation: 'neu'
});
ol.proj.addProjection(projection);

var IGNBASEmatrixIds = new Array(20);
var IGNBASEserverResolutions = new Array(20);

for (var i=0; i<20; ++i) {

    IGNBASEmatrixIds[i] = "" + i;

  if(i===0) {
    //the world in 2 tiles
    IGNBASEserverResolutions[i] = 0.703125;
    }else{
    IGNBASEserverResolutions[i] = IGNBASEserverResolutions[i-1]/2;
    }
}


var map = new ol.Map({
  target: 'map',
  layers:
  [
  new ol.layer.Tile({
        title:'IGN-BASE',
        url_layer: IGN_BASE_URL,
        type_layer: 'WMTS',
            source: new ol.source.WMTS({
                url: IGN_BASE_URL,
                layer: 'IGNBaseTodo',
                matrixSet: 'EPSG:4258',
                format: 'image/jpeg',
                projection: projection,
                tileGrid: new ol.tilegrid.WMTS({
                  origin: ol.extent.getTopLeft(projection.getExtent()),
                  resolutions: IGNBASEserverResolutions,
                  matrixIds: IGNBASEmatrixIds
                })
            }),
            visible:false
          }),

          new ol.layer.Tile({
              title: 'PNOA',
              url_layer: IGN_PNOA_URL,
              type_layer: 'WMTS',
            source: new ol.source.WMTS({
                url: IGN_PNOA_URL,
                layer: 'OI.OrthoimageCoverage',
                matrixSet: 'EPSG:4258',
                format: 'image/jpeg',
                projection: projection,
                tileGrid: new ol.tilegrid.WMTS({
                  origin: ol.extent.getTopLeft(projection.getExtent()),
                  resolutions: IGNBASEserverResolutions,
                  matrixIds: IGNBASEmatrixIds
                })
            }),
            visible:true
          }),

          new ol.layer.Tile({
            title:'IGN-BASE',
            url_layer: IGN_BASE_URL,
            type_layer: 'WMTS',
                source: new ol.source.WMTS({
                    url: IGN_BASE_URL,
                    layer: 'IGNBaseOrto',
                    matrixSet: 'EPSG:4258',
                    format: 'image/png',
                    projection: projection,
                    tileGrid: new ol.tilegrid.WMTS({
                      origin: ol.extent.getTopLeft(projection.getExtent()),
                      resolutions: IGNBASEserverResolutions,
                      matrixIds: IGNBASEmatrixIds
                    })
                }),
                visible:true
              }),
    ],
    view: new ol.View({
        projection: 'EPSG:4258',
        center: [-4, 36],
        zoom: 8,
        minZoom:5,
        maxZoom:19
      })
});

$("input:checkbox").on("change", function(e)
{
  var layerNumber = parseInt($(this).data("layer"));
  map.getLayers().item(layerNumber).setVisible(this.checked);
});
