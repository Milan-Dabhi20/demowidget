var base = document.currentScript.src || document.currentScript.baseURI;
base = base.substring(0, base.lastIndexOf('/')) + "/..";

Polymer({
    is: 'main-element',

    properties: {
        pointSizeValue: {
            type: Number,
            observer: 'updatePointSize'
        },
        playbackDefaultModelsSpeedValue: {
            type: String,
            observer: 'updateDefaultModelsPlaybackSpeed'
        },
        playbackCustomModelsSpeedValue: {
            type: String,
            observer: 'updateCustomModelsPlaybackSpeed'
        },
        status: {
            type: String,
            notify: true,
            value: ""
        }
    },
    timestamp: "",

    ready: function() {
        require.config({
            paths: {
                'DS/UrbanWidget/APIBeta': 'https://sgp-server2015x.uwglobe.com/widget/assets/api-beta'
            }
        });

        var that = this;
        require(
            [
                "DS/DataDragAndDrop/DataDragAndDrop",
                "DS/UrbanWidget/APIBeta/SimulationPlayback",
				"DS/UrbanWidget/APIBeta/PointCloud"
            ],
            function(
                DataDragAndDrop,
                SimulationPlayback,
				PointCloud
            ) {
                that.DataDragAndDrop = DataDragAndDrop;
                that.SimulationPlayback = SimulationPlayback;
				that.PointCloud = PointCloud;
				
                widget.addEvent("onLoad", that.onLoad.bind(that));
            }
        );
    },

    onLoad: function() {
        document.getElementById("loading").hide();
        document.getElementById("content").show();

        var that = this;
        this.DataDragAndDrop.droppable(document.getElementById("divDropArea"), {
            drop: function(docInfo) {
                docInfo = JSON.parse(docInfo);
                that.createPointCloud(docInfo.data.items[0]);
            }
        });
    },
    onTogglePanel: function(e) {
        var panels = Array.from(document.getElementsByTagName("paper-expansion-panel"));
        panels.forEach(function(panel) {
            if (panel.id == "status") {
                return;
            }
            panel.opened = false;
        });
        
        e.target.opened = true;
    },
    createPointCloud: function(source) {
        var that = this;

        var attributes = {
            id: "pointCloud1",
            name: "Point Cloud"
        };
        
        if (!source.objectId) {
            var sampleConfigUrl = base + "/assets/data/point_cloud_config.json";
            var userConfigUrl = widget.getValue("pointCloudConfigUrl");
            source = userConfigUrl || sampleConfigUrl;
        }

        var completedCallback = function(rs) {
            that.pointSizeValue = rs.pointSize;

            var sliders = Array.from(document.getElementsByClassName("sliderPointSize"));
            sliders.forEach(function(slider) {
                slider.disabled = false;
            });
            
            that.status = "Point Cloud load completed.";
        };

        this.PointCloud.create(attributes, source, {}, completedCallback);
        this.status = "Point Cloud loading...";
    },
    removePointCloud: function() {
            this.PointCloud.remove("pointCloud1");
            this.status = "";

            var sliders = Array.from(document.getElementsByClassName("sliderPointSize"));
            sliders.forEach(function(slider) {
                slider.disabled = true;
            });
    },
    updatePointSize: function(value) {
        this.PointCloud.setPointSize("pointCloud1", value);
    },
    loadDefaultModelsSimPlayback: function() {
        this.status = "Loading simulation playback";

        var sampleDataUrl = base + "/assets/data/simulation_playback_windflow.json";
        var userDataUrl = widget.getValue("simPlaybackDataUrlDefault");
        var dataUrl = userDataUrl || sampleDataUrl;

        var that = this;
        this.SimulationPlayback.load("windSimPlayback", dataUrl).then(function() {
            that.status = "Simulation playback load completed.";
        })
    },
    loadCustomModelsSimPlayback: function() {
        this.status = "Loading simulation playback";

        var sampleDataUrl = base + "/assets/data/sample_traffic.json";
        var userDataUrl = widget.getValue("simPlaybackDataUrlCustom");
        var dataUrl = userDataUrl || sampleDataUrl;
        var options = {
            featureTypes: [
                {
                    "type": "CAR",
                    "color": "rgb(30,144,255)",
                    "model": "https://sgp-server2015x.uwglobe.com/widget/assets/models3d/car.3dxc",
                    "scale": [1.2, 1.2, 0.6]
                },
                {
                    "type": "SUV",
                    "color": "rgb(255,140,0)",
                    "model": "https://sgp-server2015x.uwglobe.com/widget/assets/models3d/suv.3dxc",
                    "scale": [1.2, 1.2, 0.6]
                },
                {
                    "type": "VAN",
                    "color": "rgb(255,255, 255)",
                    "model": "https://sgp-server2015x.uwglobe.com/widget/assets/models3d/van.3dxc",
                    "scale": [1.2, 1.2, 0.6]
                },
                {
                    "type": "TRUCK",
                    "color": "rgb(220,20,60)",
                    "model": "https://sgp-server2015x.uwglobe.com/widget/assets/models3d/truck.3dxc",
                    "scale": [1.2, 1.2, 0.6]
                },
                {
                    "type": "BUS",
                    "color": "rgb(255,255,51)",
                    "model": "https://sgp-server2015x.uwglobe.com/widget/assets/models3d/bus.3dxc",
                    "scale": [1.2, 1.2, 0.6]
                }
            ]
        };

        var that = this;
        this.SimulationPlayback.load("trafficSimPlayback", dataUrl, options).then(function() {
            that.status = "Simulation playback load completed.";
        })
    },
    setFollow: function() {
        var playbackId = "trafficSimPlayback";
        var type = document.getElementById("inputFollowType").value;
        var featureId = document.getElementById("inputFollowFeatureId").value;
        var offset = [0, 2, 5];

        this.SimulationPlayback.setFollow(playbackId, type, featureId, offset);
    },
    unsetFollow: function() {
        var playbackId = "trafficSimPlayback";
        this.SimulationPlayback.unsetFollow(playbackId);
    },
    toggleDefaultModelsSimPlayback: function(e) {
        if (e.target.innerText == "Play") {
            e.target.innerText = "Pause";

            var options = {
                callbacks: {
                    playing: this._playNextFrame.bind(this)
                }
            };
            this.SimulationPlayback.start("windSimPlayback", options);
        } else {
            e.target.innerText = "Play";
            this.SimulationPlayback.stop("windSimPlayback");
        }
    },
    toggleCustomModelsSimPlayback: function(e) {
        if (e.target.innerText == "Play") {
            e.target.innerText = "Pause";
            this.status = "";

            var that = this;
            var options = {
                loop: false,
                callbacks: {
                    playing: this._playNextFrame.bind(this),
                    ended: function() {
                        e.target.innerText = "Play";
                        that.status = "Playback ended.";
                    }
                }
            };
            this.SimulationPlayback.start("trafficSimPlayback", options);
        } else {
            e.target.innerText = "Play";
            this.SimulationPlayback.stop("trafficSimPlayback");
        }
    },
    _playNextFrame: function(info) {
        this.timestamp = info.timestamp;
    },
    clearDefaultModelsSimPlayback: function() {
        this.SimulationPlayback.clear("windSimPlayback");

        this.status = "";
        this.timestamp = "";

        var btns = Array.from(document.getElementsByClassName("togglePlaybackBtn"));
        btns.forEach(function(btn) {
            btn.innerText = "Play";
        });
    },
    clearCustomModelsSimPlayback: function() {
        this.SimulationPlayback.clear("trafficSimPlayback");

        this.status = "";
        this.timestamp = "";

        var btns = Array.from(document.getElementsByClassName("togglePlaybackBtn"));
        btns.forEach(function(btn) {
            btn.innerText = "Play";
        });
    },
    updateDefaultModelsPlaybackSpeed: function(e) {
        this.SimulationPlayback.setPlaybackSpeed("windSimPlayback", parseFloat(e));
    },
    updateCustomModelsPlaybackSpeed: function(e) {
        this.SimulationPlayback.setPlaybackSpeed("trafficSimPlayback", parseFloat(e));
    }
	
});